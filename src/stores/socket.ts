import uuid from 'uuid'
import Vuex from 'vuex'

interface Response {
  _rid: string,
  status: number,
  message?: string,
  data?: any,
  local?: boolean
}

export default {
  state: {
    url: 'ws://127.0.0.1:4000',
    ws: undefined,
    log: [] as Response[],
    user: {},
  },
  getters: {
    connected: (state: any) => !!state.ws,
    loggedIn: (state: any) => !!state.token,
  },
  mutations: {
    setToken: (state: any, token: string) => {
      state.token = token
    },
    logMessage: (state: any, msg: String) => {
      state.log.push({
        _rid: `event-${uuid.v4()}`,
        status: 0,
        message: msg,
        local: true,
      })
    }
  },
  actions: {
    updateUrl: async ({ state, commit, dispatch }: any, url: string) => {
      state.url = url
      if (state.ws) {
        state.ws.close()
      }
    },
    loadUser: async ({ state, dispatch }: any) => {
      if (!state.token) return
      const { data } = await dispatch('send', {
        func: 'user.load',
        data: {
          token: state.token,
        }
      })
      state.user = data
    },
    send: async ({ state, commit, dispatch }: any, _payload: {
      func?: string,
      data?: object
    } = {}) => {
      if (!state.ws) throw new Error('Not connected')
      const { func, data } = {
        func: '',
        data: {},
        ..._payload
      }
      const payload = {
        _rid: uuid.v4(),
        func,
        data: {
          ...data,
          token: state.token,
        },
      }
      let startIndex = state.log.length
      state.ws.send(JSON.stringify(payload))
      for (let i = 0; i < 10; i++) {
        await new Promise(r => setTimeout(r, 200))
        const responses = state.log.slice(startIndex)
        for (const res of responses) {
          if (res._rid === payload._rid) {
            return res
          }
        }
        startIndex = state.log.length
      }
      throw new Error('Timed out')
    },
    connect: async ({ state, commit, dispatch }: any, _options: any = {}) => {
      const options = {
        _retry: 0,
        ..._options,
        retries: 3,
        retryInterval: 2000
      }
      if (state.ws) return
      return await new Promise((rs, rj) => {
        const ws = new WebSocket(state.url)
        ws.onmessage = ({ data }: any) => {
          const parsed: Response = JSON.parse(data)
          state.log.push(parsed)
        }
        ws.onopen = () => {
          commit('logMessage', `Socket connection opened to ${state.url}`)
          state.ws = ws
          rs()
          ws.onclose = () => {
            delete state.ws
            commit('logMessage', `Socket ${state.url} closed`)
            if (options._retry >= options.retries) {
              // Done retrying
              return
            }
            setInterval(() => {
              dispatch('connect', {
                ...options,
                _retry: options._retry+1,
              })
            }, options.retryInterval)
          }
        }
        ws.onerror = () => {
          ws.close()
          rs()
        }
      })
    }
  }
}

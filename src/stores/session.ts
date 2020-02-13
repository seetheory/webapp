interface Session {
  start: number
  registeredUsers: number
}

export default {
  state: {
    sessions: [] as Session[],
  },
  actions: {
    loadUpcoming: async ({ state, dispatch }: any, payload: {
      count?: number
      offset?: number
    }) => {
      const { data } = await dispatch('send', {
        func: 'session.upcoming',
        data: payload
      })
      state.sessions = data
    }
  },
}

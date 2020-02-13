<template>
  <div class="outer">
    <div style="display: flex; margin-top: 4px;">
      <input style="flex: 1" type="text" placeholder="url" v-model="url" v-on:keydown="urlChanged" />
    </div>
    <div style="display: flex; margin-top: 4px; margin-bottom: 4px;">
      <input style="flex: 1" type="text" placeholder="func" v-model="func" v-on:keydown="this.textchanged" />
      <input style="flex: 1" type="text" placeholder="data" v-model="data" v-on:keydown="this.textchanged" />
    </div>
    <div class="log">
      <div class="logline" v-for="line in log">
        {{line}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import uuid from 'uuid'

@Component({
  name: 'Shell',
})
export default class Shell extends Vue {
  data = ''
  func = ''
  url = 'ws://127.0.0.1:4000'
  log = [] as string[]
  lastPayload = {
    func: '',
    data: '',
    _rid: '',
  }
  ws: WebSocket
  reconnectTimer: any

  mounted() {
    this.connect()
  }

  connect() {
    const ws = new WebSocket(this.url)
    ws.onmessage = ({ data }: any) => {
      const pretty = JSON.stringify(JSON.parse(data), null, 4)
      this.log.push(`Received: ${pretty}`)
    }
    ws.onopen = () => {
      this.ws = ws
      this.log.push('connected')
      clearInterval(this.reconnectTimer)
      this.reconnectTimer = undefined
      ws.onclose = () => {
        this.log.push('disconnected')
        delete this.ws
        this.reconnectTimer = setInterval(() => {
          this.connect()
        }, 2000)
      }
    }
  }

  beforeDestroy() {
    this.ws.close()
    clearInterval(this.reconnectTimer)
  }

  urlChanged(e: any) {
    if (e.key === 'Enter') {
      if (this.ws) this.ws.close()
    }
  }

  textchanged(e: any) {
    if (e.key === 'Enter') {
      e.preventDefault()
      const payload = {
        _rid: uuid.v4(),
        func: this.func,
        data: JSON.parse(this.data),
      }
      if (this.func || this.data) {
        this.ws.send(JSON.stringify(payload))
        this.lastPayload = payload
        this.func = ''
        this.data = ''
      }
    }
    if (e.key === 'ArrowUp') {
      this.func = this.lastPayload.func
      this.data = JSON.parse(this.lastPayload.data)
    }
  }
}
</script>

<style scoped>
.outer {
  font-size: 15;
  font-family: Arial;
  color: white;
  width: 30vw;
}
.log {
  display: flex;
  width: 100%;
  height: 30vh;
  flex-direction: column;
  background-color: black;
  color: white;
  font-size: 14px;
  padding: 4px;
  padding-top: 0px;
  font-family: Arial;
}
.logline {
  margin-top: 4px;
  word-wrap: break-word;
}
</style>

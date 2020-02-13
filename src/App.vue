<template>
  <div class="wrapper">
    <div class="title">
      Connecting to websocket
      <br />
      <input type="text" v-model="func" v-on:keydown="this.textchanged" />
      <input type="text" v-model="data" v-on:keydown="this.textchanged" />
      <br />
      <div class="log">
        <div class="logline" v-for="line in log">
          {{line}}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import uuid from 'uuid'

@Component({
  name: 'App'
})
export default class App extends Vue {
  data = ''
  func = ''
  log = [] as string[]
  lastPayload = {
    func: '',
    data: '',
    _rid: '',
  }
  ws: WebSocket
  mounted() {
    this.ws = new WebSocket('ws://127.0.0.1:4000')
    this.ws.onclose = () => {
      this.log.push('disconnected')
    }
    this.ws.onmessage = ({ data }: any) => {
      const pretty = JSON.stringify(JSON.parse(data), null, 4)
      this.log.push(`Received: ${pretty}`)
    }
    this.ws.onopen = () => {
      this.log.push('connected')
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
      this.data = this.lastPayload.data
    }
  }
}
</script>

<style>
body {
  margin: 0px;
}
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.title {
  font-size: 32px;
  font-weight: bold;
  color: white;
  max-width: 40vw;
}
.wrapper {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: gray;
  height: 100vh;
}
.log {
  display: flex;
  max-width: 30vw;
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
}
</style>

<template>
  <div class="wrapper">
    <div class="title">
      Connecting to websocket
      <br />
      <input type="text" v-model="command" v-on:keypress="this.textchanged" />
      <br />
      <div style="font-size:20">
        {{status}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'App'
})
export default class App extends Vue {
  status = ''
  command = ''
  ws: WebSocket
  mounted() {
    this.ws = new WebSocket('ws://127.0.0.1:4000')
    this.ws.onclose = () => {
      this.status = 'closed'
    }
    this.ws.onmessage = ({ data }: any) => {
      this.status = `Received: ${data}`
    }
    this.ws.onopen = () => {
      this.status = 'connected'
    }
  }
  textchanged(e: any) {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (this.command) this.ws.send(this.command)
      this.command = ''
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
}
.wrapper {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: gray;
  height: 100vh;
}
</style>

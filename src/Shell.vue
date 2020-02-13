<template>
  <div class="outer">
    <div style="display: flex; margin-top: 4px;">
      <input style="flex: 1" type="text" placeholder="url" v-model="url" v-on:keydown="urlChanged" />
    </div>
    <div style="display: flex; margin-top: 4px; margin-bottom: 4px;">
      <input style="flex: 1" type="text" placeholder="func" v-model="func" v-on:keydown="payloadChanged" />
      <input style="flex: 1" type="text" placeholder="data" v-model="data" v-on:keydown="payloadChanged" />
    </div>
    <div class="log">
      <div class="logline" v-for="response in this.$store.state.socket.log">
        {{response.message}}
        <br />
        {{response.data}}
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
  computed: {
    log: function() {
      return this.$store.state.socket.log
    }
  }
})
export default class Shell extends Vue {

  url: string = this.$store.state.socket.url
  func: string = ''
  data: string = ''

  urlChanged(e: any) {
    if (e.key === 'Enter') {
      this.$store.dispatch('updateUrl', this.url)
    }
  }

  payloadChanged(e: any) {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (this.func || this.data) {
        this.$store.dispatch('send', {
          func: this.func,
          data: JSON.parse(this.data),
        })
        this.func = ''
        this.data = ''
      }
    }
    if (e.key === 'ArrowUp') {
      // this.func = this.lastPayload.func
      // this.data = JSON.parse(this.lastPayload.data)
    }
  }
}
</script>

<style scoped>
.log {
  display: flex;
  flex: 1;
  height: 30vh;
  flex-direction: column;
  background-color: black;
  color: white;
  font-size: 14px;
  padding: 4px;
  padding-top: 0px;
  font-family: Arial;
  overflow-y: scroll;
}
.logline {
  margin-top: 4px;
  word-wrap: break-word;
}
</style>

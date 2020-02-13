<template>
  <div class="wrapper">
    <div style="display: flex; flex-direction: column;">
      <div class="title">
        Livetime Connection
      </div>
      <div style="display: flex">
        <Shell />
        <div style="width: 10px;" />
        <Auth />
        <div style="width: 10px;" />
        <Sessions v-if="$store.state.socket.ws" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import uuid from 'uuid'
import Shell from './Shell.vue'
import Auth from './Auth.vue'
import Sessions from './Sessions.vue'

@Component({
  name: 'App',
  components: { Shell, Auth, Sessions }
})
export default class App extends Vue {
  mounted() {
    this.$store.dispatch('connect')
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
  flex-wrap: wrap;
  align-items: center;
  background-color: gray;
  height: 100vh;
}
.outer {
  font-size: 15;
  font-family: Arial;
  color: white;
  width: 30vw;
  height: 30vh;
  padding: 4px;
  border: 1px solid white;
  display: flex;
  flex-direction: column;
}
.inner {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 4px;
  border: 1px solid black;
  color: black;
  background-color: white;
}
</style>

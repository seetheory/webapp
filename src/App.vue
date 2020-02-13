<template>
  <div class="wrapper">
    <div class="title">
      Connecting to websocket
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

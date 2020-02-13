<template>
  <div class="wrapper">
    <div style="display: flex; flex-direction: column">
      <div class="title">
        Livetime Connection
      </div>
      <div style="display: flex">
        <Shell />
        <div style="width: 10px;" />
        <div>
          Another thingy
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import uuid from 'uuid'
import Shell from './Shell.vue'

@Component({
  name: 'App',
  components: { Shell }
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

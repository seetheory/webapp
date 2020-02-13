<template>
  <div class="outer">
    <div style="display: flex; margin-top: 4px;">
      <input style="flex: 1" type="text" placeholder="username" v-model="username" v-on:keydown="keydown" />
    </div>
    <div style="display: flex; margin-top: 4px; margin-bottom: 4px;">
      <input style="flex: 1" type="password" placeholder="password" v-model="password" v-on:keydown="keydown" />
    </div>
    <div style="display: flex; jusify-content: center;">
      <button style="flex: 1" v-on:click="login">Login</button>
      <button style="flex: 1" v-on:click="register">Register</button>
    </div>
    <div v-if="$store.state.socket.token" class="inner">
      <div style="height: 20px;" />
      <div>Username: {{$store.state.socket.user.username}}</div>
      <div>ID: {{$store.state.socket.user.id}}</div>
      <div>Created: {{$store.state.socket.user.createdAt}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: "Auth",
})
export default class Auth extends Vue {
  username = ''
  password = ''

  async login() {
    const res = await this.$store.dispatch('send', {
      func: 'user.login',
      data: {
        username: this.username,
        password: this.password
      }
    })
    this.$store.commit('setToken', res.data.token)
    await this.$store.dispatch('loadUser')
    this.username = ''
    this.password = ''
  }

  async register() {
    const res = await this.$store.dispatch('send', {
      func: 'user.create',
      data: {
        username: this.username,
        password: this.password
      }
    })
    await this.$store.dispatch('loadUser')
    this.$store.commit('setToken', res.data.token)
    this.username = ''
    this.password = ''
  }

  keydown(e: any) {
    if (e.key === 'Enter') {
      this.login()
    }
  }

}
</script>

<style scoped>
</style>

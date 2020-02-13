<template>
  <div class="outer">
    <div style="font-size: 20px;">
      Upcoming chat sessions
    </div>
    <div class="session-cell" v-for="session of sessions">
      <div style="display: flex; flex-direction: column">
        <div>
          Start Time: {{new Date(session.start).toLocaleString()}}
        </div>
        <div>
          Registered Users: {{session.registeredUsers}}
        </div>
      </div>
      <div v-if="$store.state.socket.token">
        <button v-on:click="register(session.start)">Register</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'Sessions',
  computed: {
    sessions: function() {
      return this.$store.state.session.sessions
    }
  },
})
export default class Sessions extends Vue {
  async mounted() {
    await this.$store.dispatch('loadUpcoming', {
      count: 5
    })
  }

  async register(start: number) {
    const { data } = await this.$store.dispatch('send', {
      func: 'session.register',
      data: {
        start,
      }
    })
    await this.$store.dispatch('loadUpcoming', {
      count: 5
    })
  }
}
</script>

<style scoped>
.session-cell {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  color: white;
  margin-top: 4px;
  padding: 4px;
}
</style>

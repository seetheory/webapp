import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import SocketStore from './stores/socket'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    socket: SocketStore,
  }
})

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

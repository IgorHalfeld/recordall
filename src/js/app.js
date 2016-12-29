
import Vue from 'vue'
import emitter from 'event-emitter'

import App from './App.vue'

global.Emitter = emitter({})

/* eslint-disable */
const vue = new Vue({
  el: '#app',
  render: (h) => h(App)
})

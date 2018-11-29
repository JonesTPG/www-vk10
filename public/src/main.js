'use strict'
import Vue from 'vue'
import App from './components/App.vue'

new Vue({
    el: 'app',
    created: function () {
      console.log('root instance was created')
    },
    components: {App},
    methods: {}
  })
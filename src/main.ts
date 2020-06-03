import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './plugins/element.js'
import i18n from './i18n'
import * as Bluebird from 'bluebird'
declare global { export interface Promise<T> extends Bluebird<T> {} }

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')

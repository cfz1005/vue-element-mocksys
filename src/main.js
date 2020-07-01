import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './router/filter'
import './plugins/element.js'
import './styles/index.scss'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCookie from 'vue-cookie'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Router from './router'
import VueResource from 'vue-resource'
import Store from './store/global.js'
import Ajax from './js/ajax.js'
Vue.use(ElementUI)
Vue.use(VueCookie)
Vue.use(VueResource)
Vue.use(Ajax)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router: Router,
  store: Store,
  components: { App },
  template: '<App/>'
})

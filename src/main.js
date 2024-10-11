import Vue from 'vue'

import ElementUI from 'element-ui'
import vueParticles from 'vue-particles'
import 'element-ui/lib/theme-chalk/index.css'

import Vcomp from './components/index'
import Toast from './components/toast'
import '@/styles/index.scss'
import '@/assets/styles/base.scss'
import '@/assets/styles/common.scss'
import '@/assets/iconfont/iconfont.css'

import App from './App'
import store from './store'
import router from './router'
import $ from 'jquery'

import '@/icons'

window.$ = $
Vue.use(vueParticles)
Vue.use(Vcomp)
Vue.prototype.$Toast = Toast

Vue.use(ElementUI)
Vue.config.productionTip = false
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

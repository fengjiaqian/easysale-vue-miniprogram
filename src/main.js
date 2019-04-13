//  import VConsole from 'vconsole'  
//   new VConsole() // 初始化
import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/store.js'
import VueLazyload from 'vue-lazyload'

import 'api/index'
import 'common/appConfig'
import './assets/stylus/index.styl'
import { Toast, Alert, Confirm } from './plugins/dialog/index.js'
Vue.use(Toast)
Vue.use(Alert)
Vue.use(Confirm)
Vue.use(VueLazyload, {
  error: require('./assets/images/loading-logo.png'),
  loading: require('./assets/images/loading-logo.png')
})

router.beforeEach((to, from, next) => {

  let $el = document.querySelector('.loading-message');
  $el && $el.parentNode.removeChild($el);
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
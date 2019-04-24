import VConsole from 'vconsole'

new VConsole() // 初始化
import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router/index.js'
import store from './store/store.js'
import VueLazyload from 'vue-lazyload'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import 'api/index'
import 'common/appConfig'
import './assets/stylus/index.styl'
import {Toast, Alert, Confirm} from './plugins/dialog/index.js'
import mixin from 'common/rootMixin'
import './plugins/element.js'

Vue.use(ElementUI);
Vue.use(Toast)
Vue.use(Alert)
Vue.use(Confirm)
Vue.use(VueLazyload, {
    error: require('./assets/images/loading-logo.png'),
    loading: require('./assets/images/loading-logo.png')
})
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
Vue.mixin(mixin)

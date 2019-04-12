import Vue from 'vue'
import Router from 'vue-router'

import main from './main'//主要页面
import mine from './mine'//我的模块


const routes = [
    ...main, ...mine
]

Vue.use(Router)

export default new Router({
//	mode: 'history',
    routes
})

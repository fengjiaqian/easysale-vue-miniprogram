import Vue from 'vue'
import Router from 'vue-router'

import main from './main'//主要页面
import mine from './mine'//我的模块
import complain from './complain'//投诉的页面的路由


const routes = [
    ...main, ...mine, ...complain
]

Vue.use(Router)

export default new Router({
//	mode: 'history',
    routes
})

import Vue from 'vue'
import Router from 'vue-router'
import storage from 'common/storage'

import main from './main'//主要页面
import mine from './mine'//我的模块
import complain from './complain'//投诉的页面的路由
import exhibit from './exhibit'//陈列模块

const routes = [
    ...main, ...mine, ...complain, ...exhibit
]
Vue.use(Router);

const router = new Router({
    routes
})

/**
 * from 经销商商品管理后 返回首页刷新 
 */
const isNeedRefreshHome = function () {
    const routes = ['cart','dealerList', 'productList', "editProduct", 'addProduct', 'importProduct'];
    if (routes.includes(this.name)) {
        storage.set("homeRefresh", true)
    }
}
/**
 * 
 */
const isNeedRefreshOrder = function () {
    const routes = ['orderResult', 'orderDetail'];
    if (routes.includes(this.name)) {
        storage.set("orderRefresh", true)
    }
}

const isNeedRefreshMine = function () {
    const routes = ['writeApplicationInformation'];
    if (routes.includes(this.name)) {
        storage.set("mineRefresh", true)
    }
}

router.beforeEach((to, from, next) => {

    let $el = document.querySelector('.loading-message');
    $el && $el.parentNode.removeChild($el);

    if (to.meta.requireAuth) {
        if (storage.get('token', "")) {
            to.meta.title && (document.title = to.meta.title)
            return next();
        }
        if (window.__wxjs_environment === "miniprogram") {
            return wx.miniProgram.navigateTo({
                url: `/pages/mobile/mobile`
            });
        }
    } else {
        isNeedRefreshHome.call(from);
        isNeedRefreshOrder.call(from);
        isNeedRefreshMine.call(from)
        to.meta.title && (document.title = to.meta.title)
        next()
    }
})
export default router 

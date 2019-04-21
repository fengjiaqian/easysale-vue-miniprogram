import Vue from 'vue'
import Router from 'vue-router'
import storage from 'common/storage'

import main from './main'//主要页面
import mine from './mine'//我的模块
import complain from './complain'//投诉的页面的路由

const routes = [
    ...main, ...mine, ...complain
]
Vue.use(Router);

const router = new Router({
    routes
})

/**
 * from 经销商商品管理后 返回首页刷新 
 */
const isNeedRefreshHome = function () {
    const userType = storage.get('userType', 3);
    if (userType != 1) return false;
    const routes = ['productList', "editProduct", 'addProduct', 'importProduct'];
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
        to.meta.title && (document.title = to.meta.title)
        next()
    }
})
export default router 

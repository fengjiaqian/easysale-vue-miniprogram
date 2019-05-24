import Vue from 'vue'
import Router from 'vue-router'
import storage from 'common/storage'

import main from './main'//主要页面
import mine from './mine'//我的模块
import manageInit from './manageInit'// 投诉、兑奖、退货管理相关
import exhibit from './exhibit'//陈列模块
import display from './display'//陈列模块-V2
import attestation from './attestation'//引导认证
const routes = [
    ...main, ...mine, ...manageInit, ...exhibit, ...display, ...attestation
];
Vue.use(Router);

const router = new Router({
    routes
});

/**
 * from 经销商商品管理后 返回首页刷新
 */
const isNeedRefreshHome = function () {
    const routes = ['cart', 'dealerList', 'productList', "editProduct", 'addProduct', 'importProduct'];
    if (routes.includes(this.name)) {
        storage.set("homeRefresh", true)
    }
};
/**
 *
 */
const isNeedRefreshOrder = function () {
    const routes = ['orderResult', 'orderDetail'];
    if (routes.includes(this.name)) {
        storage.set("orderRefresh", true)
    }
};

const isNeedRefreshMine = function () {
    const routes = ['writeApplicationInformation', "shopkeeper"];
    if (routes.includes(this.name)) {
        storage.set("mineRefresh", true)
    }
};

router.beforeEach((to, from, next) => {

    let $el = document.querySelector('.loading-message');
    $el && $el.parentNode.removeChild($el);
    const token = storage.get('token', "");
    const routeRequireGuidance = storage.get('routeRequireGuidance', 1);
    const mobileNo = storage.get('mobileNo', '');
    //引导认证控制
    if (routeRequireGuidance && to.meta.requireGuidence && mobileNo) {
        Vue.prototype.title = '认证';
        return next({ path: "/identity" });
    }
    if (to.meta.requireAuth) {
        if (mobileNo) {
            to.meta.title && (Vue.prototype.title = to.meta.title)
            return next();
        }
        if (window.__wxjs_environment === "miniprogram") {
            return wx.miniProgram.navigateTo({
                url: `/pages/mobile/mobile`
            });
        }
    }
    isNeedRefreshHome.call(from);
    isNeedRefreshOrder.call(from);
    isNeedRefreshMine.call(from);
    to.meta.title && (Vue.prototype.title = to.meta.title)
    next()
})
export default router

import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Tab = (resolve) => {
    import ('components/Tab.vue').then((module) => {
        resolve(module)
    })
}
const Home = (resolve) => {
    import ('views/Home.vue').then((module) => {
        resolve(module)
    })
}
const Service = (resolve) => {
    import ('views/Service.vue').then((module) => {
        resolve(module)
    })
}
const Orders = (resolve) => {
    import ('views/Orders.vue').then((module) => {
        resolve(module)
    })
}
const Mine = (resolve) => {
    import ('views/Mine.vue').then((module) => {
        resolve(module)
    })
}
const productDetail = (resolve) => {
    import ('views/productDetail.vue').then((module) => {
        resolve(module)
    })
}
const Cart = (resolve) => {
    import ('views/Cart.vue').then((module) => {
        resolve(module)
    })
}

const OrderDetail = (resolve) => {
    import ('views/OrderDetail.vue').then((module) => {
        resolve(module)
    })
}

const OrderSubmit = (resolve) => {
    import ('views/OrderSubmit.vue').then((module) => {
        resolve(module)
    })
}

const addPersonalInformation = (resolve) => { //wx 新增个人信息的页面
    import ('views/wxDescript/addPersonalInformation.vue').then((module) => {
        resolve(module)
    })
}

const editPersonalInformation = (resolve) => { //wx 编辑个人信息的页面
    import ('views/wxDescript/editPersonalInformation.vue').then((module) => {
        resolve(module)
    })
}

const myConsignee = (resolve) => { //wx 我的收货人的页面
    import ('views/wxDescript/myConsignee.vue').then((module) => {
        resolve(module)
    })
}




const editConsignee = (resolve) => { //wx 编辑收货人的页面
    import ('views/wxDescript/editConsignee.vue').then((module) => {
        resolve(module)
    })
}

const addConsignee = (resolve) => { //wx 新增收货人的页面
    import ('views/wxDescript/addConsignee.vue').then((module) => {
        resolve(module)
    })
}

export default new Router({
    routes: [{
            path: '',
            redirect: '/navi/home'
        },
        {
            path: '/navi',
            name: 'navi',
            component: Tab,
            children: [{
                path: 'home',
                name: 'home',
                meta: {
                    title: '首页',
                    keepAlive: true
                },
                component: Home
            }, {
                path: 'service',
                name: 'service',
                meta: {
                    title: '服务',
                    keepAlive: true
                },
                component: Service
            }, {
                path: 'orders',
                name: 'orders',
                meta: {
                    title: '订单',
                },
                component: Orders
            }, {
                path: 'mine',
                name: 'mine',
                meta: {
                    title: '我的',
                    keepAlive: true
                },
                component: Mine
            }]
        }, {
            path: '/cart',
            name: 'cart',
            meta: {
                title: '购物车',
            },
            component: Cart,
        }, {
            path: '/detail/:code',
            name: 'detail',
            meta: {
                title: '商品详情',
            },
            component: productDetail,
        }, {
            path: '/orderDetail/:orderId',
            name: 'orderDetail',
            meta: {
                title: '订单详情',
            },
            component: OrderDetail,
        }, {
            path: '/OrderSubmit',
            name: 'OrderSubmit',
            meta: {
                title: '订单详情',
            },
            component: OrderSubmit,
        }, { //wx 新增个人信息的页面
            path: '/addPersonalInformation',
            name: 'addPersonalInformation',
            meta: {
                title: '个人信息',
            },
            component: addPersonalInformation,
        }, { //wx 编辑个人信息的页面
            path: '/editPersonalInformation',
            name: 'editPersonalInformation',
            meta: {
                title: '编辑个人信息',
            },
            component: editPersonalInformation,
        }, { //wx 我的收货人的页面
            path: '/myConsignee',
            name: 'myConsignee',
            meta: {
                title: '我的收货人',
            },
            component: myConsignee,
        }, { //wx 编辑收货人
            path: '/editConsignee',
            name: 'editConsignee',
            meta: {
                title: '编辑收货人',
            },
            component: editConsignee,
        }, { //wx 新增收货人
            path: '/addConsignee',
            name: 'addConsignee',
            meta: {
                title: '新增收货人',
            },
            component: addConsignee,
        }
    ]
})
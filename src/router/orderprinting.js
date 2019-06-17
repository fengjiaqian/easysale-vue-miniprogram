//扫描登录
const Orderprinting = (resolve) => {
    import('views/orderprinting/orderprinting.vue').then((module) => {
        resolve(module)
    })
}

const Orderlist = (resolve) => {
    import('views/orderprinting/orderlist.vue').then((module) => {
        resolve(module)
    })
}



const orderprinting = [
    {
        path: '/orderprinting',
        name: 'orderprinting',
        component: Orderprinting,
    },
    {
        path: '/orderlist',
        name: 'orderlist',
        component: Orderlist,
    }]
export default orderprinting

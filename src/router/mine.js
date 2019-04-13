/* 我的页面 */
const My = (resolve) => {
    import('@/views/mine/my.vue').then((module) => { resolve(module) })
}

//店铺信息
const UserInfo = (resolve) => {
    import('@/views/mine/user/userInfo.vue').then((module) => { resolve(module) })
}

//我的邀请码
const UserInviteCode = (resolve) => {
    import('@/views/mine/user/userInviteCode.vue').then((module) => { resolve(module) })
}

//我的数据统计
const Statistical = (resolve) => {
    import('@/views/mine/statistical/statistical.vue').then((module) => { resolve(module) })
}

//商品管理-商品列表
const ProductManage = (resolve) => {
    import('@/views/mine/productManage/productList.vue').then((module) => { resolve(module) })
}

//商品管理-添加自有商品
const AddProduct = (resolve) => {
    import('@/views/mine/productManage/addProduct.vue').then((module) => { resolve(module) })
}

//商品管理-导入易酒批商品
const ImportProduct = (resolve) => {
    import('@/views/mine/productManage/importProduct.vue').then((module) => { resolve(module) })
}

//员工管理-我的员工列表
const StaffList = (resolve) => {
    import('@/views/mine/staffManage/staffList.vue').then((module) => { resolve(module) })
}

//客户管理-我的客户列表
const CustomerList = (resolve) => {
    import('@/views/mine/customerManage/customerList.vue').then((module) => { resolve(module) })
}

const mine = [
    {
        path: '/my',
        name: 'my',
        component: My,
        children: [
            {
                path: 'userInfo',
                name: 'userInfo',
                meta: {
                    title: '店铺信息',
                    keepAlive: true
                },
                component: UserInfo
            },
            {
                path: 'userInviteCode',
                name: 'userInviteCode',
                meta: {
                    title: '我的邀请码',
                    keepAlive: true
                },
                component: UserInviteCode
            },
            {
                path: 'statistical',
                name: 'statistical',
                meta: {
                    title: '数据统计'
                },
                component: Statistical
            },
            {
                path: 'productList',
                name: 'productList',
                meta: {
                    title: '商品管理'
                },
                component: ProductManage
            },
            {
                path: 'addProduct',
                name: 'addProduct',
                meta: {
                    title: '添加自有商品'
                },
                component: AddProduct
            },
            {
                path: 'importProduct',
                name: 'importProduct',
                meta: {
                    title: '导入易酒批商品'
                },
                component: ImportProduct
            },
            {
                path: 'staffList',
                name: 'staffList',
                meta: {
                    title: '员工管理'
                },
                component: StaffList
            },
            {
                path: 'customerList',
                name: 'customerList',
                meta: {
                    title: '客户管理'
                },
                component: CustomerList
            }
        ]
    }]
export default mine

/* 我的页面 */
const My = (resolve) => {
    import('@/views/mine/my.vue').then((module) => {
        resolve(module)
    })
}

//店铺信息
const UserInfo = (resolve) => {
    import('@/views/mine/user/userInfo.vue').then((module) => {
        resolve(module)
    })
}

//修改店铺信息
const UserInfoEdit = (resolve) => {
    import('@/views/mine/user/userInfoEdit.vue').then((module) => {
        resolve(module)
    })
}

//我的邀请码
const UserInviteCode = (resolve) => {
    import('@/views/mine/user/userInviteCode.vue').then((module) => {
        resolve(module)
    })
}

//我的数据统计
const Statistical = (resolve) => {
    import('@/views/mine/statistical/statistical.vue').then((module) => { resolve(module) })
}

//我的数据统计-下单商品统计
const StatisProductList = (resolve) => {
    import('@/views/mine/statistical/statisProductList.vue').then((module) => { resolve(module) })
}

//我的数据统计-下单用户统计
const StatisCustomerList = (resolve) => {
    import('@/views/mine/statistical/statisCustomerList.vue').then((module) => { resolve(module) })
}

//商品管理-商品列表
const ProductManage = (resolve) => {
    import('@/views/mine/productManage/productList.vue').then((module) => { resolve(module) })
}

//商品管理-商品详情
const ManageProductDetail = (resolve) => {
    import('@/views/mine/productManage/productDetail.vue').then((module) => { resolve(module) })
}

//商品管理-编辑商品
const EditProductDetail = (resolve) => {
    import('@/views/mine/productManage/editProduct.vue').then((module) => { resolve(module) })
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

//员工管理-员工详情
const StaffDetail = (resolve) => {
    import('@/views/mine/staffManage/staffDetail.vue').then((module) => { resolve(module) })
}

//员工管理-员工信息编辑
const EditStaffInfo = (resolve) => {
    import('@/views/mine/staffManage/editStaffInfo.vue').then((module) => { resolve(module) })
}

//员工管理-新增员工
const AddStaffInfo = (resolve) => {
    import('@/views/mine/staffManage/addStaffInfo.vue').then((module) => { resolve(module) })
}

//客户管理-我的客户列表
const CustomerList = (resolve) => {
    import('@/views/mine/customerManage/customerList.vue').then((module) => { resolve(module) })
}

//客户管理-客户详情
const CustomerDetail = (resolve) => {
    import('@/views/mine/customerManage/customerDetail.vue').then((module) => { resolve(module) })
}
//客户管理-客户信息编辑
const EditCustomerInfo = (resolve) => {
    import('@/views/mine/customerManage/editCustomerInfo.vue').then((module) => { resolve(module) })
}

//客户管理-新增客户
const AddCustomerInfo = (resolve) => {
    import('@/views/mine/customerManage/addCustomerInfo.vue').then((module) => { resolve(module) })
}

// 终端用户
const customerInfo = (resolve) => { //wx 个人信息
    import('views/mine/mine-user/customerInfo.vue').then((module) => {
        resolve(module)
    })
}
//编辑 用户
const editUserInfo = (resolve) => {
    import('views/mine/mine-user/editUserInfo.vue').then((module) => {
        resolve(module)
    })
}

const myConsignee = (resolve) => { //wx 我的收货人的页面
    import('views/mine/mine-user/myConsignee.vue').then((module) => {
        resolve(module)
    })
}

const updateConsignee = (resolve) => {
    import('views/mine/mine-user/updateConsignee.vue').then((module) => {
        resolve(module)
    })
}

const writeApplicationInformation = (resolve) => { //wx 填写申请信息
    import('views/mine/mine-user/writeApplicationInformation.vue').then((module) => {
        resolve(module)
    })
}

const applyDealer = (resolve) => { //wx 申请经销商
    import('views/mine/mine-user/applyDealer.vue').then((module) => {
        resolve(module)
    })
}
//店主认证
const shopkeeper = (resolve) => {
    import('views/mine/user/shopkeeper.vue').then((module) => {
        resolve(module)
    })
}

const mine = [
    {
        path: '/my',
        name: 'my',
        component: My,
        children: [
            {
                path: 'shopkeeper',
                name: 'shopkeeper',
                meta: {
                    title: '店主认证'
                },
                component: shopkeeper
            },
            {
                path: 'userInfo',
                name: 'userInfo',
                meta: {
                    title: '店铺信息'
                },
                component: UserInfo
            },
            {
                path: 'userInfoEdit',
                name: 'userInfoEdit',
                meta: {
                    title: '修改店铺信息'
                },
                component: UserInfoEdit
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
                path: 'statisProductList',
                name: 'statisProductList',
                meta: {
                    title: '下单商品数量'
                },
                component: StatisProductList
            },
            {
                path: 'statisCustomerList',
                name: 'statisCustomerList',
                meta: {
                    title: '下单用户数量'
                },
                component: StatisCustomerList
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
                path: 'productDetail',
                name: 'productDetail',
                meta: {
                    title: '商品详情'
                },
                component: ManageProductDetail
            },
            {
                path: 'editProduct',
                name: 'editProduct',
                meta: {
                    title: '编辑商品'
                },
                component: EditProductDetail
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
                path: 'staffDetail',
                name: 'staffDetail',
                meta: {
                    title: '员工详情'
                },
                component: StaffDetail
            },
            {
                path: 'editStaffInfo',
                name: 'editStaffInfo',
                meta: {
                    title: '编辑员工信息'
                },
                component: EditStaffInfo
            },
            {
                path: 'addStaffInfo',
                name: 'addStaffInfo',
                meta: {
                    title: '新增员工'
                },
                component: AddStaffInfo
            },
            {
                path: 'customerList',
                name: 'customerList',
                meta: {
                    title: '客户管理'
                },
                component: CustomerList
            },
            {
                path: 'customerDetail',
                name: 'customerDetail',
                meta: {
                    title: '客户详情'
                },
                component: CustomerDetail
            },
            {
                path: 'editCustomerInfo',
                name: 'editCustomerInfo',
                meta: {
                    title: '编辑客户信息'
                },
                component: EditCustomerInfo
            },
            {
                path: 'addCustomerInfo',
                name: 'addCustomerInfo',
                meta: {
                    title: '新增客户'
                },
                component: AddCustomerInfo
            },
            // 终端用户Mine pages  
            {
                path: '/customerInfo',
                name: 'customerInfo',
                meta: {
                    title: '个人信息',
                },
                component: customerInfo
            },
            {
                path: '/editUserInfo',
                name: 'editUserInfo',
                meta: {
                    title: '编辑个人信息',
                },
                component: editUserInfo
            },
            {
                path: '/myConsignee',
                name: 'myConsignee',
                meta: {
                    title: '我的收货人',
                    requireAuth: true
                },
                component: myConsignee,
            },
            {
                path: '/updateConsignee/:code',
                name: 'updateConsignee',
                meta: {
                    title: '收货人',
                },
                component: updateConsignee,
            },
            {
                path: '/writeApplicationInformation',
                name: 'writeApplicationInformation',
                meta: {
                    title: '申请开店',
                    requireAuth: true
                },
                component: writeApplicationInformation,
            },
            {
                path: '/applyDealer',
                name: 'applyDealer',
                meta: {
                    title: '申请经销商',
                },
                component: applyDealer,
            }
        ]
    }]

export default mine

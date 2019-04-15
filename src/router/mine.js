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

//商品管理-商品列表
const ProductManage = (resolve) => {
    import('@/views/mine/productManage/productList.vue').then((module) => { resolve(module) })
}

//商品管理-商品详情
const ManageProductDetail = (resolve) => {
    import('@/views/mine/productManage/productDetail.vue').then((module) => { resolve(module) })
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


const addPersonalInformation = (resolve) => { //wx 新增个人信息的页面
    import('views/mine/mine-user/addPersonalInformation.vue').then((module) => {
        resolve(module)
    })
}

const editPersonalInformation = (resolve) => { //wx 编辑个人信息的页面
    import('views/mine/mine-user/editPersonalInformation.vue').then((module) => {
        resolve(module)
    })
}

const myConsignee = (resolve) => { //wx 我的收货人的页面
    import('views/mine/mine-user/myConsignee.vue').then((module) => {
        resolve(module)
    })
}

const editConsignee = (resolve) => { //wx 编辑收货人的页面
    import('views/mine/mine-user/editConsignee.vue').then((module) => {
        resolve(module)
    })
}

const addConsignee = (resolve) => { //wx 新增收货人的页面
    import('views/mine/mine-user/addConsignee.vue').then((module) => {
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
                    title: '店铺信息'
                },
                component: UserInfo
            },
            {
                path: 'userInfoEdit',
                name: 'userInfoEdit',
                meta: {
                    title: '店铺信息'
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
            { //wx 新增个人信息的页面
                path: '/addPersonalInformation',
                name: 'addPersonalInformation',
                meta: {
                    title: '个人信息',
                },
                component: addPersonalInformation,
            },
            { //wx 编辑个人信息的页面
                path: '/editPersonalInformation',
                name: 'editPersonalInformation',
                meta: {
                    title: '编辑个人信息',
                },
                component: editPersonalInformation,
            },
            { //wx 我的收货人的页面
                path: '/myConsignee',
                name: 'myConsignee',
                meta: {
                    title: '我的收货人',
                },
                component: myConsignee,
            },
            { //wx 编辑收货人
                path: '/editConsignee',
                name: 'editConsignee',
                meta: {
                    title: '编辑收货人',
                },
                component: editConsignee,
            },
            { //wx 新增收货人
                path: '/addConsignee',
                name: 'addConsignee',
                meta: {
                    title: '新增收货人',
                },
                component: addConsignee,
            },
            { //wx 填写申请信息
                path: '/writeApplicationInformation',
                name: 'writeApplicationInformation',
                meta: {
                    title: '填写申请信息',
                },
                component: writeApplicationInformation,
            },
            { //wx 申请经销商   aaaa
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

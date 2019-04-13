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

//我的邀请码
const UserInviteCode = (resolve) => {
    import('@/views/mine/user/userInviteCode.vue').then((module) => {
        resolve(module)
    })
}

//我的数据统计
const Statistical = (resolve) => {
    import('views/mine/statistical/statistical.vue').then((module) => {
        resolve(module)
    })
}

const addPersonalInformation = (resolve) => { //wx 新增个人信息的页面
    import('views/wxDescript/addPersonalInformation.vue').then((module) => {
        resolve(module)
    })
}

const editPersonalInformation = (resolve) => { //wx 编辑个人信息的页面
    import('views/wxDescript/editPersonalInformation.vue').then((module) => {
        resolve(module)
    })
}

const myConsignee = (resolve) => { //wx 我的收货人的页面
    import('views/wxDescript/myConsignee.vue').then((module) => {
        resolve(module)
    })
}

const editConsignee = (resolve) => { //wx 编辑收货人的页面
    import('views/wxDescript/editConsignee.vue').then((module) => {
        resolve(module)
    })
}

const addConsignee = (resolve) => { //wx 新增收货人的页面
    import('views/wxDescript/addConsignee.vue').then((module) => {
        resolve(module)
    })
}

const mine = [{
    path: '/my',
    name: 'my',
    component: My,
    children: [{
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
}]
export default mine

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
            }
        ]
    }]
export default mine

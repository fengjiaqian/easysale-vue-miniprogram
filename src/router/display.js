/* 陈列模块V-2 */

//陈列列表-终端客户
const DisplayList = (resolve) => {
    import('@/views/display/displayList.vue').then((module) => {
        resolve(module)
    })
}

//陈列-终端客户-申请陈列
const DisplayApply = (resolve) => {
    import('@/views/display/displayApply.vue').then((module) => {
        resolve(module)
    })
}

//陈列-终端客户-陈列详情
const DisplayDetail = (resolve) => {
    import('@/views/display/displayDetail.vue').then((module) => {
        resolve(module)
    })
}

//陈列管理列表
const DisplayManage = (resolve) => {
    import('@/views/display/displayManage.vue').then((module) => {
        resolve(module)
    })
}

//陈列管理详情
const DetailManage = (resolve) => {
    import('@/views/display/detailManage.vue').then((module) => {
        resolve(module)
    })
}


const display = [
    {
        path: '/displayList',
        name: 'displayList',
        meta: {
            title: '陈列'
        },
        component: DisplayList
    },
    {
        path: '/displayApply',
        name: 'displayApply',
        meta: {
            title: '申请陈列'
        },
        component: DisplayApply
    },
    {
        path: '/displayDetail',
        name: 'displayDetail',
        meta: {
            title: '陈列详情'
        },
        component: DisplayDetail
    },
    {
        path: '/displayManage',
        name: 'displayManage',
        meta: {
            title: '陈列管理'
        },
        component: DisplayManage
    },
    {
        path: '/detailManage',
        name: 'detailManage',
        meta: {
            title: '陈列详情'
        },
        component: DetailManage
    },
]

export default display

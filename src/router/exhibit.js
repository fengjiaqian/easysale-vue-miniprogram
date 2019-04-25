/* 陈列模块 */

//陈列管理列表
const ExhibitList = (resolve) => {
    import('@/views/exhibit/exhibitList.vue').then((module) => {
        resolve(module)
    })
}

//陈列任务详情
const ExhibitTaskInfo = (resolve) => {
    import('@/views/exhibit/exhibitTaskInfo.vue').then((module) => {
        resolve(module)
    })
}

//新建陈列任务
const AddExhibitTask = (resolve) => {
    import('@/views/exhibit/addExhibitTask.vue').then((module) => {
        resolve(module)
    })
}

//可选产品列表
const ChooseProductList = (resolve) => {
    import('@/views/exhibit/chooseProductList.vue').then((module) => {
        resolve(module)
    })
}

//陈列情况列表
const ExhibitStateList = (resolve) => {
    import('@/views/exhibit/exhibitStateList.vue').then((module) => {
        resolve(module)
    })
}

//陈列执行详情
const PerformDetail = (resolve) => {
    import('@/views/exhibit/performDetail.vue').then((module) => {
        resolve(module)
    })
}

//执行详情记录
const PerformRecord = (resolve) => {
    import('@/views/exhibit/performRecord.vue').then((module) => {
        resolve(module)
    })
}

const exhibit = [
    {
        path: '/exhibitList',
        name: 'exhibitList',
        meta: {
            title: '陈列管理'
        },
        component: ExhibitList
    },
    {
        path: '/exhibitTaskInfo',
        name: 'exhibitTaskInfo',
        meta: {
            title: '陈列任务详情'
        },
        component: ExhibitTaskInfo
    },
    {
        path: '/addExhibitTask',
        name: 'addExhibitTask',
        meta: {
            title: '新建陈列'
        },
        component: AddExhibitTask
    },
    {
        path: '/chooseProductList',
        name: 'chooseProductList',
        meta: {
            title: '可选陈列商品'
        },
        component: ChooseProductList
    },
    {
        path: '/exhibitStateList',
        name: 'exhibitStateList',
        meta: {
            title: '陈列情况'
        },
        component: ExhibitStateList
    },
    {
        path: '/performDetail',
        name: 'performDetail',
        meta: {
            title: '陈列详情'
        },
        component: PerformDetail
    },
    {
        path: '/performRecord',
        name: 'performRecord',
        meta: {
            title: '执行详情'
        },
        component: PerformRecord
    },
]

export default exhibit

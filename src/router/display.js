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
]

export default display

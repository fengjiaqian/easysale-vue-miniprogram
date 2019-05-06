/* 陈列模块V-2 */

//陈列列表-终端客户
const DisplayList = (resolve) => {
    import('@/views/display/displayList.vue').then((module) => {
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
]

export default display

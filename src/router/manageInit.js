// 投诉管理首页
const complaintsHomepage = (resolve) => {
    import('views/complaint/complaintsHomepage.vue').then((module) => {
        resolve(module)
    })
}


const manageInit = [
    {
        path: '/complaintsHomepage',
        name: 'complaintsHomepage',
        meta: {
            title: '投诉管理',
        },
        component: complaintsHomepage,
    }
]


export default manageInit

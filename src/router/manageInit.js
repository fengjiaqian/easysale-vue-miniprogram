// 投诉管理首页
const complaintsHomepage = (resolve) => {
    import('views/complaint/complaintsHomepage.vue').then((module) => {
        resolve(module)
    })
};
const addNewComplaint = (resolve) => {
    import('views/complaint/addNewComplaint.vue').then((module) => {
        resolve(module)
    })
};


const manageInit = [
    {
        path: '/complaintsHomepage',
        name: 'complaintsHomepage',
        meta: {
            title: '投诉管理',
        },
        component: complaintsHomepage,
    },
    {
        path: '/addNewComplaint',
        name: 'addNewComplaint',
        meta: {
            title: '投诉管理',
        },
        component: addNewComplaint,
    }
]


export default manageInit

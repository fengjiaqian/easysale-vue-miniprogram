// 投诉+兑奖+退货管理模块

// 投诉管理首页
const complaintHomepage = (resolve) => {
    import('views/complaint/complaintHomepage.vue').then((module) => {
        resolve(module)
    })
};
//新增投诉
const addNewComplaint = (resolve) => {
    import('views/complaint/addNewComplaint.vue').then((module) => {
        resolve(module)
    })
};
// 投诉详情
const complaintDetail = (resolve) => {
    import('views/complaint/complaintDetail.vue').then((module) => {
        resolve(module)
    })
};
// 兑奖管理首页
const redemptionHomepage = (resolve) => {
    import('views/redemption/redemptionHomepage.vue').then((module) => {
        resolve(module)
    })
};
// 兑奖详情
const redemptionDetail = (resolve) => {
    import('views/redemption/redemptionDetail.vue').then((module) => {
        resolve(module)
    })
};
// 新增兑奖单
const addNewRedemption = (resolve) => {
    import('views/redemption/addNewRedemption.vue').then((module) => {
        resolve(module)
    })
};

// 退货管理
const returnHomepage = (resolve) => {
    import('views/returnGoods/returnHomepage.vue').then((module) => {
        resolve(module)
    })
};
// 退货详情
const returnDetail = (resolve) => {
    import('views/returnGoods/returnDetail.vue').then((module) => {
        resolve(module)
    })
};

// 终端退货管理
const addNewReturnOrder = (resolve) => {
    import('views/returnGoods/addNewReturnOrder.vue').then((module) => {
        resolve(module)
    })
};
const manageInit = [

    {
        path: '/complaintHomepage',
        name: 'complaintHomepage',
        meta: {
            title: '意见管理',
        },
        component: complaintHomepage,
    },
    {
        path: '/addNewComplaint',
        name: 'addNewComplaint',
        meta: {
            title: '新建意见单',
        },
        component: addNewComplaint,
    },
    {
        path: '/complaintDetail',
        name: 'complaintDetail',
        meta: {
            title: '意见详情',
        },
        component: complaintDetail,
    },
    {
        path: '/redemptionHomepage',
        name: 'redemptionHomepage',
        meta: {
            title: '兑奖管理',
        },
        component: redemptionHomepage,
    },
    {
        path: '/redemptionDetail',
        name: 'redemptionDetail',
        meta: {
            title: '兑奖详情',
        },
        component: redemptionDetail,
    },
    {
        path: '/addNewRedemption',
        name: 'addNewRedemption',
        meta: {
            title: '新建兑奖单',
        },
        component: addNewRedemption,
    },
    {
        path: '/returnHomepage',
        name: 'returnHomepage',
        meta: {
            title: '退货管理',
        },
        component: returnHomepage,
    }
    ,
    {
        path: '/returnDetail',
        name: 'returnDetail',
        meta: {
            title: '退货详情',
        },
        component: returnDetail,
    }
    ,

    {
        path: '/addNewReturnOrder',
        name: 'addNewReturnOrder',
        meta: {
            title: '新建退货单',
        },
        component: addNewReturnOrder,
    },

]


export default manageInit

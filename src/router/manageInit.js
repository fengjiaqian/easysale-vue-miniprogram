// 投诉+兑奖+退货管理模块

// 终端投诉管理首页
const clientComplaintsHomepage = (resolve) => {
    import('views/complaint/clientComplaintsHomepage.vue').then((module) => {
        resolve(module)
    })
};
// 经销商投诉管理首页
const dealerComplaintHomepage = (resolve) => {
    import('views/complaint/dealerComplaintHomepage.vue').then((module) => {
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
// 经销商兑奖管理首页
const dealerRedemptionHomepage = (resolve) => {
    import('views/redemption/dealerRedemptionHomepage.vue').then((module) => {
        resolve(module)
    })
};
// 终端兑奖管理首页
const clientRedemptionHomepage = (resolve) => {
    import('views/redemption/clientRedemptionHomepage.vue').then((module) => {
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
// 添加兑奖商品
const addRedemptionGoods = (resolve) => {
    import('views/redemption/addRedemptionGoods.vue').then((module) => {
        resolve(module)
    })
};
// 经销商退货管理
const dealerReturnHomepage = (resolve) => {
    import('views/returnGoods/dealerReturnHomepage.vue').then((module) => {
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
const clientReturnHomepage = (resolve) => {
    import('views/returnGoods/clientReturnHomepage.vue').then((module) => {
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
        path: '/clientComplaintsHomepage',
        name: 'clientComplaintsHomepage',
        meta: {
            title: '投诉列表',
        },
        component: clientComplaintsHomepage,
    },
    {
        path: '/dealerComplaintHomepage',
        name: 'dealerComplaintHomepage',
        meta: {
            title: '投诉管理',
        },
        component: dealerComplaintHomepage,
    },
    {
        path: '/addNewComplaint',
        name: 'addNewComplaint',
        meta: {
            title: '新建投诉',
        },
        component: addNewComplaint,
    },
    {
        path: '/complaintDetail',
        name: 'complaintDetail',
        meta: {
            title: '投诉详情',
        },
        component: complaintDetail,
    },
    {
        path: '/dealerRedemptionHomepage',
        name: 'dealerRedemptionHomepage',
        meta: {
            title: '兑奖管理',
        },
        component: dealerRedemptionHomepage,
    },
    {
        path: '/clientRedemptionHomepage',
        name: 'clientRedemptionHomepage',
        meta: {
            title: '兑奖列表',
        },
        component: clientRedemptionHomepage,
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
        path: '/addRedemptionGoods',
        name: 'addRedemptionGoods',
        meta: {
            title: '可选兑奖商品',
        },
        component: addRedemptionGoods,
    },
    {
        path: '/dealerReturnHomepage',
        name: 'dealerReturnHomepage',
        meta: {
            title: '退货管理',
        },
        component: dealerReturnHomepage,
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
        path: '/clientReturnHomepage',
        name: 'clientReturnHomepage',
        meta: {
            title: '退货列表',
        },
        component: clientReturnHomepage,
    },
    {
        path: '/addNewReturnOrder',
        name: 'addNewReturnOrder',
        meta: {
            title: '退货列表',
        },
        component: addNewReturnOrder,
    }
]


export default manageInit

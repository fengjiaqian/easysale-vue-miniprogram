// 投诉+兑奖的路由

//wx   终端客户的 “新建投诉”的页面
const newComplaint = (resolve) => {  
	import('views/complaint/client/newComplaint.vue').then((module) => {
		resolve(module)
	})
}

 //wx   终端客户的 “投诉列表”的页面
const complaintList = (resolve) => { 
	import('views/complaint/client/complaintList.vue').then((module) => {
		resolve(module)
	})
}


 //wx   终端客户的 “投诉详情”的页面
 const complaintDetail = (resolve) => { 
	import('views/complaint/client/complaintDetail.vue').then((module) => {
		resolve(module)
	})
}

 //wx   终端客户的 “新建兑奖”的页面
 const newAward = (resolve) => { 
	import('views/award/client/newAward.vue').then((module) => {
		resolve(module)
	})
}

 //wx   终端客户的 “选择兑奖”的页面
 const chooseAward = (resolve) => { 
	import('views/award/client/chooseAward.vue').then((module) => {
		resolve(module)
	})
}

//wx   终端客户的 “兑奖列表”的页面
const awardList = (resolve) => { 
	import('views/award/client/awardList.vue').then((module) => {
		resolve(module)
	})
}

//wx   终端客户的 “兑奖详情”的页面
const awardDetail = (resolve) => { 
	import('views/award/client/awardDetail.vue').then((module) => {
		resolve(module)
	})
}

// 以上是终端客户的“兑奖”+“投诉”的路由

// wx 经销商 “投诉管理”的页面
const complaintManagement = (resolve) => { 
	import('views/complaint/dealer/complaintManagement.vue').then((module) => {
		resolve(module)
	})
}

// wx 经销商 “投诉详情”的页面
const dealerComplaintDetail = (resolve) => { 
	import('views/complaint/dealer/dealerComplaintDetail.vue').then((module) => {
		resolve(module)
	})
}

// wx 经销商 “兑奖管理”的页面
const dealerAwardManage = (resolve) => { 
	import('views/award/dealer/dealerAwardManage.vue').then((module) => {
		resolve(module)
	})
}

const complain = [
    {
        path: '/newComplaint',
        name: 'newComplaint',
        meta: {
            title: '新建投诉',
        },
        component: newComplaint,
    },{
        path: '/complaintList',
        name: 'complaintList',
        meta: {
            title: '投诉列表',
        },
        component: complaintList,
    },{
        path: '/complaintDetail',
        name: 'complaintDetail',
        meta: {
            title: '投诉详情',
        },
        component: complaintDetail,
    },{
        path: '/newAward',
        name: 'newAward',
        meta: {
            title: '新建兑奖',
        },
        component: newAward,
    },{
        path: '/chooseAward',
        name: 'chooseAward',
        meta: {
            title: '可选兑换商品',
        },
        component: chooseAward,
    },{
        path: '/awardList',
        name: 'awardList',
        meta: {
            title: '兑奖列表',
        },
        component: awardList,
    },{
        path: '/awardDetail',
        name: 'awardDetail',
        meta: {
            title: '兑奖详情',
        },
        component: awardDetail,
    },{
        path: '/complaintManagement',
        name: 'complaintManagement',
        meta: {
            title: '投诉管理',
        },
        component: complaintManagement,
    },{
        path: '/dealerComplaintDetail',
        name: 'dealerComplaintDetail',
        meta: {
            title: '投诉详情',
        },
        component: dealerComplaintDetail,
    },{
        path: '/dealerAwardManage',
        name: 'dealerAwardManage',
        meta: {
            title: '兑奖管理',
        },
        component: dealerAwardManage,
    }
]


export default complain
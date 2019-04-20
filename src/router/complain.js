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
    }
]


export default complain
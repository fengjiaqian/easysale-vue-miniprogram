// 投诉的路由

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
            title: '投诉列表',
        },
        component: complaintDetail,
    }
]


export default complain
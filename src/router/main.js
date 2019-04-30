
const Tab = (resolve) => {
	import('components/Tab.vue').then((module) => {
		resolve(module)
	})
}
const Home = (resolve) => {
	import('views/Home.vue').then((module) => {
		resolve(module)
	})
}
const Service = (resolve) => {
	import('views/Service.vue').then((module) => {
		resolve(module)
	})
}
const Orders = (resolve) => {
	import('views/Orders.vue').then((module) => {
		resolve(module)
	})
}
const Mine = (resolve) => {
	import('views/mine/Mine.vue').then((module) => {
		resolve(module)
	})
}
const productDetail = (resolve) => {
	import('views/productDetail.vue').then((module) => {
		resolve(module)
	})
}
const Cart = (resolve) => {
	import('views/Cart.vue').then((module) => {
		resolve(module)
	})
}
const OrderDetail = (resolve) => {
	import('views/order/OrderDetail.vue').then((module) => {
		resolve(module)
	})
}

const OrderSubmit = (resolve) => {
	import('views/order/OrderSubmit.vue').then((module) => {
		resolve(module)
	})
}

const GoodsList = (resolve) => {
	import('views/order/GoodsList.vue').then((module) => {
		resolve(module)
	})
}
const OrderResult = (resolve) => {
	import('views/order/OrderResult.vue').then((module) => {
		resolve(module)
	})
}
const Search = (resolve) => {
	import('views/Search.vue').then((module) => {
		resolve(module)
	})
}

const DealerList = (resolve) => {
	import('views/other/DealerList.vue').then((module) => {
		resolve(module)
	})
}

const main = [{
	path: '',
	redirect: '/navi/home'
},
{
	path: '/navi',
	name: 'navi',
	component: Tab,
	children: [{
		path: 'home',
		name: 'home',
		meta: {
			title: '首页',
			keepAlive: true
		},
		component: Home
	}, {
		path: 'service',
		name: 'service',
		meta: {
			title: '服务',
			keepAlive: true
		},
		component: Service
	}, {
		path: 'orders',
		name: 'orders',
		meta: {
			title: '订单',
			keepAlive: true
		},
		component: Orders
	}, {
		path: 'mine',
		name: 'mine',
		meta: {
			title: '我的',
			keepAlive: true
		},
		component: Mine
	}]
}, {
	path: '/cart',
	name: 'cart',
	meta: {
		title: '购物车',
	},
	component: Cart,
}, {
	path: '/detail/:code',
	name: 'detail',
	meta: {
		title: '商品详情',
	},
	component: productDetail,
}, {
	path: '/orderDetail/:orderId',
	name: 'orderDetail',
	meta: {
		title: '订单详情',
	},
	component: OrderDetail,
}, {
	path: '/orderSubmit',
	name: 'orderSubmit',
	meta: {
		title: '订单提交',
	},
	component: OrderSubmit,
}, {
	path: '/goodsList',
	name: 'goodsList',
	meta: {
		title: '商品清单',
	},
	component: GoodsList,
}, {
	path: '/orderResult',
	name: 'orderResult',
	meta: {
		title: '提交订单结果页',
	},
	component: OrderResult,
}, {
	path: '/search',
	name: 'search',
	meta: {
		title: '搜索'
	},
	component: Search,
}, {
	path: '/dealerList',
	name: 'dealerList',
	meta: {
		title: '选择商贸公司',
	},
	component: DealerList,
}
]


export default main
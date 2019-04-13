
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
const UserInfo = (resolve) => {
	import('views/mine/user/userInfo.vue').then((module) => {
		resolve(module)
	})
}


const OrderDetail = (resolve) => {
	import('views/OrderDetail.vue').then((module) => {
		resolve(module)
	})
}

const OrderSubmit = (resolve) => {
	import('views/OrderSubmit.vue').then((module) => {
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
		path: '/OrderSubmit',
		name: 'OrderSubmit',
		meta: {
			title: '订单详情',
		},
		component: OrderSubmit,
	}
]


export default main
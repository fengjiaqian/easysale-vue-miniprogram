import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

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
	import('views/Mine.vue').then((module) => {
		resolve(module)
	})
}
const productDetail = (resolve) => {
	import('views/productDetail.vue').then((module) => {
		resolve(module)
	})
}

export default new Router({
	routes: [{
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
		path: '/detail',
		name: 'detail',
		meta: {
			title: '商品详情',
			keepAlive: true
		},
		component: productDetail,
	}
	]
})

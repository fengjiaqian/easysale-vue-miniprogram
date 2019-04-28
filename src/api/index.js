import axios from 'axios'
import storage from "common/storage";
import $Loading from '../plugins/dialog/loading'

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

axios.interceptors.request.use(function (config) {

	const token = storage.get("token", "");
	const userType = storage.get("userType", "");
	const currentDealerId = storage.get("currentDealerId", "") || "";
	if (token) {
		config.headers.token = token;
	}
	config.data.dealerId = currentDealerId;
	config.data.dealer_id = currentDealerId;
	//TODO:加载中的转圈
	if (config.loading) {
		$Loading.getInstance();
	}
	// //开发环境还是生产环境，生产环境通过nginx代理
	// if (IS_PROD) {
	//	if (config.url && config.url.startsWith('ua')) {
	// 		config.url = config.url
	// 		config.url = "/" + config.url.replace("ua/", "himalaya-ApiService-UA2/")
	// 	} else {
	// 		config.url = "/v31" + config.url
	// 	}
	// }
	if (IS_PROD) {
		config.url = "/easysaleapi" + config.url
	}
	return config;
}, function (error) {
	return Promise.reject(error);
});


axios.interceptors.response.use(function (response) {
	if (response.config.loading) {
		$Loading && $Loading.close()
	}
	if (response.data.result != 'success') {
		return Promise.reject(response);
	}
	// if (response.data && (response.data.message === '100102009'
	// 	|| response.data.desc == '登录已过期，请重新登录~')) {

	// 	if (window.__wxjs_environment === 'miniprogram') {
	// 		//如果是易酒批商品
	// 		let loginType = localStorage.getItem('loginType')
	// 		if(loginType=='YjtBizuser'){
	// 			wx.miniProgram.reLaunch({ url: '/pages/wechat/wechat' })
	// 		}else{
	// 			wx.miniProgram.reLaunch({ url: '/pages/login/login' })
	// 		}
	// 	} else {
	// 		window.parent.postMessage({
	// 			yijiupiType: 0
	// 		}, "*");
	// 	}
	// }
	return response;
}, function (error) {
	if (error.config.loading) {
		$Loading && $Loading.close()
	}
	return Promise.reject(error);
});

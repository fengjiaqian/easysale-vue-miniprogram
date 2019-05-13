import axios from 'axios'
import storage from "common/storage";
import $Loading from '../plugins/dialog/loading'

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);

axios.interceptors.request.use(function (config) {

	/**
	 * 2019/05/06 业务变更后  currentDealerId含义即为shopId
	 */
	const token = storage.get("token", "");
	const currentDealerId = storage.get("currentDealerId", "") || "";
	token && (config.headers.token = token);
	currentDealerId && (config.headers.currentShopId = currentDealerId);

	config.timeout = 1000 * 60 // 超时时间1分钟
	config.data.dealerId = config.data.dealerId || currentDealerId;
	config.data.shopId = config.data.dealerId || currentDealerId;
	config.data.dealer_id = config.data.dealer_id || currentDealerId;
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
	// }
	return response;
}, function (error) {
	if (error.config.loading) {
		$Loading && $Loading.close()
	}
	return Promise.reject(error);
});

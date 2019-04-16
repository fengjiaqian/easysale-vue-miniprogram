import axios from 'axios'

//我的模块-用户店铺信息
function queryShopInfo(params) {
	const url = "/dealer/findDealerInfo"
	return axios({
		method: 'post',
		url: url,
		data: params,
		loading: true,
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}

//我的模块-修改店铺信息
function editShopInfo(params) {
	const url = "/dealer/updateDealer"
	return axios({
		method: 'post',
		url: url,
		data: params
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}

//我的模块-数据统计查询
function queryStatisticalData(params) {
	const url = "/performance/getPerformance"
	return axios({
		method: 'post',
		url: url,
		data: params
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}


//我的模块-商品管理-商品列表查询
function queryProductList(params) {
	const url = "/product/productList"
	return axios({
		method: 'post',
		url: url,
		data: params
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}

//我的模块-商品管理-商品列表查询
function queryProductBrand(params) {
	const url = "/product/selectBrandProductList"
	return axios({
		method: 'post',
		url: url,
		data: params
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}

export {
	queryShopInfo, editShopInfo, queryStatisticalData, queryProductList, queryProductBrand
}

import axios from 'axios'

//陈列管理-陈列活动列表
function queryDisplayProduct(params) {
	const url = "/product/afterProductList"
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

//陈列管理-客户新增陈列
function displayApply(params) {
	const url = "/display/saveDisplay"
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


//陈列管理-客户陈列列表
function queryDisplays(params) {
	const url = "/display/displayList"
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

//陈列管理-陈列的经销商列表
function queryDealerShops(params) {
	const url = "/display/selectDealDisplay"
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

//陈列管理-陈列详情查询接口
function queryDisplayDetail(params) {
	const url = "/display/displayDetail"
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

//陈列管理-客户取消陈列
function cancelDisplayApply(params) {
	const url = "/display/cancelDisplay"
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

export {
	queryDisplayProduct, displayApply, queryDisplays, queryDealerShops,
	queryDisplayDetail, cancelDisplayApply
}

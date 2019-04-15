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

export {
	queryShopInfo,editShopInfo
}

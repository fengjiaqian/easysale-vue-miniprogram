import axios from 'axios'

//陈列管理-陈列活动列表
function queryDisplayList(params) {
	const url = "/diaplay/diaplayList"
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

//陈列管理-新增陈列活动
function AddExhibitActivity(params) {
	const url = "/diaplay/shopiteminsert"
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
	queryDisplayList,AddExhibitActivity
}

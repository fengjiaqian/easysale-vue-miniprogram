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

//陈列管理-新增(修改)陈列活动
function addExhibitActivity(params,type) {
	let url = "/diaplay/shopiteminsert"
	//如果是修改
	if(type == `edit`){
		url = "/diaplay/updateDisplay"
	}
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

//陈列管理-删除陈列活动
function deleteExhibit(params) {
	const url = `/diaplay/delshopdisplayitem`
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

//陈列管理-陈列活动详情
function queryExhibitDetail(id) {
	const url = `/diaplay/displayDetail/${id}`
	return axios({
		method: 'get',
		url: url,
		data: {},
		loading: true,
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}


//陈列管理-陈列活动情况执行列表
function queryPerformList(params) {
	const url = `customer/diaplaySignList`
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
	queryDisplayList,addExhibitActivity,queryExhibitDetail,deleteExhibit,
	queryPerformList,
}

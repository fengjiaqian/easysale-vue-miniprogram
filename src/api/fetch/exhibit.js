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
function queryPerformList(params,type) {
	let url = `/customer/diaplaySignList`
	if(type == `apply`) url = `/customer/shopdiaplayList`
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

//陈列管理-陈列跟踪详情
function queryPerformDetail(id) {
	const url = `/customer/diaPlaySignInfo/${id}`
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


//陈列管理-处理陈列申请（拒绝/同意）,处理陈列任务（同意发放奖励/拒绝发放奖励）
function oprateExhibit(params,type) {
	let url = `/customer/batchupdisplaysign`
	if(type==`refuseReward`||type==`agreeReward`) url = `/customer/cusdisplaysignup`
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

//陈列管理-陈列活动情况执行列表
function queryPerformRecordList(params) {
	const url = `/shopdisplayphoto/diaplayPhotoList`
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


//陈列管理-客户执行（或申请中）的陈列任务详情
function querySaleExhibitDetail(id) {
	const url = `/customer/customersigninfo/${id}`
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


//陈列管理-客户点击可申请拉取陈列活动列表
function querySaleMayApplyExhibit(id) {
	const url = `/customer/shopdiaplayList`
	return axios({
		method: 'post',
		url: url,
		data: {},
		loading: true,
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}

//陈列管理-查询客户签约的经销商列表
function querySaleDealers(id) {
	const url = `/customer/querydealers`
	return axios({
		method: 'post',
		url: url,
		data: {},
		loading: true,
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}

//陈列管理-客户操作对应期数上传图片之后完善数据
function uploadExhibitNper(params) {
	const url = `/shopdisplayphoto/updatedisplayitemphoto`
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


//陈列管理-销售人员客户陈列签约列表查询接口
function querySaleSignList(params) {
	const url = `/customer/salecustomersignlist`
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
	queryDisplayList, addExhibitActivity, queryExhibitDetail, deleteExhibit,
	queryPerformList, queryPerformDetail, oprateExhibit, queryPerformRecordList,
	querySaleExhibitDetail, querySaleMayApplyExhibit, querySaleDealers,
	uploadExhibitNper, querySaleSignList
}

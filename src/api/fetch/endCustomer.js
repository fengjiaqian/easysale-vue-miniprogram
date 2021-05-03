// 终端客户的接口
import axios from 'axios'

/**
 * 查询客户收货人列表
 * @param { } keyword  关键字
 */
export function queryCustomerConsigneeList(keyword = "") {

	const url = "/consigneer/listConsigneerByNameOrPhone"
	return axios({
		method: 'post',
		url: url,
		data: {
			keyword
		},
		loading: true,
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}

/**
 * 删除收货人
 * @param {*} id  
 */
export function deleteConsignee(id) {

	const url = "/consigneer/deleteConsigneer"
	return axios({
		method: 'post',
		url: url,
		data: {
			id
		},
		loading: true,
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}

// 修改收货人
export function modifyConsignee(param) {

	const url = "/consigneer/updateConsigneer"
	return axios({
		method: 'post',
		url: url,
		data: param,
		loading: true,
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}
// 修改收货人
export function dealerStatus(param) {

	const url = "/user/dealerstatus"
	return axios({
		method: 'post',
		url: url,
		data: param,
		loading: true,
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}


// 新增收货人
export function addConsigneer(param) {

	const url = "/consigneer/addConsigneer"
	return axios({
		method: 'post',
		url: url,
		data: param,
		loading: true,
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}
/**
 * 客户登录时查看自己的详细信息(包含经销商查看required id)
 * @param {*} id  客户id
 */
export function findCustomerOwerInfo(id = "") {

	const url = "/customer/findCustomerOwerInfo"
	return axios({
		method: 'post',
		url: url,
		data: { id },
		loading: true,
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}

/**
 * 客户查看自己申请的经销商详细信息（客户登录）
 */
export function findApplyDealerInfo() {

	const url = "/customer/findApplyDealerInfo"
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

//客户登录时修改自己的详细信息（客户登录） 
export function updateOwerCustomer(param) {

	const url = "/customer/updateOwerCustomer"
	return axios({
		method: 'post',
		url: url,
		data: param,
		loading: true,
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}


/**
 * 终端用户申请经销商  
 * @param {*} params  Object {name,phone,shopName,address}
 */

export function applyDealer(params) {

	const url = "/dealer/customerApplyToDealer"
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

/**
 *  查询客户收货人列表（客户登录）
 * @param {*} keyword  string  
 */
export function queryAddressList(keyword) {

	const url = "/consigneer/listConsigneerByNameOrPhone"
	return axios({
		method: 'post',
		url: url,
		data: {
			keyword
		},
		loading: true,
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}

/**
 * 客户申请认证店主
 * @param {*} params  Object {name, phone, shopId, LogoIamgeUrls}
 */
export function customershopkeeperCertification(params) {

	const url = "/dealer/customershopkeeperCertification"
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


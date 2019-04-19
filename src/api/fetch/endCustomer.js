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

// 申请经销商   
export function applyDealer(param) {

	const url = "/dealer/updateDealer"
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

// 客户登录时查看自己的详细信息（客户登录）
export function findCustomerOwerInfo() {

	const url = "/customer/findCustomerOwerInfo"
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
const mockData = { "id": 19990530, "shopName": "青春店铺", "phone": "13311112222", "address": "海南按", "userId": 19990530, "hireDate": 1597449600000, "discount": 0.99, "cardId": "55555", "parentId": 1111, "type": 1, "createDate": 1555126727000, "name": "青春作", "state": 1 }
export function mock1() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			return resolve(mockData);
		}, 500)
	})
}

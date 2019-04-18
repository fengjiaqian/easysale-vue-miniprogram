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
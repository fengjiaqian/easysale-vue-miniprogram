// 终端客户的接口
import axios from 'axios'


// 查询客户收货人列表
export function queryCustomerConsigneeList(param) {

	const url = "/consigneer/listConsigneerByNameOrPhone"
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

// 查询客户详情信息
export function addConsignee(param) {

	const url = "/customer/findCustomerInfo"
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
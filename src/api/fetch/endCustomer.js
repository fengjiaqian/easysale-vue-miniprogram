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

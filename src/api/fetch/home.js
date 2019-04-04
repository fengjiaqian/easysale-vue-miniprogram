import axios from 'axios'
//请求团购商品列表 - new api 
export function ListProduct(params = {}) {
	var paramsData = {
		currentPage: params.currentPage || 1,
		pageSize: params.pageSize || 20,
		data: params
	}
	const url = "/Product/ListGroupBuyProduct"
	return axios({
		method: 'post',
		url: url,
		data: paramsData,
		loading: true,
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}
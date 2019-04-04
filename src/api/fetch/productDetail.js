import axios from 'axios'

export function queryProductDetail(skuId) {

	const url = "/product/productDetail"
	return axios({
		method: 'post',
		url: url,
		data: {
			id: skuId
		},
		loading: true,
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}


export function test() {

	const url = "/product/dealerProductList"
	return axios({
		method: 'post',
		url: url,
		data: {
			productInfoName: '娃哈哈'
		},
		loading: true,
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}
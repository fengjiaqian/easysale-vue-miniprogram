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


import axios from 'axios'
//请求团购商品列表 - new api 
export function ListProduct(params = {}) {

	var paramsData = {
		dealerId: params.dealerId,
		brandId: params.brandId,
		pageNum: params.pageNum || 1,
		pageSize: params.pageSize || 20,
	}
	const url = "/product/productList"
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

// 19990530  首页类目商品
export function queryHomeProducts(id) {

	const url = "/product/selectBrandProductList";
	return axios({
		method: 'post',
		url: url,
		data: {
			dealerId: id
		},
		loading: true,
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}
import axios from 'axios'
//请求团购商品列表 - new api 
export function ListProduct(params = {}) {

	var paramsData = {
		dealerId: params.dealerId,
		brandId: params.brandId,
		pageNum: params.pageNum || 1,
		pageSize: params.pageSize || 20,
		searchKey: params.searchKey || '',
		state: 1
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
export function queryHomeProducts() {

	const url = "/product/selectBrandProductList";
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

/**
 * 查询所有经销商列表
 */
export function ListAllDealer(params = {}) {

	const paramsData = Object.assign({
		pageNum: 1,
		pageSize: 6
	}, params);
	const url = "/user/listAllShop";
	return axios({
		method: 'post',
		url,
		data: paramsData,
		loading: true,
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}

export function queryCurrentShopInfo(params) {
    const url = "/shop/shopInfo";
    return axios({
        method: 'post',
        url,
        data: params,
        loading: true,
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch(res => {
        return Promise.reject(res.data)
    });
}
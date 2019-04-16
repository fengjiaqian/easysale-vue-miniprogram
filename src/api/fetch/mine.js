import axios from 'axios'

//我的模块-用户店铺信息
function queryShopInfo(params) {
	const url = "/dealer/findDealerInfo"
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

//我的模块-修改店铺信息
function editShopInfo(params) {
	const url = "/dealer/updateDealer"
	return axios({
		method: 'post',
		url: url,
		data: params
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}

//我的模块-数据统计查询
function queryStatisticalData(params) {
	const url = "/performance/getPerformance"
	return axios({
		method: 'post',
		url: url,
		data: params
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}

//我的模块-数据统计-商品维度报表
function queryProductPerformance(params) {
    const url = "/performance/getProductPerformance"
    return axios({
        method: 'post',
        url: url,
        data: params
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch(res => {
        return Promise.reject(res.data)
    });
}

//我的模块-数据统计-客户维度报表
function queryCustomerPerformance(params) {
    const url = "/performance/getCustomerPerformance"
    return axios({
        method: 'post',
        url: url,
        data: params
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch(res => {
        return Promise.reject(res.data)
    });
}


//我的模块-商品管理-商品列表查询
function queryProductList(params) {
	const url = "/product/productList"
	return axios({
		method: 'post',
		url: url,
		data: params
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}

//我的模块-商品管理-商品品牌查询
function queryProductBrand(params) {
	const url = "/product/productBrandList"
	return axios({
		method: 'post',
		url: url,
		data: params
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}

//我的模块-商品管理-商品批量上下架删除接口
function oprateManageProduct(params) {
	const url = "/product/updateProductState"
	return axios({
		method: 'post',
		url: url,
		data: params
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}

//我的模块-商品管理-商品详情接口
function productDetail(params) {
	const url = "/product/productDetail"
	return axios({
		method: 'post',
		url: url,
		data: params
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}

//我的模块-商品管理-商品新增接口
function addProduct(params) {
	const url = "/product/saveProductList"
	return axios({
		method: 'post',
		url: url,
		data: params
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}

//我的模块-商品管理-商品修改接口
function editProduct(params) {
	const url = "/product/updateProduct"
	return axios({
		method: 'post',
		url: url,
		data: params
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}

//我的模块-商品管理-查寻交易的产品
function queryJyProduct(params) {
	const url = "/product/dealerProductList"
	return axios({
		method: 'post',
		url: url,
		data: params
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}

export {
	queryShopInfo, editShopInfo, queryStatisticalData, queryProductPerformance, queryCustomerPerformance,
    queryProductList, queryProductBrand, oprateManageProduct,
    addProduct, productDetail, editProduct, queryJyProduct
}

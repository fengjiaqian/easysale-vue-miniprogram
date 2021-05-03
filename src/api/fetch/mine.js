import axios from 'axios'


// 导出Excel报表发送邮件
function sendReportFormEmail(params) {

	return axios({
		method: 'post',
		url: "excel/email",
		data: params,
		loading: true,
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}

// 查看店主认证详情
function listShopCertificationFile() {

	return axios({
		method: 'post',
		url: "/dealer/listShopCertificationFile",
		data: {},
		loading: true,
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}


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
		data: params,
		loading: true
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
		data: params,
		loading: true
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
		data: params,
		loading: true
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}


//我的模块-商品管理-商品列表查询
function queryProductList(params) {
	const url = "/product/selectDealerProduct"
	return axios({
		method: 'post',
		url: url,
		data: params,
		loading: true
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}

//我的模块-商品管理-商品品牌查询
function queryProductBrand(params) {
	const url = "/product/selectBrandList"
	return axios({
		method: 'post',
		url: url,
		data: params,
		loading: true
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
		data: params,
		loading: true,
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
		data: params,
		loading: true
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}

//我的模块-员工管理-查寻员工列表
function queryStaffList(params) {
	const url = "/dealer/findDealerListByParentId"
	return axios({
		method: 'post',
		url: url,
		data: params,
		loading: true
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}

//我的模块-员工管理-查看经销商或员工信息
function queryStaffDetail(params) {
	const url = "/dealer/findSalespersonInfo"
	return axios({
		method: 'post',
		url: url,
		data: params,
		loading: true
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}

//我的模块-员工管理-删除员工
function deleteStaff(params) {
	const url = "/dealer/deleteDealer"
	return axios({
		method: 'post',
		url: url,
		data: params,
		loading: true
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}

//我的模块-员工管理-新增员工
function addStaff(params) {
	const url = "/dealer/addSalesperson"
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

//我的模块-员工管理-编辑员工
function editStaff(params) {
	const url = "/dealer/updateSalesperson"
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

//我的模块-员工管理-审核员工
function auditStaff(params) {
	const url = "/dealer/auditEmployee"
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

//我的模块-角色-查询所有角色
function queryRole(params) {
	const url = "/role/selectStaffRoleList"
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

//我的模块-客户管理-查寻客户列表
function queryCustomerList(params) {
	const url = "/customer/findCustomerList"
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

//我的模块-客户管理-查寻客户详情
function queryCustomerDetail(params) {
	const url = "/customer/findCustomerInfo"
	return axios({
		method: 'post',
		url: url,
		data: params,
		loading: true
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}

//我的模块-客户管理-新增客户
function addCustomer(params) {
	const url = "/customer/addCustomer"
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

//我的模块-客户管理-新增客户
function editCustomer(params) {
	const url = "/customer/updateCustomer"
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

//文件上传-图片上传
function uploadImg(params) {
	const url = "/file/uploadImg"
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

// 分享店铺图片合成
function synthesisroutineimg(params) {
	const url = "/file/synthesisroutineimg"
	return axios({
		method: 'post',
		url: url,
		data: params,
		loading:true
	}).then((res) => {
		return Promise.resolve(res.data)
	}).catch(res => {
		return Promise.reject(res.data)
	});
}
export {
	listShopCertificationFile, queryShopInfo, editShopInfo, queryStatisticalData, queryProductPerformance, queryCustomerPerformance,
	queryProductList, queryProductBrand, oprateManageProduct,
	addProduct, productDetail, editProduct, queryJyProduct,
	queryStaffList, queryStaffDetail, deleteStaff, addStaff, editStaff, queryRole, auditStaff,
	queryCustomerList, queryCustomerDetail, addCustomer, editCustomer,
	uploadImg, synthesisroutineimg,sendReportFormEmail
}

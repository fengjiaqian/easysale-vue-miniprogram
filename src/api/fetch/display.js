import axios from 'axios'

//陈列管理-陈列活动列表
function queryDisplayProduct(params) {
	const url = "/product/afterProductList"
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



export {
	queryDisplayProduct
}

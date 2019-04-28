import axios from 'axios'

/**
 * 退货列表查询接口
 */
export function returnList(params) {
    let url = "/return/returnList";
    return axios({
        method: 'post',
        url,
        data:params,
        loading: true,
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch(res => {
        return Promise.reject(res.data)
    });
}
/**
 * 退货详情查询接口
 */
export function returnDetail(id) {
    let url = "/return/returnDetail";
    return axios({
        method: 'post',
        url,
        data: {
            id
        },
        loading: true,
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch(res => {
        return Promise.reject(res.data)
    });
}

/**
 * 移交或者处理单条单据
 * @returns {Promise<AxiosResponse<any> | never>}
 */
export function updateReturnById(params = {}) {
    let url = "/return/updateReturnById";
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

/**
 * 批量移交
 */
export function batchUpdateReturn(params) {
    let url = "/return/batchUpdateReturn";
    return axios({
        method: 'post',
        url,
        data:params,
        loading: true,
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch(res => {
        return Promise.reject(res.data)
    });
}

/**
 * 客户退货新增接口
 */
export function saveCustomerReturn(params) {
    let url = "/return/saveCustomerReturn";
    return axios({
        method: 'post',
        url,
        data:params,
        loading: true,
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch(res => {
        return Promise.reject(res.data)
    });
}

/**
 * 客户退货取消接口
 */
export function cancelCustomerReturn(id) {
    let url = "/return/cancelCustomerReturn";
    return axios({
        method: 'post',
        url,
        data:{id},
        loading: true,
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch(res => {
        return Promise.reject(res.data)
    });
}
/**
 * 客户可退货产品选择接口
 */
export function returnProduct(id) {
    let url = "/return/returnProduct";
    return axios({
        method: 'post',
        url,
        data:{id},
        loading: true,
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch(res => {
        return Promise.reject(res.data)
    });
}
/**
 * 客户退货的经销商列表
 */
export function selectDealReturn(state) {
    let url = "/return/selectDealReturn";
    return axios({
        method: 'post',
        url,
        data:{state},
        loading: true,
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch(res => {
        return Promise.reject(res.data)
    });
}

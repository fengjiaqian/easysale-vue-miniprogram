import axios from 'axios'

/**
 * 投诉列表查询接口
 */
export function complaintList(state) {
    let url = "/complaint/complaintList";
    return axios({
        method: 'post',
        url,
        data: {
            state
        },
        loading: true,
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch(res => {
        return Promise.reject(res.data)
    });
}

/**
 * 投诉详情查询接口
 */
export function complainDetail(id) {
    let url = "/complaint/complainDetail";
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
export function updateCustomerById(params = {}) {
    let url = "/complaint/updateCustomerById";
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
export function batchUpdateComplaint(params) {
    let url = "/complaint/batchUpdateComplaint";
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
 * 客户投诉过的经销商列表
 */
export  function selectDealComplaint(state) {
    let url = "/complaint/selectDealComplaint";
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
/**
 * 客户投诉新增接口
 */
export  function saveComplain(params) {
    let url = "/customer/saveComplaint";
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
 * 客户投诉取消接口
 */
export  function cancelComplaint(id) {
    let url = "/customer/cancelComplaint";
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



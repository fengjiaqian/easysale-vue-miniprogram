import axios from 'axios'

/**
 * 兑奖列表查询接口
 */
export function awardList(params) {
    let url = "/award/awardList";
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
 * 兑奖详情查询接口
 */
export function awardDetail(id) {
    let url = "/award/awardDetail";
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
export function updateAwardById(params = {}) {
    let url = "/award/updateAwardById";
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
export function batchUpdateAward(params) {
    let url = "/award/batchUpdateAward";
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
 * 客户兑奖新增接口
 */
export function saveAward(params) {
    let url = "/award/saveAward";
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
 * 客户兑奖取消接口
 */
export function cancelAward(id) {
    let url = "/award/cancelAward";
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
 * 客户兑奖的经销商列表
 */
export function selectDealAward(state) {
    let url = "/award/selectDealAward";
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

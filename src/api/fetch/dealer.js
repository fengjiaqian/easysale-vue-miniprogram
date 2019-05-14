import axios from 'axios'
/**
 *  查询经销商所拥有的客户列表（经销商或销售人员登录）
 * @param {*} keyword  string   手机号或姓名查询
 */
export function findCustomerList(keyword = "") {

    const url = "/customer/findCustomerList"
    return axios({
        method: 'post',
        url: url,
        data: {
            keyword
        },
        loading: true,
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch(res => {
        return Promise.reject(res.data)
    });
}

/**
 * 客户或者经销商fetch店铺log    
 */
export function ListDealerLogs() {
    let url = "/dealer/findShopLogoListByShopId";
    return axios({
        method: 'post',
        url,
        data: {
            fileType: 1,
        },
        loading: true,
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch(res => {
        return Promise.reject(res.data)
    });
}

/**
 * 客户选择店铺
 */
export function addShopHistory(dealerId) {
    let url = "/shop/addShopHistory";
    return axios({
        method: 'post',
        url,
        data: {
            shopId: dealerId,
        }
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch(res => {
        return Promise.reject(res.data)
    });
}

/***
 * 切换店铺
 * id 店铺id 
 */
export function changeShop(id) {
    return axios({
        method: 'post',
        url: '/shop/changeShop',
        data: {
            id
        },
        loading: true
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch(res => {
        return Promise.reject(res.data)
    });
}

/***
 * 认证店主 
 */
export function shopkeeperCertification(logoIamgeUrls) {
    return axios({
        method: 'post',
        url: '/dealer/shopkeeperCertification',
        data: {
            logoIamgeUrls
        },
        loading: true
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch(res => {
        return Promise.reject(res.data)
    });
}

/**保存本公司客户**/
export function saveAsOurCompanyCustomer(params) {
    return axios({
        method: 'post',
        url: '/customer/saveAsOurCompanyCustomer',
        data: params,
        loading: true
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch(res => {
        return Promise.reject(res.data)
    });
}

/**保存为本公司员工**/
export function applyToOurCompanyEmployee(params) {
    return axios({
        method: 'post',
        url: '/dealer/applyToOurCompanyEmployee',
        data: params,
        loading: true
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch(res => {
        return Promise.reject(res.data)
    });
}

/**
 * 店主审核员工接口 
 * @param {*} params  Object {dealerId, type}  dealerId 员工id;   type 1：同意 2：拒绝
 */
export function auditEmployee(params) {
    return axios({
        method: 'post',
        url: '/dealer/auditEmployee',
        data: params,
        loading: true
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch(res => {
        return Promise.reject(res.data)
    });
}
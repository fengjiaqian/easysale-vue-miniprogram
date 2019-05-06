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
            id,
        }
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch(res => {
        return Promise.reject(res.data)
    });
}
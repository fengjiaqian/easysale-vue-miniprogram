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
 * @param {*}  userId  经销商userId
 */
export function ListDealerLogs(userId = "") {

    let url = "/dealer/findShopLogoListByDealer";
    userId && (url = "/dealer/findShopLogoListByCustomer")
    return axios({
        method: 'post',
        url,
        data: {
            fileType: 1,
            userId
        },
        loading: true,
    }).then((res) => {
        return Promise.resolve(res.data)
    }).catch(res => {
        return Promise.reject(res.data)
    });
}
import axios from 'axios'

//订单列表
export function QueryOrders(params = {}) {

    var paramsData = Object.assign({
        pageNum: 1,
        pageSize: 10
    }, params);
    const url = "/order/getOrderList";
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

//提交订单
export function OrderSubmit(params = {}) {
    const url = "/order/saveOrder";
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
 * 订单或订单明细更新
 * @param {*} params object {id ,orderState,orderAmount ,customerId ,dealerId}
 */
export function UpdateOrder(params = {}) {

    const url = "/order/updateOrder";
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
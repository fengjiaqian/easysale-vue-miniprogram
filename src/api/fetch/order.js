import axios from 'axios'

//订单列表
export function QueryOrders(params = {}) {
    params.pageNum = params.pageNum || 1;
    params.pageSize = params.pageSize || 20;
    const url = "/order/getOrderList";
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
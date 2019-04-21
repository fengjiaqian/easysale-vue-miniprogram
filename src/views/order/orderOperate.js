/**
 * 
 * @param {*} list  初始订单列表
 */
import storage from 'common/storage'
import { UpdateOrder, QueryOrders } from "api/fetch/order";

export function transformOrderList(list) {

    for (let order of list) {
        order.totalQuantity = order.orderItem.reduce(
            (acc, cur) => acc + cur.quantity,
            0
        );
        for (let item of order.orderItem) {
            item.product.buyCount = item.quantity;
        }
        if (order.orderState == 1 && storage.get('userType', '3') != 3) {
            order.canRefuse = true;
            order.canAgree = true;
        }
        if (order.orderState == 1 && storage.get('userType', '3') == 3) {
            order.canCancel = true;
        }
    }
    return list;
}
/**
 *  订单操作
 *  @param {*} options  object {state,orderId}   
 */
export function orderOperate(options, cb) {
    const tipObj = {
        '2': '订单审核同意',
        '3': '订单审核拒绝',
        '5': '取消订单成功'
    }
    const tip = tipObj[options.state] || '';
    const params = {
        id: options.orderId,
        orderState: options.state
    };
    UpdateOrder(params)
        .then(() => {
            tip && this.$toast(tip);
            cb && cb();
        })
        .catch(err => {
            this.$toast(err.message);
        });
}
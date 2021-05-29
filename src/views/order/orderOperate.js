import storage from 'common/storage'
import { UpdateOrder } from "api/fetch/order";

export function transformOrderList(list) {
    //
    // const userType = storage.get('userType', '3');
    // const originUserType = storage.get('originUserType', '3');
    // const userInSwitching = originUserType != 3 && userType != originUserType;
    for (let order of list) {
        order.totalQuantity = order.orderItem.reduce(
            (acc, cur) => acc + cur.quantity,
            0
        );
        for (let item of order.orderItem) {
            item.product.buyCount = item.quantity;
            item.product.price = item.salePrice;
            item.product.remark = item.remark;
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
 * 从订单详情中得到products
 * @param {*} order
 */
export function pullProductsFromOrder(order) {
    return order.orderItem.map(item => {
        item.product.buyCount = item.quantity;
        item.product.price = item.salePrice;
        item.product.remark = item.remark;
        return item.product
    })
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
        orderState: options.state,
        auditRemark: options.audit_remark
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

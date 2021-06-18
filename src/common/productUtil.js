import { getAllGoods } from "common/goodsStorage";
//商品列表初始化
export function transformProductList(list) {

    const storageGoods = getAllGoods();

    for (let product of list) {
        product.minBuyNum = 0;
        product.maxBuyNum = 9999;
        //buyCount
        if (storageGoods && storageGoods.length) {
            const itemInStore = storageGoods.find(item => item.id === product.id)
            product.buyCount = itemInStore ? itemInStore.buyCount : 0;
        } else {
            product.buyCount = 0;
        }
    }
    return list;
}

//订单预查询商品处理
export function transformOrderItems(list) {
    return list.map(product => {
        const { id, buyCount, price } = product;
        return { productId: id, quantity: buyCount, salePrice: price , product:product}
    })
}

/**
 * 首页激活时，改变数量 
 * @param {*} productList 
 */
export function RefreshProductsInActivated(productList) {
    const storageGoods = getAllGoods();
    if (!storageGoods.length) {
        //
        this.productList.forEach(item => {
            item.buyCount = 0;
        })
        return false;
    }
    for (let [index, product] of productList.entries()) {
        const itemInStore = storageGoods.find(
            item =>
                item.id === product.id
        );
        if (itemInStore) {
            this.productList.splice(index, 1, itemInStore)
        }
    }
}


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
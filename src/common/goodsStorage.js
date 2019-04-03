/*
 * 处理缓存商品 
 */
import storage from 'common/storage'

function getAllGoods() {
    const userId = localStorage.getItem('userId') || ''
    let param = userId + 'groupGoods'
    return storage.get(param, [])
}

function setAllGoods(goods) {
    if (!goods && !goods.length) {
        return false;
    }
    const userId = localStorage.getItem('userId') || ''
    let param = userId + 'groupGoods'
    storage.set(param, goods)
}

function getGoodsCount() {
    const goods = getAllGoods();
    let count = 0;
    for (let product of goods) {
        count += product.buyCount
    }
    return count;
}

//push and update goods 
// @params { isAdd } 是否新增购物车
function updateItem(sku, number, isAdd = false) {

    let goods = getAllGoods();
    if (!goods || !goods.length) {
        sku.buyCount = number;
        goods = new Array(sku);
    } else {
        const idx = goods.findIndex((item) => {
            return item.productSkuId === sku.productSkuId &&
                item.productSaleSpecId === sku.productSaleSpecId
        })
        if (idx != -1) {
            isAdd ? goods[idx].buyCount += number :
                goods[idx].buyCount = number
        } else {
            goods.push(sku)
        }
    }
    goods = goods.filter(item => !!item.buyCount)
    setAllGoods(goods);
}

//remove goods
function removeItem(sku) {

    let goods = getAllGoods();
    if (!goods || !goods.length) {
        return false;
    }
    const idx = goods.findIndex((item) => {
        return item.productSkuId === sku.productSkuId &&
            item.productSaleSpecId === sku.productSaleSpecId
    })
    if (idx === -1) {
        return false;
    }
    goods.splice(idx, 1)
    setAllGoods(goods)
}

//批量移除商品
function batchRemoveItem(skus) {
    let goods = getAllGoods();
    if (!goods || !goods.length) {
        return false;
    }
    skus.forEach((item) => {
        goods.forEach((product, i) => {
            if (item.productSkuId == product.productSkuId && item.productSaleSpecId == product.productSaleSpecId) {
                goods.splice(i, 1)
                return
            }
        })
    })
    setAllGoods(goods)
}

//clear goods
function clearGoods() {
    const userId = localStorage.getItem('userId') || ''
    let param = userId + 'groupGoods'
    storage.remove(param)
}
export {
    getAllGoods,
    setAllGoods,
    updateItem,
    removeItem,
    batchRemoveItem,
    clearGoods,
    getGoodsCount
}

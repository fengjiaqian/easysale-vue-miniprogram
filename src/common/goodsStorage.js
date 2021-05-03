/*
 * 处理缓存商品 
 */
import storage from 'common/storage'
//TODO 如果用户没有登录 没有手机 登录后带入之前选择的商品 

const _storageKey = 'yjxGoods'

function getAllGoods() {
    const _userId = storage.get('currentDealerId', '') + storage.get('mobileNo', '');
    return storage.get(_userId + _storageKey, [])
}

function setAllGoods(goods) {
    const _userId = storage.get('currentDealerId', '') + storage.get('mobileNo', '');
    if (!goods && !goods.length) {
        return false;
    }
    storage.set(_userId + _storageKey, goods)
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
        const idx = goods.findIndex(item => item.id === sku.id);
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
    const idx = goods.findIndex(item => item.id === sku.id);
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
            if (item.id == product.id) {
                goods.splice(i, 1)
                return
            }
        })
    })
    setAllGoods(goods)
}

//clear goods
function clearGoods() {
    const _userId = storage.get('currentDealerId', '') + storage.get('mobileNo', '');
    storage.remove(_userId + _storageKey)
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

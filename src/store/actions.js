

import * as types from './mutation-types'
import { getGoodsCount } from "common/goodsStorage";
//SET_CART_COUNT
/**
 * params { count } Number 加或者减的数量 如果有传参 就手动计算并commit  
 */
export const saveCartCount = ({ commit, state }, count) => {

  commit(types.SET_CART_COUNT, getGoodsCount());
}




import * as types from './mutation-types'
import { getGoodsCount } from "common/goodsStorage";
import storage from 'common/storage'
import { refreshTabPages } from "common/authStorage";
//SET_CART_COUNT
export const saveCartCount = ({ commit }) => {

  commit(types.SET_CART_COUNT, getGoodsCount());
}

//SET_USER_TYPES
export const setUserType = ({ commit }, type) => {

  if (typeof type === 'object') {
    
    const t = type.type || 3;
    storage.set("userType", t);
    type.refresh && refreshTabPages();
    commit(types.SET_USER_TYPE, t);
  } else {
    storage.set("userType", type);
    refreshTabPages();
    commit(types.SET_USER_TYPE, type);
  }

}




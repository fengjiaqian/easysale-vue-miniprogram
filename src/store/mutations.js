import * as types from './mutation-types'

const mutations = {

    [types.SET_CART_COUNT](state, cartCount) {
        state.cartCount = cartCount
    },
    [types.SET_USER_TYPE](state, userType) {
        state.userType = userType;
    },
}

export default mutations


import storage from 'common/storage'
export const cartCount = state => {
    if (state.cartCount > 99) {
        return '99+'
    }
    return state.cartCount
}

export const userType = state => {
    return state.userType;
}

//用户切换状态
export const userInSwitching = state => {
    const originUserType = storage.get('originUserType', "")
    return state.userType != originUserType
}

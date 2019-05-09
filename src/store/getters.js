
import storage from 'common/storage'
export const cartCount = state => {
    if (state.cartCount > 99) {
        return '99+'
    }
    return state.cartCount
}

export const userType = state => state.userType;

//用户切换状态()
export const userInSwitching = state => {
    console.log('getter changed')
    const originUserType = storage.get('originUserType', 3)
    return state.userType == 3 && state.userType != originUserType
}

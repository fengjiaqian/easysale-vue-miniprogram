
export const cartCount = state => {
    if (state.cartCount > 99) {
        return '99+'
    }
    return state.cartCount
}

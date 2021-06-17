
function evokeWxorderpay(data) {
    let passData = decodeURIComponent(JSON.stringify(data))
    let path = `/pages/orderpay/orderpay?passData=${passData}`
    window.wx.miniProgram.redirectTo({
        url: path,
    })
}

export {
    evokeWxorderpay
}
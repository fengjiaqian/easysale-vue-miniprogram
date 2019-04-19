
function evokeWxLocation(data) {
    let passData = decodeURIComponent(JSON.stringify(data))
    let path = `/pages/location/location?passData=${passData}`
    window.wx.miniProgram.redirectTo({
        url: path,
    })
}

export {
    evokeWxLocation
}

function evokeWxLocation(data) {
    let passData = decodeURIComponent(JSON.stringify(data))
    let path = `/pages/location/location?passData=${passData}`
    window.wx.miniProgram.navigateTo({
        url: path,
    })
}

export {
    evokeWxLocation
}
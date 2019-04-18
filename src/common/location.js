
function evokeWxLocation() {
    let path = `/pages/location`
    window.wx.miniProgram.navigateTo({
        url: path,
    })
}

export {
    evokeWxLocation
}
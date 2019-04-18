import storage from "common/storage";
const mixin = {
    data() {
        return {
            userType: storage.get("userType", 3), //用户类型(1:经销商 2：销售人员  3：终端客户)
            isVisitor: !storage.get("token", ''),
        }
    },
    methods: {
        navigateToLogin() {
            if (this.isVisitor) {
                if (window.__wxjs_environment === "miniprogram") {
                    wx.miniProgram.navigateTo({
                        url: `/pages/mobile/mobile`
                    });
                    return true;
                }
                return true;
            }
            return false;
        }
    }
}
export default mixin

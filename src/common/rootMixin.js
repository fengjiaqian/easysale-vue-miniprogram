import storage from "common/storage";
import mHeader from "components/header.vue";
import { mapGetters } from "vuex"
const mixin = {
    data() {
        const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
        //上传图片地址
        let uploadUrl = "file/uploadProductImg"
        if (IS_PROD) {
            uploadUrl = "/easysaleapi/file/uploadProductImg"
        }
        return {
            isVisitor: !storage.get("token", ''),
            uploadImgUrl: uploadUrl
        }
    },
    computed: {
        ...mapGetters(["userType"]) //用户类型(1:经销商 2：销售人员  3：终端客户)
    },
    components: {
        mHeader
    },
    methods: {
        //auth权限控制
        navigateToLogin() {
            if (this.isVisitor) {
                if (window.__wxjs_environment === "miniprogram") {
                   // storage.set('homeRefresh', true);
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

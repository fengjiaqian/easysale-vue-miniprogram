import {
    saveAsOurCompanyCustomer,
    applyToOurCompanyEmployee,
    shopkeeperCertification
} from "api/fetch/dealer";
import { applyDealer } from "api/fetch/endCustomer";
import storage from "common/storage";

// 0:客户；1:员工；2:店主；3:开店申请；
//paramsData: shopId, name,phone,  address,customerShopName
const identityCustomer = function (formData) {

    //请求params  && 参数检验
    let paramsData = Object.assign({}, formData);
    paramsData.customerShopName = paramsData.shopName;
    saveAsOurCompanyCustomer(paramsData).then(res => {
        this.$toast('认证成功')
        this.$router.push({ path: "/navi/home" });
    }).catch(err => {
        this.$toast(err.message);
    })
}

//paramsData: shopId, name, phone, address
const identityEmployee = function (formData) {

    let paramsData = Object.assign({}, formData);
    applyToOurCompanyEmployee(paramsData).then(res => {
        this.$alert('您的申请已提交，请耐心等待店主审核').then(res => {
            this.$router.push({ path: "/navi/home" });
        });
    }).catch(err => {
        this.$toast(err.message);
    })
}

//paramsData: fieldList
const identityBoss = function (formData) {

    const logoIamgeUrls = formData.fileLicenses;
    shopkeeperCertification(logoIamgeUrls).then(res => {
        this.$alert('您的申请已提交，请耐心等待审核').then(res => {
            this.$router.push({ path: "/navi/home" });
        });
    }).catch(err => {
        this.$toast(err.message);
    })
}

//paramsData: shopId, name,phone,address, shopName, logoIamgeUrls
const applyStore = function (formData) {

    let paramsData = Object.assign({}, formData);
    formData.logoIamgeUrls = formData.fieldList;
    applyDealer(paramsData).then(res => {
        this.$toast("恭喜，您已开通线上公司");
        const { mobileNo, token, userType, shopId = "" } = res.data;
        storage.set("mobileNo", mobileNo);
        storage.set("token", token);
        storage.set("originUserType", userType);
        this.setUserType(userType);
        shopId && storage.set("currentDealerId", shopId);
        storage.remove("currentDealer");
        this.$router.push({ path: "/navi/home" });
    }).catch(err => {
        this.$toast(err.message);
    })
}
const identityStrategies = {
    '0': identityCustomer,
    '1': identityEmployee,
    '2': identityBoss,
    '3': applyStore,
};
const identityFn = function (type, formData) {
    return identityStrategies[type].call(this, formData);
}
export default identityFn;
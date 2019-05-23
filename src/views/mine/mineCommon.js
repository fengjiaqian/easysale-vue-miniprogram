import storage from 'common/storage'
const dealerAccessModule = [
    {
        title: "商品管理",
        class: "product_manage",
        path: "/my/productList"
    },
    {
        title: "数据统计",
        class: "data_static",
        path: "/my/statistical"
    },
    {
        title: "客户管理",
        class: "customer",
        path: "/my/customerList"
    },
    {
        title: "员工管理",
        class: "staff",
        path: "/my/staffList"
    },
    {
        title: "申请开通线上平台",
        class: "customer",
        path: "/writeApplicationInformation"
    },
    {
        title: "认证店主",
        class: "manager",
        path: "/my/shopkeeper"
    },
]
const customerAccessModule = [
    {
        title: "收货人管理",
        class: "staff",
        path: "/myConsignee"
    },
    {
        title: "申请开通线上平台",
        class: "customer",
        path: "/writeApplicationInformation"
    }
]

const companyInfo = {
    title: "公司信息",
    class: "company",
    path: "/my/userInfo"
}

export function initAccessModule(userType, auditState = '') {
    const originUserType = storage.get('originUserType', '')
    if (userType == 3) {
        if (userType == originUserType) {
            //员工或店主审核中      员工认证状态（0：认证中 1：已认证 2：未认证）
            const userState = storage.get("userState", 1);
            if (!Number(userState)) {
                return customerAccessModule.slice(0, 1);
            }
            return customerAccessModule;
        }
        return customerAccessModule.slice(0, 1);
    }
    if (auditState == 1) {   //已经认证了
        let dealerModule = dealerAccessModule.slice(0, 5);
        return [...dealerModule, companyInfo];
    }
    return [...dealerAccessModule, companyInfo];
}
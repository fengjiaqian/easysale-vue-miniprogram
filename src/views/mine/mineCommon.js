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
        title: "申请开店",
        class: "customer",
        path: "/writeApplicationInformation"
    }
]

export function initAccessModule(userType) {
    const originUserType = storage.get('originUserType', '')
    if (userType == 3) {
        if (userType == originUserType) {
            return customerAccessModule;
        }
        return customerAccessModule.slice(0, 1);
    }
    return dealerAccessModule;
}
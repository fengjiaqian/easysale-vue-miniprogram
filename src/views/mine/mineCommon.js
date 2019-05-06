
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
        class: "staff",
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
        title: "申请经销商",
        class: "customer",
        path: "/writeApplicationInformation"
    }
]


export function initAccessModule(userType) {

    switch (userType) {
        case '1':
            return dealerAccessModule;
            break;
        case '2':
            return dealerAccessModule;
            break;
        case '3':
            return customerAccessModule;
            break;
        default:
            return customerAccessModule;
            break;
    }
}
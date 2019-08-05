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
        title: "开通其它线上平台",
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
        title: "开通公司线上平台",
        class: "customer",
        path: "/writeApplicationInformation"
    }
]

const companyInfo = {
    title: "公司信息",
    class: "company",
    path: "/my/userInfo"
}

export function initAccessModule(userType,auditState = '') {
    let permissionState = storage.get('permissionState', 0);
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
    /*   let sm =  {
           title: "扫描打印订单",
           class: "customer",
           path: "/orderprintingclick"
       }*/
    //已经认证了
    if (auditState == 1) {

        // 并且是员工的时候  需要验证下 员工级别 显示不同的菜单
        if(userType == 2){
            if(permissionState == 1){
                let dealerModule = dealerAccessModule.slice(0, 5);
                return [...dealerModule, companyInfo];
            }
            let dealerModule = dealerAccessModule.slice(0, 3);
            let wdealerModule_ = dealerAccessModule.slice(4, 5);
            dealerModule.push(wdealerModule_[0]);
            return [...dealerModule, companyInfo];
        }
        let dealerModule = dealerAccessModule.slice(0, 5);
        return [...dealerModule, companyInfo];

    }
    //未认证
    if(auditState == 2){
        //但是可能会存在  当前人员的员工级别是管理员  因为申请开店的人默认 设置成管理员
        if(permissionState == 1){
            // let dealerModule = dealerAccessModule.slice(0, 5);
            return [...dealerAccessModule, companyInfo];
        }
        //其它的 不显示员工菜单
        let dealerModule = dealerAccessModule.slice(0, 3);
        let wdealerModule_ = dealerAccessModule.slice(4, 6);
        dealerModule.push(wdealerModule_[0]);
        dealerModule.push(wdealerModule_[1]);
        return [...dealerModule, companyInfo];
    }
    return [...dealerAccessModule, companyInfo];
}
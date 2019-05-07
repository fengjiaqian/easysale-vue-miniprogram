
import storage from 'common/storage'
import { getGoodsCount } from "common/goodsStorage";
const state = {
    cartCount: getGoodsCount(),
    userType: storage.get("userType", 3),  //用户类型(1:经销商 2：销售人员  3：终端客户) 
}
export default state

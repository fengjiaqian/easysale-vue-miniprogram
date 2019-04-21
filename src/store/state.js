
import storage from 'common/storage'
import { getGoodsCount } from "common/goodsStorage";
const state = {
    cartCount: getGoodsCount(),
}
export default state

<template>
  <div id="orders">
    <div
      class="print_order_list"
      v-if="!empty&&(userType==1||userType==2)&&!showPrintBox"
      @click="_toPrintPage"
    >打印</div>
    <empty v-if="empty&&!showPrintBox" txt="暂无此类订单" :iconUrl="avatarUrl"></empty>
    <ui-table :orderTab="orderTab" :initialState="currentState " @swithTab="_switchOrderType"></ui-table>
    <!--  -->
    <div class="empty-page" v-if="isVisitor">
      <p class="fz30 c-3">您当前没有订单</p>
      <a class="default-btn" href="javascript:;" @click="navigateToLogin">立即登录</a>
    </div>
    <!--  -->
    <scroll
      v-if="orderList.length"
      class="O-list"
      :data="orderList"
      :probeType="3"
      :pullup="true"
      @scrollToEnd="loadMoreOrders"
      ref="scrollOrders"
    >
      <div>
        <order-item v-for="item in orderList" :order="item" @operate="operateItem" :key="item.id"></order-item>
      </div>
    </scroll>

    <div class="authorityPrint" v-show="showPrintBox">
      <div class="authorityPrint_title">授权小程序登录PC端订单打印</div>
      <!-- <div class="authorityPrint_btn" @click="closePrintBox">取消授权</div> -->
      <div class="authorityPrint_btn" @click="authorityPrint">确认授权</div>
      <!-- <div></div> -->
    </div>
    <div class="pr_mask" v-show="showPrintBox" @click="closePrintBox" @touchmove.prevent></div>
  </div>
</template>

<script>
/**
 *订单状态 1=待处理，2=已处理，3=已拒绝，4=已完成 5=已取消
 查列表的时候1=待处理，2=已处理+已拒绝，5=已取消
 */
const orderTab = [
  { text: "待处理", state: 1 },
  { text: "已处理", state: 2 },
  { text: "已取消", state: 5 }
];
const params = {
  orderState: 1,
  pageNum: 1,
  pageSize: 6
};
import avatarUrl from "@/assets/images/icon-product-empty.png";
import orderItem from "components/order-item.vue";
import uiTable from "components/ui-table.vue";
import storage from "common/storage";
import { getAllGoods } from "common/goodsStorage";
import empty from "components/empty.vue";
import scroll from "components/scroll.vue";
import * as orderApi from "api/fetch/order";
import { transformOrderList, orderOperate } from "./order/orderOperate";
export default {
  name: "orders",
  data() {
    return {
      orderTab: orderTab,
      currentState: 1,
      orderList: [],
      empty: false,
      avatarUrl,
      showPrintBox: false,
      uuid: -1
    };
  },
  components: {
    uiTable,
    orderItem,
    scroll,
    empty
  },
  computed: {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // vm.px=to.query.passData
      let passData = to.query.passData ? to.query.passData : null;
      //console.log(passData)
      if (passData) {
        passData = JSON.parse(passData);
        if (passData.orderprintingData.uuid) {
          vm.uuid = passData.orderprintingData.uuid;
          // alert(passData.orderprintingData.uuid)
          // vm.px=passData.orderprintingData.uuid
          vm.showPrintBox = true;
          //TODO 弹出是否授权小程序登录PC端订单打印页面  如果用户点击同意授权，则需要调用后台 提供的接口传递 uuid以及shopId验证授权登录
          // passData.orderprintingData.uuid   当这个没有值的时候   判断一下 passData.orderprintingData.code    = "-1" 扫描失败   = "-2" 非法二维码
        } else {
          // if(passData.orderprintingData.code){
          //   var passDataCode=passData.orderprintingData.code
          // }
          vm.$toast("扫描失败或是非法二维码");
        }
      }
    });
  },
  created() {
    this.params = params;
    const state = this.$route.query.state || "";
    if (state) {
      this.currentState = state;
      this.params.orderState = state;
    }
    if (!this.isVisitor) {
      this._QueryOrders();
    }
  },
  activated() {
    const state = this.$route.query.state || "";
    if (state) {
      this.currentState = state;
      this.params.orderState = state;
    }
    const refresh = storage.get("orderRefresh", false);
    refresh && this._QueryOrders(true);
    storage.set("orderRefresh", false);
  },
  methods: {
    _QueryOrders(reset) {
      if (this.loading) return false;
      if (reset) {
        this.params.pageNum = 1;
      }
      this.loading = true;
      orderApi
        .QueryOrders(this.params)
        .then(res => {
          if (res.result === "success" && res.data) {
            const { dataList = [], pager } = res.data;
            const { currentPage, totalPage } = pager;
            if (currentPage === 1) {
              this.orderList = transformOrderList(dataList);
              this.totalPage = totalPage;
              this.empty = !this.orderList.length;
            } else {
              this.orderList = this.orderList.concat(
                transformOrderList(dataList)
              );
            }
            this.params.pageNum++;
            this.loading = false;
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    loadMoreOrders() {
      if (this.loading || this.params.pageNum > this.totalPage) return false;
      this._QueryOrders();
    },
    _switchOrderType(state) {
      this.$refs.scrollOrders && this.$refs.scrollOrders.scrollTo(0, 0);
      this.currentState = state;
      this.params.orderState = state;
      if (this.isVisitor) return false;
      this._QueryOrders(true);
    },
    //订单操作
    operateItem(options) {
      orderOperate.call(this, options, this._QueryOrders.bind(this, true));
    },

    _toPrintPage() {

      // this.$alert('恭喜，您已开通线上公司').then(res => {
      //       this.$router.push({ path: "/navi/home" });
      //   });

      // var str="";
      // if(this.isIOS){
      //   str="请在PC端访问jxs.release.yijiupidev.com获取二维码"
      // }else{
      //   str="点击确认后扫描二维码打印订单"
      // }
      // 点击确认后扫描二维码打印订单
      this.$confirm("请在电脑端访问jxs.release.yijiupidev.com获取二维码")
        .then(() => {
          let recordData = {
            path: this.$route.path
          };
          let passData = decodeURIComponent(JSON.stringify(recordData));
          let path = `/pages/orderprinting/orderprinting?passData=${passData}`;
          window.wx.miniProgram.redirectTo({
            url: path
          });
        })
        .catch(() => {});
    },
    closePrintBox() {
      this.showPrintBox = false;
    },

    authorityPrint(data) {
      const currentDealerId = storage.get("currentDealerId", "");
      if (this.loading) return false;

      this.loading = true;
      const obj = {
        uuid: this.uuid,
        shopId: currentDealerId,
        reqStatus: 2
      };
      orderApi
        .Authvali(obj)
        .then(res => {
          if (res.result === "success" && res.data) {
            this.$toast("成功");
            this.showPrintBox = false;
            this.loading = false;
          }
        })
        .catch(err => {
          this.$toast(err);
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="stylus">
.print_order_list {
  position: fixed;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border-radius: 50%;
  bottom: 200px;
  right: 100px;
  background-color: #ff5638;
  color: #fff;
  font-size: 34px;
  z-index: 1150;
}

.O-list {
  height: 100%;
  overflow: hidden;

  .O-item:nth-of-type(1) {
    mt(0);
  }
}

#orders {
  width: 100%;
  height: 100%;
  pos(relative);
  top: 0;
  left: 0;
  pt(101);
  pb(98);
}

.pr_mask {
  position: fixed;
  z-index: 1200;
  width: 100%;
  height: 100%;
  bottom: 0rpx;
  left: 0rpx;
  background-color: #000;
  opacity: 0.4;
}

.authorityPrint {
  width: 520px;
  height: 300px;
  position: fixed;
  z-index: 1202;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  padding: 24px;
  background: #fff;
}

.authorityPrint_title {
  width: 100%;
  height: 90px;
  margin-top: 20px;
  // background: rgba(255, 86, 56, 1);
  font-size: 32px;
  line-height: 90px;
  color: rgba(255, 86, 56, 1);
  text-align: center;
  font-weight: bold;
}

.authorityPrint_btn {
  // width: 100%;
  height: 90px;
  margin-top: 20px;
  background: rgba(255, 86, 56, 1);
  font-size: 30px;
  line-height: 90px;
  color: #fff;
  text-align: center;
}
</style>


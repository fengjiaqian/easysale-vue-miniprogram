<template>
  <div id="orders">
    <empty v-if="empty" txt="暂无此类订单" :iconUrl="avatarUrl"></empty>
    <ui-table :orderTab="orderTab" :initialState="currentState" @swithTab="_switchOrderType"></ui-table>
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
  </div>
</template>

<script>
/**
 *订单状态 1=待处理，2=已处理，3=已拒绝，4=已完成 5=已取消
 */
const orderTab = [
  { text: "待处理", state: 1 },
  { text: "已处理", state: 2 },
  { text: "已拒绝", state: 3 },
  { text: "已取消", state: 5 }
];
const params = {
  orderState: 1,
  pageNum: 1,
  pageSize: 3
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
      avatarUrl
    };
  },
  components: {
    uiTable,
    orderItem,
    scroll,
    empty
  },
  computed: {},
  created() {
    this.params = params;
    if (!this.isVisitor) {
      this._QueryOrders();
    }
  },
  activated() {
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
    }
  }
};
</script>

<style lang="stylus">
.O-list {
  height: 100%;
  overflow: hidden;
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
</style>


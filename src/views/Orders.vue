<template>
  <div id="orders">
    <ui-table :orderTab="orderTab" :initialState="currentState" @swithTab="_switchOrderType"></ui-table>
    <!--  -->
    <scroll
      class="O-list"
      :data="orderList"
      :probeType="3"
      :autoLoad="true"
      @autoLoad="loadMoreOrders"
      ref="scrollOrders"
    >
      <div>
        <order-item v-for="item in orderList" :order="item"></order-item>
      </div>
    </scroll>
  </div>
</template>

<script>
// 订单状态 1=待处理，2=已处理，3=已拒绝，4=已完成
const orderTab = [
  { text: "待处理", state: 1 },
  { text: "已处理", state: 2 },
  { text: "已拒绝", state: 3 },
  { text: "已完成", state: 4 }
];
import orderItem from "components/order-item.vue";
import uiTable from "components/ui-table.vue";
import productCart from "components/product-cart.vue";
import { getAllGoods } from "common/goodsStorage";
import empty from "components/empty.vue";
import scroll from "components/scroll.vue";
import * as orderApi from "api/fetch/order";
export default {
  name: "orders",
  data() {
    return {
      orderTab: orderTab,
      currentState: 1,
      orderList: [],
      empty: false
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
    this._QueryOrders();
  },
  methods: {
    _QueryOrders(reset) {
      if (this.loading) return false;
      if (reset) {
        this.currentPage = 1;
        this.totalPage = 1;
      }
      this.loading = true;
      const params = {
        //orderState: this.currentState,
        userId: 465273,
        pageNum: this.currentPage
      };
      orderApi
        .QueryOrders(params)
        .then(res => {
          if (res.result === "success" && res.data) {
            const { dataList = [], pager } = res.data;
            const { currentPage, totalPage } = pager;
            if (currentPage === 1) {
              this.orderList = this.transformOrders(dataList);
              this.totalPage = totalPage;
              this.empty = !this.orderList.length;
            } else {
              this.orderList = this.orderList.concat(
                this.transformOrders(dataList)
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
    transformOrders(orderList) {
      for (let order of orderList) {
        order.totalQuantity = order.orderItem.reduce(
          (acc, cur) => acc + cur.quantity,
          0
        );
      }
      return orderList;
    },
    loadMoreOrders() {
      if (this.loading) return false;
      this._QueryOrders();
    },
    _switchOrderType(state) {
      this.$refs.scrollOrders.scrollTo(0, 0);
      this.currentState = state;
      this._QueryOrders(true);
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


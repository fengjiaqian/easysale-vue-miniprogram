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
        <div v-for="i in 10">
          <order-item v-for="item in orderList" :order="item"></order-item>
        </div>
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
      orderList: []
    };
  },
  components: {
    uiTable,
    orderItem,
    scroll
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
        orderState: this.currentState,
        userId: 6348352047144356487,
        pageNum: this.currentPage
      };
      orderApi
        .QueryOrders(params)
        .then(res => {
          if (res.result === "success" && res.data) {
            this.orderList = res.data.dataList.filter(
              item => item.orderItem.length
            );
            // if (currentPage == 1) {
            //   this.totalPage = Math.ceil(res.totalCount / pageSize);
            //   this.orderList = this._transformOrders(res.data);
            //   this.empty = !this.orderList.length;
            // } else {
            //   this.orderList = this.orderList.concat(
            //     this._transformOrders(res.data)
            //   );
            // }
            // this.currentPage++;
            // this.loading = false;
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    loadMoreOrders() {
      if (this.loading || this.orderList.length < 6) return false;
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

.O-tab {
  width: 100%;
  h(80);
  bg(#fff);
  pos(absolute);
  top: 0;
  left: 0;

  li {
    width: 25%;
    flt();
    text-c();

    a {
      inline();
      lh(80);
      padding: 0 28px;
      ft(30);
      c(#333);

      &.active {
        c($color-theme);
        border-bottom: 2PX solid $color-theme;
      }
    }
  }
}
</style>


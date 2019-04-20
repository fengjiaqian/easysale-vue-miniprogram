<template>
  <div id="orderDetail" v-if="order.orderState">
    <div class="state">
      订单状态：
      <strong class="c-theme">{{order.orderState | orderState}}</strong>
    </div>
    <div class="order-detail-area product-Info">
      <h5>商品信息</h5>
      <!-- 单个产品 -->
      <div class="single-sku clearfix" v-if="order.orderItem.length===1">
        <div class="s-s-img">
          <img v-lazy="order.orderItem[0].product.productImageUrl" alt>
        </div>
        <div class="s-s-main">
          <p class="name">{{order.orderItem[0].product.productName}}</p>
          <div
            class="price"
          >{{order.orderItem[0].product.price}}元/{{order.orderItem[0].product.priceUnit}}</div>
          <div class="price">
            <span>规格：{{order.orderItem[0].product.specification}}</span>
            <span class="frt fz28">X{{order.orderItem[0].quantity}}</span>
          </div>
        </div>
      </div>
      <!-- 多个产品 -->
      <div class="multiple-skus" v-else @click="_jumpGoodsList">
        <div class="m-s-amount">共{{order.totalQuantity}}></div>
        <ul class="m-s-skus clearfix">
          <li v-for="item in order.orderItem" :key="item.orderId">
            <a href="javascript:;">
              <img v-lazy="item.product.productImageUrl" alt>
              <span>X{{item.quantity}}{{item.product.priceUnit}}</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="order-detail-amount">
        订单总金额：
        <span class="c-theme">&yen;{{order.orderAmount}}</span>
      </div>
    </div>
    <div class="order-detail-area">
      <h5>收货人信息</h5>
      <div class="info-display pre">
        <p>客户姓名：{{order.customer.name}}</p>
        <p>手机号码：{{order.customer.phone}}</p>
        <a class="tel" :href="'tel:'+order.customer.phone"></a>
      </div>
      <div class="info-display">
        <p>店铺名称：{{order.customer.customerShopName}}</p>
        <p>收货地址：{{order.customer.address}}</p>
      </div>
    </div>
    <!-- 经销商角色展示下单人 -->
    <div class="order-detail-area">
      <h5>订单信息</h5>
      <div class="info-display">
        <p>下单人：{{order.createUser}}</p>
        <p>下单店铺：{{order.dealerName}}</p>
        <p>下单时间：{{order.createTime}}</p>
      </div>
    </div>
    <!--  -->
    <div class="bottom-wrap" v-if="order.canRefuse">
      <a href="javascript:;" class="btn" @click="_operate(3,order.id)">拒绝</a>
      <a href="javascript:;" class="btn" @click="_operate(2,order.id)">同意</a>
    </div>
    <div class="bottom-wrap" v-if="order.canCancel">
      <a href="javascript:;" class="btn" @click="_operate(5,order.id)" style="width:100%">取消申请</a>
    </div>
  </div>
</template>

<script>
/**
 * 1.标题不同
 * 2.操作项不同
 *
 */
import { UpdateOrder, QueryOrders } from "api/fetch/order";
import { transformOrderList, orderOperate } from "./orderOperate";
export default {
  name: "order-detail",
  data() {
    return {
      order: {}
    };
  },
  created() {
    this._QueryOrders();
  },
  mounted() {},
  methods: {
    _QueryOrders() {
      const { orderId } = this.$route.params;
      QueryOrders({
        id: orderId
      })
        .then(res => {
          const orders = transformOrderList(res.data.dataList);
          orders.length && (this.order = orders[0]);
        })
        .catch(err => {
          this.$toast(err.message);
        });
    },
    _jumpGoodsList() {
      let products = this.order.orderItem.map(item => item.product);
      this.$router.push({
        path: "/goodsList",
        query: { products: this.encodeUrl(products) }
      });
    },
    //封装到operate
    _operate(state, orderId) {
      const options = {
        state,
        orderId
      };
      orderOperate.call(this, options, this._QueryOrders.bind(this));
    }
  }
};
</script>

<style lang='stylus' scoped>
@import './common.styl';

.bottom-wrap {
  pos(fixed);
  width: 100%;
  bottom: 0;
  border-top: 1px solid #EDEDED;
}

.btn {
  inline();
  width: 50%;
  h(98);
  lh(98);
  c($color-theme);
  text-c();
  ft(32);

  &:nth-of-type(2) {
    bg($color-theme);
    c(#fff);
  }
}

.info-display {
  padding: 20px 0;

  p {
    lh(50);
    c(#666);
    ft(30);
  }

  .tel {
    block();
    pos(absolute);
    bottom: 25px;
    right: 32px;
    squ(40);
    background: url('../../assets/images/icon-tel.png') no-repeat center;
    background-size: contain;
  }
}

.order-detail-area {
  margin: 20px 16px;
  padding: 0 24px;
  bg(#fff);

  h5 {
    lh(90);
    ft(30);
    border-bottom: 1px solid #EDEDED;
  }

  .info-display {
    &:nth-of-type(2) {
      border-top: 1px solid #EDEDED;
    }
  }
}

.product-Info {
  .order-detail-amount {
    lh(90);
    ft(30);
    c(#333);
    text-align: right;
    border-top: 1px solid #EDEDED;
  }
}

.state {
  bg(#fff);
  pl(24);
  h(32 + 46);
  lh(32 + 46);
  ft(34);
  fb();

  >strong {
    ft(34);
  }
}
</style>
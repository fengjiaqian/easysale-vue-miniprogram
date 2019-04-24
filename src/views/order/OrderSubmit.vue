<template>
  <div class="order-submit">
    <m-header :isFixed="true"></m-header>
    <!--  -->
    <div class="order-detail-area">
      <h5>
        收货人信息
        <a
          href="javascript:;"
          class="frt c-theme fz28"
          @click="_selectCustomer"
        >{{userType==3?'选择收货人':'选择客户'}}</a>
      </h5>
      <div class="info-display pre" v-if="currentCustomer.name">
        <p>客户姓名：{{currentCustomer.name}}</p>
        <p>手机号码：{{currentCustomer.phone}}</p>
      </div>
      <div class="info-display" v-if="currentCustomer.name">
        <p>店铺名称：{{currentCustomer.customerShopName}}</p>
        <p>收货地址：{{currentCustomer.address}}</p>
      </div>
    </div>
    <!--  -->
    <div class="order-detail-area product-Info">
      <h5>商品信息</h5>
      <order-products v-if="products.length" :products="products"></order-products>
      <div class="order-detail-amount">
        订单总金额：
        <span class="c-theme">&yen;{{payableAmount | priceToFixed}}</span>
      </div>
    </div>
    <div class="select-customer" v-if="userType!=3">
      <strong class="fz30">优惠</strong>
      <input
        ref="reduce"
        type="number"
        placeholder="请输入金额"
        :value="reduce"
        @change="handleChange"
        :class="{'c-theme':!!reduce}"
      >
    </div>
    <!-- 备注 -->
    <div class="order-detail-area">
      <h5>备注</h5>
      <div class="info-display">
        <textarea
          class="remark-txt"
          name="remark"
          id="remark"
          cols="60"
          rows="3"
          placeholder="请输入备注"
          v-model="remark"
        ></textarea>
      </div>
    </div>
    <!--  -->
    <div class="bottom" ref="bottomDom">
      <a href="javascript:;" @click="_OrderSubmit">提交订单</a>
      &yen;{{payableAmount | priceToFixed}}
    </div>
  </div>
</template>

<script>
function isValueNumber(value) {
  return /(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/.test(value);
}
/**
 * 终端用户下单 3  选择收货人
 * 经销商下单  1 选择客户  同销售人员
 */
import storage from "common/storage";
import { batchRemoveItem } from "common/goodsStorage";
import { OrderSubmit } from "api/fetch/order";
import { transformOrderItems } from "common/productUtil";
import { queryAddressList } from "api/fetch/endCustomer";
import { findCustomerList } from "api/fetch/dealer";
import orderProducts from "components/order-products.vue";
export default {
  name: "order-submit",
  data() {
    return {
      reduce: 0,
      products: [],
      orderAmount: 0,
      currentCustomer: {},
      remark: ""
    };
  },
  computed: {
    payableAmount() {
      return this.orderAmount - this.reduce;
    }
  },
  components: {
    orderProducts
  },
  beforeCreate() {},
  created() {
    this._initOrderInfo();
  },
  mounted() {
    this.hanlderBottomDom();
  },
  destroyed() {},
  methods: {
    _initOrderInfo() {
      /**
       * 初始化商品信息，优惠，备注，客户收货人信息。
       */
      this.products = storage.get("orderPrequeryParams", []);
      const orderExtraParams = storage.get("orderExtraParams", {});
      this.reduce = orderExtraParams.reduce || "";
      this.remark = orderExtraParams.remark || "";
      this.orderAmount = this.products.reduce(
        (ac, cur) => (ac += cur.buyCount * cur.price),
        0
      );
      const customerInfo = this.$route.query.customerInfo || "";
      customerInfo && (this.currentCustomer = this.decodeUrl(customerInfo));
      storage.set("fromOrder", false);
      storage.set("orderExtraParams", {});
    },
    _OrderSubmit() {
      const customerId = this.currentCustomer.id;
      if (!customerId) {
        const msg = this.userType == 3 ? "请选择收货人" : "请选择客户";
        return this.$toast(msg);
      }
      const orderItem = transformOrderItems(this.products);
      const params = {
        customerId,
        orderItem,
        orderAmount: this.orderAmount,
        reduceAmount: this.reduce || 0,
        payableAmount: this.payableAmount, //应付
        order_remark: this.remark
      };
      OrderSubmit(params)
        .then(res => {
          console.log(res);
          //批量删除购物车中商品
          batchRemoveItem(this.products);
          this.$router.push({ path: "/orderResult" });
        })
        .catch(err => {
          this.$router.push({
            path: "/orderResult",
            query: {
              err: err.message
            }
          });
        });
    },
    _selectCustomer() {
      storage.set("fromOrder", true);
      //记录优惠和备注信息
      const orderExtraParams = {
        reduce: this.reduce,
        remark: this.remark
      };
      storage.set("orderExtraParams", orderExtraParams);
      const path = this.userType == 3 ? "/myConsignee" : "/my/customerList";
      this.$router.push({
        path
      });
    },
    hanlderBottomDom() {
      const el = this.$refs.bottomDom;
      const clientHeight =
        document.body.clientHeight || document.documentElement.clientHeight;
      var resizeFn = function() {
        const thisHeight =
          document.body.clientHeight || document.documentElement.clientHeight;
        if (clientHeight - thisHeight > 140) {
          el.style.position = "static";
        } else {
          el.style.position = "fixed";
        }
      };
      window.addEventListener("resize", resizeFn);
    },
    handleChange: function(event) {
      var val = event.target.value.trim();
      if (isValueNumber(val)) {
        var max = this.orderAmount;
        val = Number(val);
        this.reduce = val;
        if (val > max) this.reduce = max;
        if (val < 0) this.reduce = 0;
      } else {
        // 如果输入的非数字，则保留之前的数据
        event.target.value = this.reduce;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './common.styl';

.order-submit {
  pt(90);
  pb(92);
}

.remark-txt {
  width: 100%;
  padding: 12px;
  ft(28);
  c(#999);
  line-height: 1.2;
}

.info-display {
  padding: 20px 0;

  p {
    lh(50);
    c(#666);
    ft(30);
  }
}

.bottom {
  width: 100%;
  pl(24);
  pos(fixed);
  bottom: 0;
  left: 0;
  bg(#fff);
  h(98);
  lh(98);
  ft(48);
  c($color-theme);

  a {
    w(224);
    h(98);
    frt();
    bg($color-theme);
    c(#fff);
    ft(32);
    text-c();
  }
}

.select-customer {
  margin: 20px 16px;
  padding: 0 24px;
  bg(#fff);
  lh(90);
  flex-center();
  justify-content: space-between;

  a {
    ft(28);
  }

  input {
    w(150);
    h(42);
    text-indent: 5px;
    ft(28);
    c(#333);
    text-align: right;
  }

  .c-theme {
    c($color-theme);
  }
}

.order-detail-area {
  margin: 20px 16px;
  padding: 0 24px;
  bg(#fff);

  h5 {
    lh(90);
    ft(30);
    fb();
    border-bottom: 1PX solid #EDEDED;
  }

  .info-display {
    &:nth-of-type(2) {
      border-top: 1PX solid #EDEDED;
    }
  }
}

.product-Info {
  .order-detail-amount {
    lh(90);
    ft(30);
    c(#333);
    text-align: right;
    border-top: 1PX solid #EDEDED;
  }
}
</style>


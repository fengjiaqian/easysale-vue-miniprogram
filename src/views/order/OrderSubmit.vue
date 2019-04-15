<template>
  <div class="order-submit">
    <div class="select-customer">
      <strong class="fz30">收货人信息</strong>
      <a class="c-theme" href="javascript:;" @click="_selectCustomer">选择客户</a>
    </div>

    <!--  -->
    <div class="order-detail-area">
      <h5>
        收货人信息
        <a href="javascript:;" class="frt c-theme fz28">选择客户</a>
      </h5>
      <div class="info-display pre">
        <p>客户姓名：老王</p>
        <p>手机号码：134-2348-2334</p>
      </div>
      <div class="info-display">
        <p>店铺名称：老王的店铺</p>
        <p>收货地址：武汉市洪山区软件新城A3-401</p>
      </div>
    </div>

    <!--  -->
    <div class="order-detail-area product-Info">
      <h5>商品信息</h5>
      <!-- 多个产品 -->
      <div class="multiple-skus">
        <div class="m-s-amount">共15></div>
        <ul class="m-s-skus clearfix">
          <li v-for="item in 5" :key="item">
            <a href="javascript:;">
              <img v-lazy="''" alt>
              <span>X1件</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="order-detail-amount">
        订单总金额：
        <span class="c-theme">&yen;794.00</span>
      </div>
    </div>
    <div class="select-customer">
      <strong class="fz30">折扣</strong>
      <input type="number" placeholder="请输入折扣">
    </div>
    <!--  -->
    <div class="bottom">
      <a href="javascript:;" @click="_OrderSubmit">提交订单</a>
      ¥398.00
    </div>
  </div>
</template>

<script>
import { OrderSubmit } from "api/fetch/order";
export default {
  name: "order-submit",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    _selectCustomer() {},
    _OrderSubmit() {
      const dealerId = 19990530,
        customerId = 6348352047144357000,
        orderAmount = 90;
      const orderItem = [
        { productId: 169840639200985719, quantity: 2, salePrice: 5 }
        // { productId: 169840639200985720, quantity: 2, salePrice: 500 }
      ];
      const params = {
        // orderState:1,
        dealerId,
        customerId,
        orderAmount,
        orderItem
      };
      const enterFail = function(msg) {
        this.$router.push({
          path: "/orderResult",
          query: {
            err: msg
          }
        });
      };
      OrderSubmit(params)
        .then(res => {
          console.log(res);
          if (res.result === "success") {
            this.$router.push({ path: "/orderResult" });
          } else {
            enterFail(res.message);
          }
        })
        .catch(err => {
          enterFail(err.message);
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './common.styl';

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
    bg(#ccc);
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
</style>


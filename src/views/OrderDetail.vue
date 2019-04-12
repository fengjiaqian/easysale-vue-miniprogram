<template>
  <div id="orderDetail">
    <div class="state">
      订单状态：
      <strong class="c-theme">待处理</strong>
    </div>
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
    <div class="order-detail-area">
      <h5>收货人信息</h5>
      <div class="info-display pre">
        <p>客户姓名：老王</p>
        <p>手机号码：134-2348-2334</p>
        <a class="tel" href="tel:15071124354"></a>
      </div>
      <div class="info-display">
        <p>店铺名称：老王的店铺</p>
        <p>收货地址：武汉市洪山区软件新城A3-401</p>
      </div>
    </div>
    <!-- 经销商角色展示下单人 -->
    <div class="order-detail-area">
      <h5>订单信息</h5>
      <div class="info-display">
        <p>下单人：销售员-小黑</p>
        <p>下单时间：2019-03-23 13:32</p>
      </div>
    </div>
    <!--  -->
    <div class="bottom-wrap">
      <a href="javascript:;" class="btn">拒绝</a>
      <a href="javascript:;" class="btn">同意</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "order-detail",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang='stylus' scoped>
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
    background: url('../assets/images/icon-tel.png') no-repeat center;
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

.multiple-skus {
  margin: 16px 0;

  .m-s-amount {
    lh(150);
    ft(29);
    c(#333);
    padding: 0 5px 0 19px;
    frt();
  }
}

.m-s-skus {
  h(150);
  mr(100);
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;

  li {
    inline();

    &:nth-last-of-type(1) {
      a {
        mr(0);
      }
    }

    a {
      block();
      mr(21);
      pos(relative);
      squ(150);

      img {
        width: 100%;
        height: 100%;
      }

      span {
        pos(absolute);
        bottom: 0;
        left: 0;
        lh(30);
        h(30);
        width: 100%;
        bg(rgba(0, 0, 0, 0.5));
        ft(23);
        c(#fff);
        text-c();
      }
    }
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
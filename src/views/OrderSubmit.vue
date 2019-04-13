<template>
  <div class="order-submit">
    <div class="select-customer">
      <strong class="fz30">客户信息</strong>
      <a class="c-theme" href="javascript:;" @click>选择客户</a>
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
    <div class="select-customer">
      <strong class="fz30">折扣</strong>
      <input type="number" placeholder="请输入折扣">
    </div>
    <!--  -->
    <div class="bottom">
      <a href="javascript:;">提交订单</a>
      ¥398.00
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.bottom {
  width 100%
  pl(24)
  pos(fixed);
  bottom: 0;
  left: 0;
  bg(#fff);
  h(98);
  lh(98);
  ft(48)
  c($color-theme)

  a {
    w(224);
    h(98);
    frt();
    bg(#ccc);
    c(#fff)
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
</style>


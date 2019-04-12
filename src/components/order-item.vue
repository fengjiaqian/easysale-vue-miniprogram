

<template>
  <div class="O-item">
    <!--  -->
    <div class="O-item-header">
      <div class="state">待处理</div>
      <div class="title">小王 -【良品铺子】</div>
      <p class="time">{{order.createTime}}</p>
    </div>
    <!--  -->
    <div class="O-item-skus" v-if="order.orderItem">
      <!-- 单个产品 -->
      <div class="single-sku clearfix">
        <div class="s-s-img">
          <img v-lazy alt>
        </div>
        <div class="s-s-main">
          <p class="name">小王 -【良品铺子】</p>
          <div class="price">{{order.orderItem[0].salePrice}}元/瓶</div>
          <div class="price">
            <span>规格：15瓶/件</span>
            <span class="frt">x{{order.orderItem[0].quantity}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="O-item-amount">
      订单总金额：
      <span class="c-theme">&yen;794.00</span>
    </div>
    <div class="O-item-btns">
      <a href="javascript:;" class="btn">拒绝</a>
      <a href="javascript:;" class="btn yes-btn">同意</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "order-item",
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    _jumpOrderDetail() {
      const orderId = this.order.id;
      this.$router.push({
        name: "orderDetail",
        params: {
          orderId
        }
      });
    }
  }
};
</script>

<style lang="stylus">
.single-sku {
  .s-s-img {
    flt();
    squ(150);

    img {
      width: 100%;
      height: 100%;
    }
  }

  .s-s-main {
    ml(175);

    .name {
      ft(29);
      c(#333);
    }

    .price {
      mt(21);
      ft(25);
      c(#333);
    }
  }
}

.O-item {
  mt(21);
  bg(#fff);

  .O-item-header {
    bg(#fff);
    padding: 24px;
    border-bottom: 1PX solid rgba(0, 0, 0, 0.1);

    .state {
      c($color-theme);
      ft(24);
      frt();
      text-align: right;

      span {
        lh(50);
      }
    }

    .title {
      ft(30);
      c(#333);
    }

    .time {
      c(#666);
      ft(26);
      mt(16);
    }

    .pay-overtime {
      c(#666);
      ft(26);
      mt(16);
    }
  }

  .O-item-skus {
    padding: 24px;
    bg(#FAFAFB);
  }

  .O-item-amount {
    h(88);
    lh(88);
    padding: 0 24px;
    text-align: right;
    ft(28);
    c(#333);
    border-bottom: 1PX solid rgba(0, 0, 0, 0.1);
  }

  .O-item-btns {
    text-align: right;
    padding: 16px 24px 0 0;
    h(88);

    .btn {
      inline();
      mr(20);
      w(148);
      h(56);
      lh(56);
      text-c();
      ft(28);
      c(#666);
      b1(rgba(102, 102, 102, 1));
      radius(8);

      &.yes-btn {
        c($color-theme);
        b1($color-theme);
      }

      &:nth-last-of-type(1) {
        mr(0);
      }
    }
  }
}
</style>


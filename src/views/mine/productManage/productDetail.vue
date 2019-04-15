<template>
  <div id="detail">
    <div class="D-img">
      <img v-lazy="product.productImageUrl || ''" :alt="product.productName">
    </div>
    <div class="D-name">{{product.productName}}</div>
    <div class="D-price">
      <span class="c-yellow" v-html="$options.filters.price(product.price)"></span>
    </div>
    <div class="D-number">
      <span class="c-3 fz30">数量</span>
    </div>
    <!--  -->
    <div class="D-info">
      <h3>商品介绍</h3>
      <ul class="D-info-list">
        <li v-for="i in 4">产地：江苏</li>
      </ul>
    </div>
    <div class="D-bottom">
      <span>删除</span>
      <span class="edit">编辑</span>
    </div>
  </div>
</template>

<script>
import { queryProductDetail, test } from "api/fetch/productDetail";

export default {
  data() {
    return {
      product: {}
    };
  },
  components: {

  },
  created() {
    this._queryDetail();
  },
  mounted() {},
  methods: {
    _queryDetail() {
      const skuId = this.$route.params.code || '169840639200985719';
      queryProductDetail(skuId).then(res => {
        if (res.result === "success" && res.data) {
          this.product = this.initPorduct(res.data);
        }
      });
    },
    initPorduct(product) {
      product.buyCount = 1;
      product.minBuyNum = 1;
      product.maxBuyNum = 9999;
      return product;
    },
  }
};
</script>

<style lang="stylus" scoped>
.D-link {
  inline();
  width: 50%;
  h(98);

  dt {
    squ(48);
    margin: 0 auto;
    mt(10);

    &.shouye {
      background: url('../../../assets/images/icon-shouye.png') no-repeat center;
      background-size: contain;
    }

    &.order {
      background: url('../../../assets/images/icon-orders.png') no-repeat center;
      background-size: contain;
    }
  }

  dd {
    mt(2);
    lh(30);
    ft(22);
    c(#999);
    text-c();
  }
}


.immediately {
  bg(#FFBD38);
}

.D-info {
  mt(20);
  bg(#fff);

  h3 {
    lh(90);
    pl(24);
    c(#333);
    ft(30);
    border-bottom: 1px solid #EDEDED;
  }
}

.D-info-list {
  padding: 20px 20px 20px 24px;

  li {
    lh(54);
    c(#666);
    ft(28);
  }
}

.D-img {
  padding: 50px 0;
  bg(#fff);

  img {
    squ(400);
    block();
    margin: 0 auto;
  }
}

.D-name {
  bg(#fff);
  pl(24);
  lh(94);
  c(#333);
  ft(34);
}

.D-price {
  bg(#fff);
  pb(16);
  pl(24);
  h(66);
}

.D-number {
  h(90);
  mt(20);
  bg(#fff);
  padding: 0 24px;
  flex-center();
  justify-content: space-between;
}
.D-bottom{
  position fixed
  left 0
  bottom 0
  width 100%
  lh(98)
  bg(#fff)
  ft(30)
  c-6()
  flex-center()
  span{
    width 50%
    text-c()
  }
  .edit{
    c(#FF5638)
  }
}
</style>


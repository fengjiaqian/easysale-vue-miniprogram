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
      <number-picker :product="product"></number-picker>
    </div>
    <!--  -->
    <div class="D-info">
      <h3>商品介绍</h3>
      <ul class="D-info-list">
        <li v-for="i in 4">产地：江苏</li>
      </ul>
    </div>
    <!--  -->
    <div class="D-bottom">
      <div class="D-bottom-left">
        <dl class="D-link">
          <dt class="shouye"></dt>
          <router-link tag="dd" to="/navi/home">首页</router-link>
        </dl>
        <dl class="D-link">
          <dt class="order"></dt>
          <router-link tag="dd" to="/cart">购物车</router-link>
        </dl>
      </div>
      <div class="D-bottom-right">
        <a href="javascript:;" class="normal-btn immediately">立即下单</a>
        <a href="javascript:;" class="normal-btn" @click="_addToCart(product)">加入购物车</a>
      </div>
    </div>
  </div>
</template>

<script>
import numberPicker from "components/number-picker.vue";
import { queryProductDetail, test } from "api/fetch/productDetail";
import { updateItem } from "common/goodsStorage";
export default {
  name: "detail",
  data() {
    return {
      product: {}
    };
  },
  components: {
    numberPicker
  },
  created() {
    this._queryDetail();
  },
  mounted() {},
  methods: {
    _queryDetail() {
      const skuId = this.$route.params.code;
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
    _addToCart(product) {
      updateItem(product, product.buyCount, true);
      this.$toast("加入购物车成功");
    }
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
      background: url('../assets/images/icon-shouye.png') no-repeat center;
      background-size: contain;
    }

    &.order {
      background: url('../assets/images/icon-orders.png') no-repeat center;
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

.D-bottom {
  pos(fixed);
  left: 0;
  bottom: 0;
  width: 100%;
  h(98);
  bg(#fff);
}

.D-bottom-left {
  width: 40%;
  flt();
}

.D-bottom-right {
  width: 60%;
  frt();
}

.normal-btn {
  inline();
  width: 50%;
  c(#fff);
  ft(32);
  lh(98);
  bg(#FF5638);
  text-c();
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
</style>


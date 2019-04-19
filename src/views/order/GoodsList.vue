<template>
  <div class="goods-list">
    <div
      class="G-product-item clearfix"
      @click="_enterDetail(product)"
      v-for="product in products"
      :key="product.id"
    >
      <div class="G-product-img">
        <img v-lazy="product.productImageUrl || ''" alt>
      </div>
      <div class="G-product-content">
        <p class="name">{{product.productName}}</p>
        <div class="spec">规格 {{product.specification}}</div>
        <div class="price">
          <span class="c-yellow" v-html="$options.filters.price(product.price, product.priceUnit)"></span>
          <span class="fz28 c-6">X{{product.buyCount}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryProductDetail } from "api/fetch/productDetail";
export default {
  name: "goods-list",
  data() {
    return {
      products: []
    };
  },
  beforeCreate() {},
  created() {
    const { products } = this.$route.query;
    this.products = products ? JSON.parse(decodeURIComponent(products)) : [];
  },
  methods: {
    _enterDetail(product) {
      this.$router.push({
        name: "detail",
        params: {
          code: product.id
        }
      });
    }
  }
};
</script>

<style lang="stylus">
.G-product-item {
  padding: 24px 0 0 24px;
  bg(#fff);
}

.G-product-img {
  squ(200);
  flt();
  bg(rgba(246, 246, 246, 1));

  img {
    width: 100%;
    heihgt: 100%;
  }
}

.G-product-content {
  pr(24);
  pb(24);
  ml(224);
  border-bottom: 1px solid #EDEDED;

  .name {
    ft(32);
    c(#333);
    line-height: 1.2;
  }

  .spec {
    mt(25);
    h(36);
    lh(36);
    ft(26);
    c(#999);
  }

  .price {
    h(48);
    mt(40);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>


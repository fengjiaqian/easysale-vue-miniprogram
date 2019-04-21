<template>
  <div class="H-product-item clearfix" @click="_enterDetail">
    <div class="H-product-img">
      <img v-lazy="''" alt>
    </div>
    <div class="H-product-content">
      <p class="name">{{product.productName}}</p>
      <div class="spec">规格 {{product.specification}}</div>
      <div class="price">
        <div>
          <span class="c-yellow" v-html="$options.filters.price(product.price, product.priceUnit)"></span>
        </div>
        <number-picker :product="product"></number-picker>
      </div>
    </div>
  </div>
</template>

<script>
import numberPicker from "./number-picker.vue";

export default {
  name: "product",
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    numberPicker
  },
  methods: {
    _enterDetail() {
      const code = this.product.id;
      this.$router.push({
        name: "detail",
        params: {
          code
        }
      });
    }
  }
};
</script>


<style lang="stylus">.H-product-item {
  padding: 24px 0 0 24px;
  bg(#fff);
}

.H-product-img {
  squ(200);
  flt();
  bg(rgba(246, 246, 246, 1));

  img {
    width: 100%;
    heihgt: 100%;
  }
}

.H-product-content {
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
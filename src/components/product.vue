<template>
  <div class="H-product-item clearfix" @click="_enterDetail">
    <div class="H-product-img">
      <img v-lazy="product.productImageUrl || ''" :alt="product.productName">
    </div>
    <div class="H-product-content">
      <p class="name">{{product.productName}}&nbsp;<i v-if="product.remark" :class="'s-success'">{{product.remark}}</i></p>
      <div class="spec">规格 {{product.specification}}</div>
      <div class="price">
        <div>
          <span class="c-yellow" style="font-size: medium">押金:&nbsp;</span>
          <span class="c-yellow" v-html="$options.filters.price(product.price, product.priceUnit)"></span>
        </div>
        <number-picker :product="product"></number-picker>
      </div>
      <!--<div v-if="product.remark" :class="[product.remark!=null ? 'priceremark' : '']">{{product.remark}}</div>-->
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


<style lang="stylus" scoped>
.H-product-item {
  padding: 24px 0 0 24px;
  bg(#fff);
}

.H-product-img {
  squ(200);
  flt();
  bg(rgba(246, 246, 246, 1));

  img {
    width: 100%;
    height: 100%;
  }
}

.H-product-content {
  pr(24);
  pb(24);
  ml(224);
  border-bottom: 1PX solid #EDEDED;

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
    mt(20);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .s-success {
    font-size: 0.847059rem;
    color: #fff;
    -webkit-border-radius: 0.117647rem;
    border-radius: 0.117647rem;
    padding: 0.16rem 0.235294rem;
    margin-right: 0.352941rem;
    line-height: 1rem;
    word-break: keep-all;
    background: #ff5638 !important;
    border: 0;
    font-weight: normal;
    vertical-align: baseline;
    font-style: normal;
    box-sizing: border-box;

  }

}
</style>

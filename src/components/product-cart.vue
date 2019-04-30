<template>
  <div class="C-product-item clearfix" @click="_enterDetail">
    <span class="C-check-icon" @click.stop="_select(product)" :class="{'checked': product.checked}"></span>
    <div class="C-product-img">
      <img v-lazy="product.productImageUrl || ''" :alt="product.productName">
    </div>
    <div class="C-product-content">
      <p class="name">{{product.productName}}</p>
      <div class="spec">规格： {{product.specification}}</div>
      <div class="price">
        <div>
          <span class="c-yellow" v-html="$options.filters.price( product.price, product.priceUnit)"></span>
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
    _select(product) {
      this.$emit("itemSelect", product);
    },
    _enterDetail() {
      const code = this.product.id;
      this.$router.push({
        name: "detail",
        params: {
          code
        }
      });
    }
  },
  watch: {
    // "product.buyCount": {
    //   handler(newval, oldval) {
    //     console.log(newval);
    //   },
    //   deep: true
    //   //immediate: true  //首次绑定是否执行handler
    // }
  }
};
</script>

<style lang="stylus">
.C-check-icon {
  block();
  squ(40);
  pos(absolute);
  top: 76px;
  left: 24px;
  background-image: url('../assets/images/icon-check.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.checked {
  background-image: url('../assets/images/icon-checked.png');
}

.C-product-item {
  pos(relative);
  padding: 24px 0 0 88px;
  bg(#fff);

  &:nth-last-child(2) {
    .C-product-content {
      border: 0;
    }
  }
}

.C-product-img {
  squ(144);
  flt();
  bg(rgba(246, 246, 246, 1));

  img {
    width: 100%;
    height: 100%;
  }
}

.C-product-content {
  pr(24);
  pb(24);
  ml(168);
  border-bottom: 1PX solid #EDEDED;

  .name {
    pr(30);
    ft(32);
    c(#333);
    h(84);
    line-height: 1.2;
  }

  .spec {
    h(36);
    lh(36);
    ft(26);
    c(#666);
  }

  .price {
    h(48);
    mt(16);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
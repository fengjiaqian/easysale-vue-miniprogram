<template>
  <div class="number-picker">
    <span class="decrease" @click.stop="decrease(product)" v-show="product.buyCount"></span>
    <input
      v-show="product.buyCount"
      type="number"
      :value="product.buyCount"
      @click.stop
      @change="handleChange(product, $event)"
    >
    <span class="increase" @click.stop="increase(product)"></span>
  </div>
</template>

<script>
import { updateItem } from "common/goodsStorage";
export default {
  name: "number-picker",
  props: {
    product: {
      type: Object,
      default: () => ({})
    },
    detection: {
      //是否需要调用购物车金额计算
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    decrease(product) {
      const { minBuyNum, maxBuyNum } = product;
      if (product.buyCount <= minBuyNum) return false;
      product.buyCount--;
      updateItem(product, product.buyCount);
    },
    increase(product) {
      const { minBuyNum, maxBuyNum } = product;
      if (product.buyCount >= maxBuyNum) return false;
      product.buyCount++;
      updateItem(product, product.buyCount);
    },
    handleChange(product, $event) {
      let currentVal = parseInt($event.target.value) || 0;
      product.buyCount = currentVal;
      updateItem(product, product.buyCount);
    }
  }
};
</script>
<style lang="stylus">
.number-picker {
  span {
    inline();
    squ(40);
    vm();
  }

  .decrease {
    background: url('../assets/images/icon-decrease.png') no-repeat center;
    background-size: contain;
  }

  .increase {
    background: url('../assets/images/icon-increase.png') no-repeat center;
    background-size: contain;
  }

  input {
    h(40);
    w(72);
    vm();
    border: 0;
    c(#333333);
    ft(30);
    text-c();
  }
}
</style>

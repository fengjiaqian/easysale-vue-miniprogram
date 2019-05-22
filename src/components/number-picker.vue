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
import { mapActions } from "vuex";
export default {
  name: "number-picker",
  props: {
    product: {
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
    ...mapActions(["saveCartCount"]),
    decrease(product) {
      const { minBuyNum, maxBuyNum } = product;
      if (product.buyCount <= minBuyNum) return false;
      product.buyCount--;
      updateItem(product, product.buyCount);
      this.saveCartCount();
    },
    increase(product) {
      const { minBuyNum, maxBuyNum } = product;
      if (product.buyCount >= maxBuyNum) return false;
      product.buyCount++;
      updateItem(product, product.buyCount);
      this.saveCartCount();
    },
    handleChange(product, $event) {
      let currentVal = parseInt($event.target.value) || 0;
      product.buyCount = currentVal ? currentVal : 1;
      updateItem(product, product.buyCount);
      this.saveCartCount();
    }
  }
};
</script>
<style lang="stylus">
.number-picker {
  span {
    inline();
    squ(50);
    vm();
  }

  .decrease {
    background: url('../assets/images/icon-decrease.png') no-repeat center;
    background-size: contain;

    &:after {
      content: '';
      block();
      width: 66px;
      height: 76px;
      position: absolute;
      right: 0;
      top: -15px;
    }
  }

  .increase {
    position: relative;
    background: url('../assets/images/icon-increase.png') no-repeat center;
    background-size: contain;

    &:after {
      content: '';
      block();
      width: 66px;
      height: 76px;
      position: absolute;
      left: 0;
      top: -15px;
    }
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

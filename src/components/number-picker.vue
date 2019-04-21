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
import Bus from "common/Bus";
import { mapGetters, mapActions } from "vuex";
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
      //if (product.buyCount <= minBuyNum) return false;
      //购物车是否删除此商品提示
      if (product.buyCount === 1 && this.isInCart()) {
        console.log("$emit deleteOneInCart");
        return Bus.$emit("deleteOneInCart", product.id);
      }
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
    },
    isInCart() {
      return this.$route.path === "/cart";
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

<template>
  <div
    class="float-cart float-icon"
    @click="enterCart"
    @touchstart="down($event)"
    @touchmove.prevent="move($event)"
    @touchend="end"
  >
    <span class="cart-count" v-show="count>0">{{cartCount}}</span>
  </div>
</template>

<script>
import mixin from "common/floatMixin";
import { getGoodsCount } from "common/goodsStorage";
import { mapGetters, mapActions } from "vuex";
export default {
  mixins: [mixin],
  data() {
    return {
      count: 8
    };
  },
  computed: {
    ...mapGetters(["cartCount"])
  },
  created() {},
  mounted() {},
  methods: {
    enterCart() {
      this.$router.push({ path: "/cart" });
    }
  }
};
</script>

<style lang="stylus">
.float-cart {
  position: fixed;
  left: 80%;
  top: 82%;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: url('../assets/images/icon-float-cart.png') center center no-repeat, #fff;
  background-size: 120% 120%;
  z-index: 50;
}

.cart-count {
  display: block;
  width: 40px;
  height: 40px;
  position: absolute;
  right: 0px;
  top: -6px !important;
  font-size: 22px;
  text-align: center;
  line-height: 40px;
  background: $color-theme;
  color: #fff;
  border-radius: 50%;
  transform: scale(0.8);
}

.float-icon :nth-of-type(1) {
  top: 70%;
}
</style>
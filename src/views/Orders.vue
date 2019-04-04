<template>
  <div id="orders">
    <product-cart v-for="i in 6"></product-cart>
    <!--  -->
    <div class="O-bottom">
      <span class="O-check-icon checked"></span>
      <!--  -->
      <a href="javascript:;" class="O-bottom-right">下单(2)</a>
      <div class="O-bottom-left">
        <span>全选</span>
        <span>合计¥398.00</span>
      </div>
    </div>
  </div>
</template>

<script>
import productCart from "components/product-cart.vue";
export default {
  components: {
    productCart
  }
};
</script>

<style lang="stylus">
#orders {
  pb(98 + 98);
}

.O-bottom {
  bg(#fff);
  width: 100%;
  h(98);
  pos(fixed);
  left: 0;
  bottom: 98px;
  pl(88);

  .O-check-icon {
    top: 29px;
  }
}

.O-bottom-left {
  mr(224);
  pr(16)
  h(98);
  ft(30)
  flex-center();
  justify-content: space-between;
}

.O-bottom-right {
  w(224);
  lh(98);
  frt();
  bg(#0096FF);
  ft(32);
  c(#fff);
  text-c();
}
</style>


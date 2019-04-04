<template>
  <div class="O-product-item clearfix">
    <span class="O-check-icon checked"></span>
    <div class="O-product-img">
      <img v-lazy alt>
    </div>
    <div class="O-product-content">
      <p class="name">茅台镇封藏镇封藏镇原浆酒茅台镇封藏镇封藏镇原浆酒V60V60</p>
      <div class="price">
        <div>
          <span class="c-yellow" v-html="$options.filters.price(398)"></span>
        </div>
        <number-picker></number-picker>
      </div>
    </div>
  </div>
</template>

<script>
import numberPicker from "./number-picker.vue";
export default {
  name: "product",
  components: {
    numberPicker
  },
  methods: {}
};
</script>

<style lang="stylus">
.O-check-icon {
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

.O-product-item {
  pos(relative);
  padding: 24px 0 0 88px;
  bg(#fff);
}

.O-product-img {
  squ(144);
  flt();
  bg(rgba(246, 246, 246, 1));

  img {
    width: 100%;
    heihgt: 100%;
  }
}

.O-product-content {
  pr(24);
  pb(24);
  ml(168);
  border-bottom: 1px solid #EDEDED;

  .name {
    pr(30)
    ft(32);
    c(#333);
    h(84)
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
    mt(16);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
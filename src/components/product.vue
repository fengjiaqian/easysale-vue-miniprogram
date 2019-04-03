<template>
  <div class="H-product-item clearfix">
    <div class="H-product-img">
      <img v-lazy alt>
    </div>
    <div class="H-product-content">
      <p class="name">茅台镇封藏镇封藏镇原浆酒V60</p>
      <div class="spec">规格 6瓶/件</div>
      <div class="price">
        <div>
          <span v-html="$options.filters.price(398)" class="c-yellow"></span>
        </div>
        <div>
          <div class="number-picker">
            <span class="decrease"></span>
            <input type="number" value="1"/>
            <span class="increase"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "product",
  methods: {}
};
</script>

<style lang="stylus">
.number-picker{
  span{
    inline()
    squ(40)
    vm()
  }
  .decrease{
    background: url('../assets/images/icon-decrease.png') no-repeat center;
    background-size contain
  } 
  .increase{
    background: url('../assets/images/icon-increase.png') no-repeat center;
    background-size contain
  } 
  input{
    h(40)
    w(72)
    vm()
    border 0
    text-c()
  }
}

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
    heihgt: 100%;
  }
}

.H-product-content {
  pr(24);
  ml(224);
  min-height: 224px;
  border-bottom: 1px solid #EDEDED;

  .name {
    ft(32);
    c(#333);
    line-height: 1.2;
  }

  .spec {
    mt(10);
    h(36);
    lh(36);
    ft(26);
    c(#999);
  }

  .price {
    h(48);
    mt(64);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
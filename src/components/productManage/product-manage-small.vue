<template>
  <div class="product-wrap">
    <div class="pw-l">
      <span></span>
    </div>
    <div class="pw-r">
      <div class="product-pic-small">
        <img v-lazy="''" >
      </div>
      <div class="product-info-small">
        <h5 class="name">洋河蓝色经典 梦之蓝M6 52度</h5>
        <div style="flex:1;"></div>
        <div class="spec">
          <span>规格 6瓶/件</span>
          <span class="price">¥398.00</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
  @import "./product-manage.styl"
</style>


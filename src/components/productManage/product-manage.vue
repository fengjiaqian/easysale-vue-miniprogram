<template>
  <div class="product-wrap">
    <div class="pw-l">
      <span></span>
    </div>
    <div class="pw-r">
      <div class="product-pic">
        <img v-lazy="''" >
      </div>
      <div class="product-info">
        <h5 class="name">洋河蓝色经典 梦之蓝M6 52度</h5>
        <div class="spec">
          <span>规格 6瓶/件</span>
          <span>销量 200件</span>
        </div>
        <div style="flex:1;"></div>
        <div class="price">¥398.00</div>
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


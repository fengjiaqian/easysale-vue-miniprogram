<template>
  <div>
    <ul class="user-info-wrap">
      <li>
        <div>店铺名称：</div>
        <div>18622421211</div>
      </li>
      <li class="mb-20">
        <div>联系电话：</div>
        <div>老王的店铺</div>
      </li>
      <li class="mb-20 uiw-info">
        <div>店铺介绍：</div>
        <div>我是一段商品介绍文字我是一段商品介 绍文字我是一段商品介绍文字我是一段 商品介绍文字我是一段商品介绍文字我 是一段商品介绍文字</div>
      </li>
      <li class="uiw-pic">
        <div>店铺图片：</div>
        <div>
          <img v-lazy="''" >
        </div>
      </li>
    </ul>
    <div class="user-info-edit">编辑</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
  @import "./stylus/user.styl"
</style>


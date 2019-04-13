<template>
  <div class="product-add-wrap">
    <div>
      <ul class="add-column">
        <li>
          <span>商品名称：</span>
          <input placeholder="请输入商品名称">
        </li>
        <li>
          <span>商品品牌：</span>
          <input placeholder="请输入商品品牌">
        </li>
        <li>
          <span>商品价格：</span>
          <input class="price" placeholder="请输入商品价格">
          <i>元</i>
        </li>
        <li>
          <span>规格单位：</span>
          <input placeholder="请输入规格单位，如瓶、件">
        </li>
        <li>
          <span>规格数量：</span>
          <input placeholder="请输入规格数量">
        </li>
      </ul>
      <div class="upload-pic-wrap">
        <span>商品图片</span>
        <ul></ul>
      </div>
      <div class="product-introduce">
        <span>商品介绍：</span>
        <textarea placeholder="请输入介绍文字"></textarea>
      </div>
    </div>
    <div class="confirm">确认</div>
  </div>
</template>

<script>

  export default {
    data() {
      return {

      };
    },
    components: {

    },
    computed: {

    },
    created() {

    },
    methods: {

    }
  };
</script>

<style lang="stylus" scoped>
  @import "stylus/productManage.styl"
</style>


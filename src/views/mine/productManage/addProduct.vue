<template>
  <div class="product-add-wrap">
    <div>
      <ul>
        <li>
          <label>商品名称：</label>
          <input placeholder="请输入商品名称">
        </li>
        <li>
          <label>商品品牌：</label>
          <input placeholder="请输入商品品牌">
        </li>
        <li>
          <label>商品价格：</label>
          <input placeholder="请输入商品价格">
        </li>
        <li>
          <label>规格单位：</label>
          <input placeholder="请输入规格单位，如瓶、件">
        </li>
        <li>
          <label>规格数量：</label>
          <input placeholder="请输入规格数量">
        </li>
      </ul>
      <div>
        <span>商品图片</span>
        <span></span>
      </div>
      <div>
        <span>商品介绍</span>
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
      productManage
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


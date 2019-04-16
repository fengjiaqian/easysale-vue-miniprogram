<template>
  <div class="product-import-wrap">
    <!--头部-->
    <section class="pi-header">
      <div class="search-bar">
        <input placeholder="请输入商品名称">
      </div>
    </section>

    <!--内容-->
    <section class="pi-content">
      <product-manage-small v-for="item in 12"></product-manage-small>
    </section>

    <!--底部-->
    <section class="pi-footer">
      <div class="f-select">
        <i></i><span>全选</span>
      </div>
      <div style="flex:1;"></div>
      <div class="import-btn">导入</div>
    </section>
  </div>
</template>

<script>
  import productManageSmall from "components/productManage/product-manage-small.vue";
  import { queryJyProduct } from "api/fetch/mine";
  export default {
    data() {
      return {

      };
    },
    components: {
      productManageSmall
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


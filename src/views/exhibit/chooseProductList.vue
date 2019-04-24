<template>
  <div class="product-wrap">
    <!--头部-->
    <section class="pi-header">
      <div class="search-bar">
        <input v-model="searchKey"
               placeholder="请输入商品名称"
               @change="handleChange($event)">
      </div>
    </section>

    <!--内容-->
    <section class="pi-content">
      <scroll
              class="product-list-scroll"
              :data="productList"
              :probeType="3"
              :pullup="true"
              @scrollToEnd="loadMoreProducts"
              ref="productScrollDom">
        <div>
          <product-manage v-for="(product,index) in productList" :key="product.productSpecificationId+index+product.productName"  :product="product"></product-manage>
        </div>
      </scroll>
    </section>

    <!--底部-->
    <section class="footer">
      <span>确定</span>
    </section>

  </div>
</template>

<script>
  import productManage from "components/productManage/product-manage.vue";
  import scroll from "components/scroll.vue";
  export default {
    data() {
      return {
        searchKey: '',//搜索关键字
        productList: [],
      };
    },
    components: {
      productManage,
      scroll
    },
    created() {

    },
    mounted() {},
    methods: {
      //搜索关键字查询
      handleChange($event){

      },
      loadMoreProducts() {

      },
    }
  };
</script>

<style lang="stylus" scoped>
  @import "./stylus/exhibit.styl"
</style>


<template>
  <div class="product-list-wrap">
    <!--头部-->
    <section class="header" :class="{'brand-head': brandFilterShow, 'state-head':stateFilterShow}">
      <div class="search-bar">
        <input placeholder="请输入商品名称">
      </div>
      <ul class="filter-bar">
        <li @click="unfoldFilterPop(0)">
          <span>全部品牌</span>
          <i></i>
        </li>
        <li @click="unfoldFilterPop(1)">
          <span>全部状态</span>
          <i></i>
        </li>
      </ul>
      <div class="column-wrap" v-if="brandFilterShow || stateFilterShow">
        <ul class="column-list" v-show="brandFilterShow">
          <li class="active">全部品牌</li>
          <li v-for="item in [1,2,3,4,5]">五粮液</li>
        </ul>
        <ul class="column-list" v-show="stateFilterShow">
          <li class="active">全部状态</li>
          <li>已上架</li>
          <li>已下架</li>
        </ul>
      </div>
    </section>

    <!--内容-->
    <section class="content">
      <product-manage v-for="product in productList" :key="product.id"  :product="product"></product-manage>
    </section>

    <!--底部-->
    <section class="footer">
      <div class="f-select">
        <i></i><span>全选</span>
      </div>
      <div class="f-oprate">
        <span class="button">删除</span>
        <span class="button">下架</span>
        <span class="button shelves">上架</span>
      </div>
    </section>

    <!--浮动添加按钮-->
    <section class="fixed-wrap">
      <div class="fixed-add" :class="{'trans-rotate': popAddShow}" @click="togglePopShow"></div>
      <div class="pop-up-layer" v-if="popAddShow">
        <span @click="skipTo('add')">添加自有商品</span>
        <span @click="skipTo('import')">从产品库导入商品</span>
      </div>
    </section>
    <!--遮罩层-->
    <div class="mask-layer" v-if="popAddShow || brandFilterShow || stateFilterShow"></div>
  </div>
</template>

<script>
  import productManage from "components/productManage/product-manage.vue";
  import { queryProductList, queryProductBrand } from "api/fetch/mine";
  export default {
    data() {
      return {
        popAddShow: false,
        brandFilterShow: false,
        stateFilterShow: false,
        filterParam: {
          dealerId: '19990530',
          brandId: '',
          pageNum: 1,
          pageSize: 20,
          searchKey: '',
          state: null
        },
        productList: [],//产品列表
        brandList: [],//品牌列表
      };
    },
    components: {
      productManage
    },
    computed: {

    },
    created() {
      this.queryProducts()
      this.initBrand()
    },
    methods: {
      //查询产品列表
      queryProducts(){
        queryProductList(this.filterParam).then(res => {
          if (res.result === "success" && res.data) {
            this.productList = res.data.dataList
          }
        });
      },
      //查询商品品牌
      initBrand(){
        let param = {
          dealerId: this.filterParam.dealerId
        }
        queryProductBrand(param).then(res => {
          if (res.result === "success" && res.data) {
            this.brandList = res.data
          }
        });
      },
      togglePopShow(){
        this.popAddShow = !this.popAddShow
      },
      unfoldFilterPop(type){
        if(type == 0){
          this.brandFilterShow = !this.brandFilterShow
          this.stateFilterShow = false
        }else{
          this.stateFilterShow = !this.stateFilterShow
          this.brandFilterShow = false
        }
      },
      skipTo(type){
        if(type == 'add') this.$router.push({ path: "/my/addProduct" });
        if(type == 'import') this.$router.push({ path: "/my/importProduct" });
      },
    }
  };
</script>

<style lang="stylus" scoped>
  @import "stylus/productManage.styl"
</style>


<template>
  <div class="product-import-wrap">
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
      <product-manage-small v-for="product in productList" :key="product.productSpecificationId"  :product="product"></product-manage-small>
    </section>

    <!--底部-->
    <section class="pi-footer">
      <div class="f-select" @click="allSelect">
        <i :class="{'selected':allSelected}"></i><span>全选</span>
      </div>
      <div style="flex:1;"></div>
      <div class="import-btn" @click="batchImport">导入</div>
    </section>
  </div>
</template>

<script>
  import productManageSmall from "components/productManage/product-manage-small.vue";
  import { queryJyProduct,addProduct } from "api/fetch/mine";
  export default {
    data() {
      return {
          requestDone: true,
          autoMoreData: false,
          domShow: false,
          filterParam: {
              productInfoName: '',
              brandName: '',
              pageNum: 1,
              pageSize: 20
          },//商品查询参数
          productList: [],//商品列表
          totalPage: 0,//商品数据总页数(最多只展示10页，即前200条数据)
          searchKey: '',
          dealerId: '19990530',//经销商id
          createUser: '465273',//用户id
          allSelected: false,//默认非全选
      };
    },
    components: {
      productManageSmall
    },
    beforeCreate () {
      document.getElementById('app').setAttribute('style', 'height:auto;')
    },
    beforeDestroy () {
      document.getElementById('app').removeAttribute('style')
    },
    computed: {

    },
    created() {
        this.queryProducts()
    },
    methods: {
        //查询产品列表
        queryProducts(){
            this.requestDone = false
            queryJyProduct(this.filterParam).then(res => {
                if (res.result === "success" && res.data) {
                    this.domShow = true
                    this.totalPage = Math.ceil(res.totalCount/20)
                    //当前加载的页码数大于等于最大页码数时，不在加载更多数据
                    if(this.filterParam.pageNum >= this.totalPage){
                        this.autoMoreData = false;
                    }else{
                        this.autoMoreData = true;
                    }
                    res.data.forEach((item)=>{
                        item.select = false
                    })
                    this.productList = this.productList.concat(res.data)
                    this.requestDone = true
                }
            }).catch(err => {
                this.autoMoreData = false
                this.requestDone = true
            })
            ;
        },
        //滑动底部加载更多
        scrollMore(){
            let that = this
            window.addEventListener('scroll',function(){
                let scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;
                let scrollHeight = document.body.scrollHeight;
                let windowHeight = document.documentElement.clientHeight;
                if(scrollTop + windowHeight >= scrollHeight && that.requestDone && that.autoMoreData) {
                    that.filterParam.pageNum += 1
                }
            })
        },
        //搜索关键字查询
        handleChange($event){
          this.filterParam.productInfoName = $event.target.value
          this.allSelected = false
          this.filterParam.pageNum = 1
          this.productList = []
        },
        //全选
        allSelect(){
          this.allSelected = !this.allSelected
          this.productList.forEach((item)=>{
            item.select = this.allSelected
          })
        },
        //批量导入商品
        batchImport(){
            let selectedProducts = []
            this.productList.forEach((product)=>{
                if(product.select) selectedProducts.push(product)
            })
            if(!selectedProducts.length){
              this.$alert(`请选中需要导入的商品！`)
              return
            }else if(selectedProducts.length > 20){
              this.$alert(`一次最多导入20个商品！`)
              return
            }
            let param = {
                dealerId: this.dealerId,
                createUser: this.createUser,
                productList: selectedProducts
            }
            addProduct(param).then(res => {
                if (res.result === "success") {
                  //商品添加成功后回到商品管理列表页
                  this.$toast("导入成功！");
                  this.$router.push({ path: "/my/productList" });
                }
            });
        },
    },
    watch: {
      filterParam: {
          handler(newVal, oldVal) {
              this.queryProducts()
          },
          deep: true
      },
      domShow: function(val) {
          if(val) {
              this.$nextTick(() => {
                  this.scrollMore()
              })
          }
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import "stylus/productManage.styl"
</style>


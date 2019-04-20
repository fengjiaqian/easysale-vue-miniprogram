<template>
  <div class="product-import-wrap ddfgrf">
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
    <section class="pi-footer">
      <div class="f-select" @click="allSelect">
        <i :class="{'selected':allSelected}"></i><span>全选</span>
      </div>
      <div style="flex:1;"></div>
      <div class="import-btn" @click="batchImport">导入</div>
    </section>

    <!--空页面友好提示-->
    <section class="empty-product" v-if="isEmpty">
      <i></i>
      <span>暂无商品数据~</span>
    </section>

  </div>
</template>

<script>
  import productManage from "components/productManage/product-manage.vue";
  import { queryJyProduct,addProduct } from "api/fetch/mine";
  import scroll from "components/scroll.vue";
  export default {
    data() {
      return {
          domShow: false,
          loading: false,
          requestDone: false,
          isEmpty: false,
          filterParam: {
              productInfoName: '',
              brandName: '',
              pageNum: 1,
              pageSize: 20
          },//商品查询参数
          productList: [],//商品列表
          totalPage: 0,//商品数据总页数(最多只展示10页，即前200条数据)
          searchKey: '',
          allSelected: false,//默认非全选
      };
    },
    components: {
      productManage,
      scroll
    },
    beforeCreate () {},
    beforeDestroy () {},
    computed: {},
    created() {
        this.queryProducts()
    },
    methods: {
        //查询产品列表
        queryProducts(){
            this.loading = true
            this.requestDone = false
            queryJyProduct(this.filterParam).then(res => {
                if (res.result === "success" && res.data) {
                    this.domShow = true
                    this.totalPage = Math.ceil(res.totalCount/20) > 10? 10 : Math.ceil(res.totalCount/20)
                    //当前加载的页码数大于等于最大页码数时，不在加载更多数据
                    res.data.forEach((item)=>{
                        item.select = false
                    })
                    this.productList = this.productList.concat(res.data)
                    this.loading = false
                    this.requestDone = true
                }
            }).catch(err => {
                this.loading = false
                this.requestDone = true
            })
            ;
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
                productList: selectedProducts
            }
            addProduct(param).then(res => {
                if (res.result === "success") {
                  //商品添加成功后回到商品管理列表页
                  this.$toast("导入成功！");
                  this.$router.push({ path: "/my/productList" });
                }
            }).catch((err)=>{
              this.$toast(err.message);
            });
        },
        loadMoreProducts() {
          if (this.loading || this.filterParam.pageNum >= this.totalPage) return false;
            this.filterParam.pageNum += 1
        },
    },
    watch: {
      filterParam: {
          handler(newVal, oldVal) {
              this.queryProducts()
          },
          deep: true
      },
      productList(val) {
        if (this.requestDone) {
          if(!val.length){
            this.isEmpty = true
          }else{
            this.isEmpty = false
          }
        }
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import "stylus/productManage.styl"
</style>


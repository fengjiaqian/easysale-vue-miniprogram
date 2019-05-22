<template>
  <div class="product-import-wrap">
    <!--头部-->
    <section class="pi-header">
      <div class="search-bar">
       	<div class="icon-back" @click.stop="goBack">
		      <span></span>
		    </div>
        <input v-model="searchKey"
          placeholder="请输入商品名称"
          >
      </div>
      <button class = "search_button" @click = "btnSearch">搜索</button>
      <!--<m-header :isSearch="true" placeholder="请输入商品名称" @emitEvt="searchList" >
      </m-header>-->
      <div class = "search_list" v-if = "isSearchName">
      	<template v-if = "searchProduct.length">
      		<p v-for = "item in searchProduct"  class = "search_p" @click = "searchByproductName(item.productName)">{{item.productName}}</p>
      	</template>
      	<template v-else>
      		<p class = "search_p">暂无数据</p>
  			</template>
      </div>
    </section>
    <!--内容-->
    <section class="pi-content">
    	<div class = "noproductTemp" v-if = "!searchProduct.length">
    		<p>请输入商品名称</p>
    	</div>
      <scroll
        class="product-list-scroll"
        :data="productList"
        :probeType="3"
        :pullup="true"
        @scrollToEnd="loadMoreProducts"
        ref="productScrollDom"
      >
        <div>
          <product-manage
            v-for="(product,index) in productList"
            :key="product.productSpecificationId+index+product.productName"
            :product="product"
          ></product-manage>
        </div>
      </scroll>
    </section>

    <!--底部-->
    <section class="pi-footer">
      <div class="f-select" @click="allSelect">
        <i :class="{'selected':allSelected}"></i>
        <span>全选</span>
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
import { queryJyProduct, addProduct } from "api/fetch/mine";
import scroll from "components/scroll.vue";
export default {
  data() {
    return {
      domShow: false,
      loading: false,
      requestDone: false,
      isEmpty: false,
      filterParam: {
        productInfoName: "",
        brandName: "",
        pageNum: 1,
        pageSize: 20
      }, //商品查询参数
      productList: [], //商品列表
      searchProduct:[],//搜索列表
      totalPage: 0, //商品数据总页数(最多只展示10页，即前200条数据)
      searchKey: "",
      allSelected: false, //默认非全选
      isSearchName:true,
      searchParam:{
      	productInfoName: "",
        pageNum: 1,
        pageSize: 10
      },
    };
  },
  components: {
    productManage,
    scroll
  },
  beforeCreate() {},
  beforeDestroy() {},
  computed: {},
  created() {
//  this.queryProducts();
  },
  methods: {
		goBack() {
      const { name } = this.$route;
      /*
       * TODO:
       *  1.地图定位后，点击返回上一页，手动返回到改页面的上一页面
       *  2.商品管理列表，客户管理列表，员工管理列表，返回我的页面
       * */
      let jumpPath = "";
      switch (name) {
        case "addCustomerInfo":
        case "editCustomerInfo":
          jumpPath = "/my/customerList";
          break;
        case "addStaffInfo":
        case "editStaffInfo":
          jumpPath = "/my/staffList";
          break;
        case "productList":
        case "myConsignee":
        case "staffList":
          jumpPath = "/navi/mine";
          break;
        case "updateConsignee":
          jumpPath = "/myConsignee";
          break;
        case "userInfoEdit":
          jumpPath = "/my/userInfo";
          break;
        case "customerList":
          //如果是从订单界面过来的  返回订单 带入信息
          if (storage.get("fromOrder", false)) {
            this.$router.go(-1);
          } else {
            jumpPath = "/navi/mine";
          }
          break;
        case "userInfo":
          jumpPath = "/navi/mine";
          break;
        case "writeApplicationInformation":
          if (storage.get("ApplyToLocation", false)) {
            jumpPath = "/navi/mine";
            storage.set("ApplyToLocation", false);
          } else {
            this.$router.go(-1);
          }
          break;
        case "dealerList":
          const currentDealerId = storage.get("currentDealerId", "");
          if (!currentDealerId) {
            this.$toast("请选择店铺");
          } else {
            this.$router.go(-1);
          }
          break;
        case "attestationForm":
          jumpPath = "/identity";
          break;
        case "identity":
          jumpPath = "/navi/home";
          break;
        default:
          this.$router.go(-1);
          break;
      }
      jumpPath && this.$router.push({ path: jumpPath });
    },
    //查询产品列表
    queryProducts() {
      this.loading = true;
      this.requestDone = false;
      queryJyProduct(this.filterParam)
        .then(res => {
          if (res.result === "success" && res.data) {
            this.domShow = true;
            this.totalPage =
              Math.ceil(res.totalCount / 20) > 10
                ? 10
                : Math.ceil(res.totalCount / 20);
            //当前加载的页码数大于等于最大页码数时，不在加载更多数据
            res.data.forEach(item => {
              item.select = false
              item.awardState = 0
              item.returnState = 0
              item.displayState = 0
            });
            this.productList = this.productList.concat(res.data);
            this.loading = false;
            this.requestDone = true;
          }else if(res.result === "success" && !res.data){
            this.requestDone = true;
            this.productList = []
            this.totalPage = 1
          }
        })
        .catch(err => {
          this.loading = false;
          this.requestDone = true;
        });
    },
    //搜索关键字查询
    btnSearch(){
    	this.isSearchName = false;
    	this.handleChange(this.searchKey)
    },
    handleChange(searchKey) {
    	if(this.filterParam.productInfoName == searchKey) return
      this.filterParam.productInfoName = searchKey;
      this.allSelected = false;
      this.filterParam.pageNum = 1;
      this.productList = [];
    },
    searchList(){
    	this.isSearchName = true;
    	this.searchParam.productInfoName = this.searchKey
    	queryJyProduct(this.searchParam).then(res=>{
    		if (res.result === "success" && res.data) {
    			res.data.forEach(item => {
	          item.select = false
	          item.awardState = 0
	          item.returnState = 0
	          item.displayState = 0
	        });
	    		this.searchProduct = res.data
        	this.loading = false;
        	this.requestDone = true;
    		}else if(res.result === "success" && !res.data){
	        this.searchProduct = []
	        this.loading = false;
	        this.requestDone = true;
      	}
    	})
    	.catch(err => {
	      this.loading = false;
	      this.requestDone = true;
    	});
    },
    searchByproductName(val){
      this.productList = this.searchProduct.filter(item => item.productName == val);
      this.isSearchName = false;
    },
    //全选
    allSelect() {
      this.allSelected = !this.allSelected;
      this.productList.forEach(item => {
        item.select = this.allSelected;
      });
    },
    //批量导入商品
    batchImport() {
      let selectedProducts = [];
      this.productList.forEach(product => {
        if (product.select) selectedProducts.push(product);
      });
      if (!selectedProducts.length) {
        this.$alert(`请选中需要导入的商品！`);
        return;
      } else if (selectedProducts.length > 20) {
        this.$alert(`一次最多导入20个商品！`);
        return;
      }
      let param = {
        productList: selectedProducts
      };
      addProduct(param)
        .then(res => {
          if (res.result === "success") {
            //商品添加成功后回到商品管理列表页
            this.$toast("导入成功！");
            this.$router.push({ path: "/my/productList" });
          }
        })
        .catch(err => {
          this.$toast(err.message);
        });
    },
    loadMoreProducts() {
      if (this.loading || this.filterParam.pageNum >= this.totalPage)
        return false;
      this.filterParam.pageNum += 1;
    },
    loadMoresearchByName(){
    	if (this.loading || this.searchParam.pageNum >= this.searchPage)
        return false;
      this.searchParam.pageNum += 1;
    }
  },
  watch: {
    filterParam: {
      handler(newVal, oldVal) {
        this.queryProducts();
      },
      deep: true
    },
    productList(val) {
      if (this.requestDone) {
        if (!val.length) {
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
        }
      }
    },
    searchKey(val){
    	setTimeout(this.searchList(),200)
    }
  }
};
</script>

<style lang="stylus" scoped>
@import 'stylus/productManage.styl';
</style>


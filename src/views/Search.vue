<template>
  <div id="search" class="pt90">
    <!--<m-header :isFixed="true" :isSearch="true" placeholder="搜索" @emitEvt="_searchKeyChange"></m-header>-->
    <section class="search-header">
	    <div class="search-bar">
	       	<div class="icon-back" @click.stop="goBack">
			      <span></span>
			    </div>
	        <input v-model="searchKey"
	          placeholder="请输入"
	        >
	  	</div>
	  	<button class = "search_button" @click = "_searchKeyChange">搜索</button>
		</section>
    <empty v-if="empty"></empty>
    <float-cart></float-cart>
    <div class="product-list-wrap">
      <cube-scroll
        ref="goodsScroll"
        class="product-list-scroll"
        :data="products"
        :options="options"
        @pulling-up="loadMoreProducts"
      >
        <product v-for="item in products" :product="item" :key="item.id"></product>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import { ListProduct } from "api/fetch/home";
import empty from "components/empty.vue";
import product from "components/product.vue";
import searchBar from "components/searchBar.vue";
import scroll from "components/scroll.vue";
import floatCart from "components/floatCart.vue";
import { transformProductList } from "common/productUtil";
import mHeader from "components/header.vue";
import { setTimeout } from "timers";
export default {
  name: "search",
  props: {},
  data() {
    return {
      products: [],
      empty: false,
      options: {
        click: true,
        probeType: 1,
        scrollbar: false,
        pullUpLoad: {
          txt: { more: "加载更多", noMore: "~我是有底线的~" }
        }
      },
      searchKey:"",
    };
  },
  components: {
    searchBar,
    product,
    scroll,
    floatCart,
    empty,
    mHeader
  },
  created() {
    this.params = {
      pageNum: 1,
      pageSize: 10,
      searchKey: null
    };
    this._listProduct(this.params);
  },
  mounted() {},
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
    _listProduct(params) {
      this.loading = true;
      ListProduct(params)
        .then(res => {
          if (res.result === "success" && res.data) {
            const { dataList = [], pager } = res.data;
            const { currentPage, totalPage } = pager;
            if (currentPage === 1) {
              this.products = transformProductList(dataList);
              this.totalPage = totalPage;
              this.empty = !this.products.length;
            } else {
              this.products = this.products.concat(
                transformProductList(dataList)
              );
            }
            this.params.pageNum++;
            this.loading = false;
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    loadMoreProducts() {
      if (this.loading || this.params.pageNum > this.totalPage) {
        this.$refs.goodsScroll.forceUpdate();
        return false;
      }
      this._listProduct(this.params);
    },
    _searchKeyChange() {
    	if(this.params.searchKey == this.searchKey) return
      this.params.searchKey = this.searchKey;
      this.params.pageNum = 1;
      this._doSearch();
    },
    _doSearch() {
      this._listProduct(this.params);
    }
  }
};
</script>

<style lang="stylus">
#search {
  width: 100%;
  height: 100%;
}

.product-list-wrap {
  height: 100%;
}

.product-list-scroll {
  height: 100%;
  overflow: hidden;

  .H-product-item:nth-last-of-type(1) .H-product-content {
    border: 0;
  }
}
.search-header{
	border-bottom:1PX solid #EDEDED;
	position:fixed;
	left:0;
	top:0;
	width:100%;
	background:#fff;
	z-index:1;
}
.search-bar{
	padding 14px 24px
}
.search-bar input{
	text-align:left;
	padding-left:10px;
	margin-left:1rem;
	flex-grow:0;
	width:80%;
	background: #f6f6f6;
}
.search_button{
	border:none;
	background:none;
	position:fixed;
	right:5%;
	top:0.7rem;
	padding:5px;
	display:inline-block;
}
</style>

<template>
  <div id="search" class="pt90">
    <m-header :isFixed="true" :isSearch="true" placeholder="搜索" @emitEvt="_searchKeyChange"></m-header>
    <!--<section class="search-header">
	    <div class="search-bar">
	       	<div class="icon-back" @click.stop="goBack">
			      <span></span>
			    </div>
	        <input v-model="searchKey"
	          placeholder="请输入"
	        >
	  	</div>
	  	<button class = "search_button" @click = "_searchKeyChange">搜索</button>
		</section>-->
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
    _searchKeyChange(searchKey) {
    	if(this.params.searchKey == searchKey) return
      this.params.searchKey = searchKey;
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

</style>

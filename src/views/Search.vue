<template>
  <div id="search">
    <empty v-if="empty"></empty>
    <float-cart></float-cart>
    <div class="search-area">
      <span class="btn" @click="_doSearch">搜索</span>
      <search-bar @emitEvt="_searchKeyChange" :emit="true"></search-bar>
    </div>
    <!--  -->
    <div class="product-list-wrap">
      <scroll
        class="product-list-scroll"
        :data="products"
        :probeType="3"
        :pullup="true"
        @scrollToEnd="loadMoreProducts"
        ref="productScrollDom"
      >
        <div>
          <product v-for="item in products" :product="item" :key="item.id"></product>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
let paramsData = {
  pageNum: 1,
  pageSize: 8,
  searchKey: null
};
import { ListProduct } from "api/fetch/home";
import empty from "components/empty.vue";
import product from "components/product.vue";
import searchBar from "components/searchBar.vue";
import scroll from "components/scroll.vue";
import floatCart from "components/floatCart.vue";
import { transformProductList } from "common/productUtil";
export default {
  name: "search",
  props: {},
  data() {
    return {
      products: [],
      empty: false
    };
  },
  components: {
    searchBar,
    product,
    scroll,
    floatCart,
    empty
  },
  created() {
    this.params = paramsData;
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
      if (this.loading || this.params.pageNum > this.totalPage) return false;
      this._listProduct(this.params);
    },
    _searchKeyChange(searchKey) {
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

.search-area {
  width: 100%;
  bg(#fff);
  pos(fixed);
  top: 0;
  left: 0;
  z-index: 200;

  .search-bar-wrap {
    pos(static);
    mr(129);
    width: auto;
    pr(0);
  }

  .btn {
    w(129);
    lh(92);
    block();
    frt();
    ft(30);
    c(#333);
    text-c();
  }
}

.product-list-wrap {
  height: 100%;
  pt(92);
}

.product-list-scroll {
  height: 100%;

  .H-product-item:nth-last-of-type(1) .H-product-content {
    border: 0;
  }
}
</style>

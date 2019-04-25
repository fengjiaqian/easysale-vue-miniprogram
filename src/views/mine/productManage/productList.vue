<template>
  <div class="product-list-wrap">
    <!--头部-->
    <section class="header" :class="{'brand-head': brandFilterShow, 'state-head':stateFilterShow}">
      <!-- <div class="search-bar">
        <input v-model="searchKey" placeholder="请输入商品名称" @change="handleChange($event)">
      </div>-->
      <m-header :isSearch="true" placeholder="请输入商品名称" @emitEvt="handleChange"></m-header>
      <ul class="filter-bar">
        <li @click="unfoldFilterPop(0)">
          <span>{{activeBrandName}}</span>
          <i></i>
        </li>
        <li @click="unfoldFilterPop(1)">
          <span>{{activeStateName}}</span>
          <i></i>
        </li>
      </ul>
      <div class="column-wrap" v-if="brandFilterShow || stateFilterShow">
        <ul class="column-list" v-show="brandFilterShow">
          <li
            v-for="(item,index) in brandList"
            :class="{active:index==activeBrandIdx}"
            :key="item.id"
            @click="filterBrand(item,index)"
          >{{item.brandName}}</li>
        </ul>
        <ul class="column-list" v-show="stateFilterShow">
          <li
            v-for="(item,index) in stateList"
            :class="{active:index==activeStateIdx}"
            :key="item.id"
            @click="filterState(item,index)"
          >{{item.title}}</li>
        </ul>
      </div>
    </section>

    <!--内容-->
    <section class="content">
      <scroll
        class="product-list-scroll"
        :data="productList"
        :probeType="3"
        :pullup="true"
        @scrollToEnd="loadMoreProducts"
        ref="productScrollDom"
      >
        <div class="list-column">
          <product-manage
            v-for="product in productList"
            :key="product.id+product.productName"
            :product="product"
          ></product-manage>
        </div>
      </scroll>
    </section>

    <!--底部-->
    <section class="footer">
      <div class="f-select" @click="allSelect">
        <i :class="{'selected':allSelected}"></i>
        <span>全选</span>
      </div>
      <div class="f-oprate">
        <span class="button" @click="optate('delete')">删除</span>
        <span class="button" @click="optate('soldout')" v-if="activeStateIdx!=2">下架</span>
        <span class="button shelves" v-if="activeStateIdx!=1" @click="optate('putaway')">上架</span>
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
    <div class="mask-layer" @click="reset" v-if="popAddShow || brandFilterShow || stateFilterShow"></div>

    <!--空页面友好提示-->
    <section class="empty-product" v-if="isEmpty">
      <i></i>
      <span>暂无商品数据~</span>
    </section>
  </div>
</template>

<script>
import productManage from "components/productManage/product-manage.vue";
import empty from "components/empty.vue";
import {
  queryProductList,
  queryProductBrand,
  oprateManageProduct
} from "api/fetch/mine";
import scroll from "components/scroll.vue";
export default {
  data() {
    return {
      popAddShow: false,
      brandFilterShow: false,
      stateFilterShow: false,
      domShow: false,
      loading: false,
      requestDone: false,
      isEmpty: false,
      totalPage: 0,
      filterParam: {
        brandId: "",
        pageNum: 1,
        pageSize: 20,
        searchKey: "",
        state: null
      }, //商品查询参数
      searchKey: "", //搜索关键字
      productList: [], //商品列表
      brandList: [], //商品品牌列表
      stateList: [
        {
          title: "全部状态",
          id: 0
        },
        {
          title: "已上架",
          id: 1
        },
        {
          title: "已下架",
          id: 2
        }
      ], //商品状态列表
      activeBrandIdx: 0, //默认选中的品牌索引
      activeBrandName: "全部品牌", //默认选中的品牌名称
      activeStateIdx: 0, //默认选中的状态索引
      activeStateName: "全部状态", //默认选中的状态名称
      allSelected: false, //默认非全选
      oprateParam: {
        idList: [],
        state: 0
      }, //商品操作查询参数
      resetFilter: false //重置查询请求
    };
  },
  components: {
    productManage,
    empty,
    scroll
  },
  beforeCreate() {},
  beforeDestroy() {},
  computed: {},
  created() {
    this.queryProducts();
    this.initBrand();
  },
  methods: {
    //查询产品列表
    queryProducts() {
      this.loading = true;
      this.requestDone = false;
      queryProductList(this.filterParam)
        .then(res => {
          if (res.result === "success" && res.data) {
            this.domShow = true;
            const { dataList = [], pager } = res.data;
            const { currentPage, totalPage } = pager;
            if (currentPage == 1) {
              this.totalPage = totalPage;
            }
            dataList.forEach(item => {
              item.select = false;
            });
            this.productList = this.productList.concat(dataList);
            this.loading = false;
            this.requestDone = true;
            this.resetFilter = false;
          }
        })
        .catch(err => {
          this.loading = false;
          this.requestDone = true;
          this.resetFilter = false;
        });
    },
    //查询商品品牌
    initBrand() {
      queryProductBrand({}).then(res => {
        if (res.result === "success" && res.data) {
          res.data.unshift({
            brandName: "全部品牌",
            id: "1"
          });
          this.brandList = res.data;
        }
      });
    },
    //根据品牌查询商品列表
    filterBrand(brand, idx) {
      if (idx == this.activeBrandIdx) {
        this.brandFilterShow = false;
        return;
      }
      this.activeBrandName = brand.brandName;
      this.activeBrandIdx = idx;
      this.filterParam.brandId = idx == 0 ? "" : brand.id;
      this.filterParam.pageNum = 1;
      this.brandFilterShow = false;
      this.allSelected = false;
      this.domShow = false;
      this.productList = [];
    },
    //根据状态查询商品列表
    filterState(item, idx) {
      if (idx == this.activeStateIdx) {
        this.stateFilterShow = false;
        return;
      }
      this.activeStateName = item.title;
      this.activeStateIdx = idx;
      this.filterParam.state = idx == 0 ? null : item.id;
      this.filterParam.pageNum = 1;
      this.stateFilterShow = false;
      this.allSelected = false;
      this.domShow = false;
      this.productList = [];
    },
    //全选
    allSelect() {
      this.allSelected = !this.allSelected;
      this.productList.forEach(item => {
        item.select = this.allSelected;
      });
    },
    /**
     * 商品操作
     * 操作类型type  delete：删除；soldout：下架；putaway：上架；
     **/
    optate(type) {
      //勾选中的商品id数组
      let selectedIds = [];
      this.productList.forEach(product => {
        if (product.select) selectedIds.push(product.id);
      });
      //没有勾选商品，直接return
      if (!selectedIds.length) {
        this.$toast("请勾选需要操作的商品！");
        return;
      }
      this.oprateParam.idList = selectedIds;
      switch (type) {
        case "delete":
          this.oprateParam.state = 0;
          break;
        case "soldout":
          this.oprateParam.state = 2;
          break;
        case "putaway":
          this.oprateParam.state = 1;
          break;
        default:
          break;
      }
      this.updateOprate();
    },
    //商品上下架及删除接口
    updateOprate() {
      oprateManageProduct(this.oprateParam).then(res => {
        if (res.result === "success") {
          this.$toast("操作成功");
          //操作成功后重新查询商品列表
          this.filterParam.brandId = "";
          this.filterParam.searchKey = "";
          this.filterParam.state = null;
          //删除后从列表移除删除的商品
          if (this.oprateParam.state == 0) {
            let products = this.productList;
            for (let id of this.oprateParam.idList) {
              for (let i in products) {
                if (id == products[i].id) {
                  products.splice(i, 1);
                  break;
                }
              }
            }
            this.productList = products;
          }
          //上下架后重新请求(恢复默认)
          else {
            this.resetRequest();
          }
        }
      });
    },
    resetRequest() {
      this.resetFilter = true;
      this.productList = [];
      this.activeBrandIdx = 0;
      this.activeBrandName = "全部品牌";
      this.activeStateIdx = 0;
      this.activeStateName = "全部状态";
      this.allSelected = false;
      this.filterParam.pageNum = 1;
      this.queryProducts();
    },
    handleChange(searchKey) {
      this.filterParam.searchKey = searchKey;
      this.allSelected = false;
      this.filterParam.pageNum = 1;
      this.productList = [];
      this.domShow = false;
    },
    togglePopShow() {
      this.popAddShow = !this.popAddShow;
    },
    unfoldFilterPop(type) {
      if (type == 0) {
        this.brandFilterShow = !this.brandFilterShow;
        this.stateFilterShow = false;
      } else {
        this.stateFilterShow = !this.stateFilterShow;
        this.brandFilterShow = false;
      }
    },
    reset() {
      this.popAddShow = false;
      this.brandFilterShow = false;
      this.stateFilterShow = false;
    },
    skipTo(type) {
      if (type == "add") this.$router.push({ path: "/my/addProduct" });
      if (type == "import") this.$router.push({ path: "/my/importProduct" });
    },
    //加载更多
    loadMoreProducts() {
      if (this.loading || this.filterParam.pageNum >= this.totalPage)
        return false;
      this.filterParam.pageNum += 1;
    }
  },
  watch: {
    filterParam: {
      handler(newVal, oldVal) {
        if (!this.resetFilter) {
          this.queryProducts();
        }
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
    }
  }
};
</script>

<style lang="stylus" scoped>
@import 'stylus/productManage.styl';
</style>


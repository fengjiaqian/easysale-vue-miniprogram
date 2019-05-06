<template>
  <div id="home" ref="scrollDom">
    <back v-show="posY>600" @bindClick="backTop"></back>
    <float-cart></float-cart>
    <!--  -->
    <div class="home-search-area">
      <div class="dealer-name" @click="_jumpDealerList">
        {{currentDealer.shopName}}
        <em></em>
      </div>
      <search-bar :jump="true"></search-bar>
    </div>
    <div class="view-wrapper">
      <!-- 定位导航 -->
      <div class="fixed-nav" v-show="showFixed">
        <div class="scroll-menu-wrap clearfix">
          <div
            class="s-m-btn"
            v-if="menuCanScroll"
            @click="showSqure=!showSqure"
            :class="{'active':showSqure}"
          ></div>
          <div class="scroll-menu-area">
            <scroll :probeType="1" :scrollX="true" :data="scrollMenu" ref="ScrollMenu2">
              <ul ref="scroll_menu_content2" class="scroll-menu-ul">
                <li
                  v-for="(menu, index) in scrollMenu"
                  :key="menu.brandId"
                  :id="'menu'+menu.brandId"
                >
                  <a
                    href="javascript:;"
                    class="c-3 fz30"
                    @click="bindClickMenu(index)"
                    :class="{'active':currentIndex == index}"
                  >{{menu.brandName}}</a>
                </li>
              </ul>
            </scroll>
          </div>

          <transition name="squre">
            <div class="nav-squre-list bg-w clearfix" v-show="showSqure">
              <div
                class="squre-item-wrap flt"
                v-for="(item, index) in scrollMenu"
                :key="item.brandId"
              >
                <div
                  class="squre-item"
                  @click="bindClickMenu(index)"
                  :class="{'squre-item-active':currentIndex == index}"
                >{{item.brandName}}</div>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <cube-scroll
        ref="scrollProduct"
        :data="scrollProducts"
        :options="options"
        @scroll="onScrollHandle"
        :scrollEvents="options.scrollEvents"
        @pulling-down="onPullingDown"
      >
        <main>
          <!--  -->
          <div class="home-banner" v-if="banners.length">
            <div class="slider-body">
              <slider :loop="loop" :data="banners" ref="slider_dom">
                <div class="banner-item" v-for="item in banners" :key="item.id">
                  <img :src="item.cloudSrc">
                </div>
              </slider>
            </div>
          </div>
          <!--  -->
          <ul class="home-icons clearfix">
            <li v-for="(item, index) in appIcons">
              <a @click="jumpSecondsort(index)">
                <img v-lazy="item.imgUrl || ''">
                <span>{{item.value}}</span>
              </a>
            </li>
          </ul>
          <!--  -->
          <div class="mune-wrapper" v-if="scrollMenu.length">
            <div class="scroll-menu-wrap clearfix" ref="scrollMenuWrap" v-show="!showFixed">
              <div
                class="s-m-btn"
                v-if="menuCanScroll"
                @click="showSqure=!showSqure"
                :class="{'active':showSqure}"
              ></div>
              <div class="scroll-menu-area">
                <scroll :probeType="1" :scrollX="true" :data="scrollMenu" ref="ScrollMenu">
                  <ul ref="scroll_menu_content" class="scroll-menu-ul">
                    <li
                      v-for="(menu, index) in scrollMenu"
                      :key="menu.brandId"
                      :id="'menu'+menu.brandId"
                    >
                      <a
                        href="javascript:;"
                        class="c-3 fz30"
                        @click="bindClickMenu(index)"
                        :class="{'active':currentIndex == index}"
                      >{{menu.brandName}}</a>
                    </li>
                  </ul>
                </scroll>
              </div>

              <transition name="squre">
                <div class="nav-squre-list bg-w clearfix" v-show="showSqure">
                  <div
                    class="squre-item-wrap flt"
                    v-for="(item, index) in scrollMenu"
                    :key="item.brandId"
                  >
                    <div
                      class="squre-item"
                      @click="bindClickMenu(index)"
                      :class="{'squre-item-active':currentIndex == index}"
                    >{{item.brandName}}</div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
          <!--  -->
          <div class="scroll-item" v-for="item in scrollProducts" :key="item.brandId">
            <div :id="'dom'+item.brandId" class="menu-title">
              <span>{{item.brandName}}</span>
            </div>
            <product v-for="product in item.products " :product="product" :key="product.id"></product>
          </div>
        </main>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import ic1 from "../assets/images/ic-tousu.png";
import ic2 from "../assets/images/ic-duijiang.png";
import ic3 from "../assets/images/ic-tuihuo.png";
import ic4 from "../assets/images/ic-chenglie.png";
import ic5 from "../assets/images/ic-kaidian.png";
const appIcons = [
  { imgUrl: ic1, value: "投诉" },
  { imgUrl: ic2, value: "兑奖" },
  { imgUrl: ic3, value: "退货" },
  { imgUrl: ic4, value: "陈列" },
  { imgUrl: ic5, value: "开店" }
];
import back from "components/back.vue";
import floatCart from "components/floatCart.vue";
import searchBar from "components/searchBar.vue";
import product from "components/product.vue";
import scroll from "components/scroll.vue";
import slider from "components/slider.vue";
import { queryHomeProducts, ListProduct, ListAllDealer } from "api/fetch/home";
import { ListDealerLogs } from "api/fetch/dealer";
import { addClass, removeClass } from "common/dom";
import { transformProductList } from "common/productUtil";
import storage from "common/storage";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "home",
  data() {
    return {
      showFixed: false,
      loop: true,
      appIcons: appIcons,
      showSqure: false,
      menuCanScroll: false,
      scrollMenu: [],
      scrollProducts: [],
      banners: [],
      posY: 0,
      currentDealer: {},
      options: {
        click: true,
        probeType: 1,
        scrollbar: false,
        pullDownRefresh: {
          threshold: 70,
          txt: "刷新成功"
        },
        scrollEvents: ["scroll", "scroll-end"]
      }
    };
  },
  components: {
    searchBar,
    scroll,
    product,
    floatCart,
    slider,
    back
  },
  beforeCreate() {},
  computed: {
    currentIndex() {
      var h = this.posY,
        arr = this.heightList || [];
      for (var j = 0, len = arr.length; j < len; j++) {
        var h1 = arr[j],
          h2 = arr[j + 1];
        if ((h >= h1 && h < h2) || !h2) {
          return j;
        }
      }
      return 0;
    }
  },
  activated() {
    this.saveCartCount();
    if (storage.get("homeRefresh", false)) {
      this.currentDealerId = storage.get("currentDealerId", "");
      this._ListCurrentDealer();
      this.$refs.scrollProduct && this.$refs.scrollProduct.scrollTo(0, 0);
      this._listDealerLogs();
      this._queryHomeProducts();
    } else {
      this.scrollProducts.forEach(item => {
        item.products = transformProductList(item.products);
      });
    }
    storage.set("homeRefresh", false);
  },
  created() {
    this._initAuth(); //该步骤有判断有没有带入shareDealerId,有则缓存currentDealerId
    this.currentDealerId = storage.get("currentDealerId", "");
    if (!this.currentDealerId) {
      //如果没有currentDealerId的话，跳转选择经销商。
      return this.$router.push({
        path: "/dealerList"
      });
    }
    //页头显示经销商名称
    this._ListCurrentDealer();
    this._listDealerLogs();
    this._queryHomeProducts();
  },
  mounted() {},
  methods: {
    ...mapActions(["saveCartCount"]),
    //初始化auth
    _initAuth() {
      const {
        nickName,
        avatarUrl,
        mobileNo,
        token,
        userType,
        shareDealerId
      } = this.$route.query;
      //shareDealerId currentDealerId 即 shopId
      // 以登录身份访问
      if (mobileNo && token && userType) {
        this.clearStorage(); //清楚部分缓存
        storage.set("mobileNo", mobileNo);
        storage.set("token", token);
        storage.set("userType", userType);
        shareDealerId && storage.set("currentDealerId", shareDealerId);
        this.userType = userType;
        return false;
      }
      //只有nickName和avatarUrl, cache for mine page。  以终端访客身份访问
      if (nickName && avatarUrl) {
        this.clearStorage(); //清楚部分缓存
        storage.remove("token");
        storage.remove("userType");
        storage.remove("currentDealerId");
        storage.set("nickName", decodeURIComponent(nickName));
        storage.set("avatarUrl", decodeURIComponent(avatarUrl));
        shareDealerId && storage.set("currentDealerId", shareDealerId);
        this.userType = 3;
      }
    },
    clearStorage() {
      var keys = [
        "homeRefresh",
        "mineRefresh",
        "orderRefresh",
        "currentDealer",
        "fromOrder",
        "orderPrequeryParams",
        "orderExtraParams"
      ];
      for (let key of keys) {
        storage.remove(key);
      }
    },
    _listDealerLogs() {
      ListDealerLogs()
        .then(res => {
          this.banners = res.data;
          this.loop = this.banners.length > 1;
        })
        .catch(_ => {});
    },
    //
    _ListCurrentDealer() {
      //第一次 切换 申请后 三种情况
      const storeDealer = storage.get("currentDealer", {});
      ListAllDealer({ id: this.currentDealerId }).then(res => {
        const { dataList = [] } = res.data;
        // dataList.length && (this.currentDealer = dataList[0]);
        if (dataList.length) {
          const matchItem = dataList.find(
            item => item.id == this.currentDealerId
          );
          this.currentDealer = matchItem;
        }
      });
    },
    _queryHomeProducts() {
      queryHomeProducts().then(res => {
        if (res.result === "success" && res.data) {
          const { menu, brands } = this.calculateHomeDisplayData(res.data);
          this.scrollMenu = menu;
          this.scrollProducts = brands;
          if (!this.scrollMenu.length) {
            // const msg =
            //   this.userType == 3
            //     ? "当前经销商暂无商品,请重新选择经销商"
            //     : "您的店铺暂无上架商品,请尽快添加";
            return this.$toast("当前经销商暂无商品");
          }
          this.$nextTick(() => {
            this.calculateScrollRect();
            setTimeout(() => {
              this.calculateHeightList();
            }, 1000);
          });
        }
      });
    },
    //计算 scroll-menu 的scroll_menu_content 的宽度
    calculateScrollRect() {
      const clientWidth =
        document.body.clientWidth || document.documentElement.clientWidth;
      const els = this.$refs.scroll_menu_content.children;
      let w = 0;
      for (let el of Array.prototype.slice.call(els)) {
        w += el.getBoundingClientRect().width;
      }
      this.$refs.scroll_menu_content.style.width = w + "px";
      //todo
      this.$refs.scroll_menu_content2 &&
        (this.$refs.scroll_menu_content2.style.width = w + "px");
      //判断menu是否能滑动
      this.menuCanScroll = w > clientWidth - (clientWidth * 88) / 750;
    },
    bindClickMenu(Index) {
      if (this.posY == 0) {
        this.firstClick = true;
      }
      this.showSqure = false;
      // let domId = "dom" + this.scrollMenu[Index].brandId;
      // this.$refs.scrollProduct.scrollToElement(
      //   document.getElementById(domId),
      //   150
      // );
      //
      this.$refs.scrollProduct.scrollTo(0, -this.heightList[Index] - 1, 150);
      Index = Index > 2 ? Index - 2 : 0;
      let menuId = "menu" + this.scrollMenu[Index].brandId;

      const thisScroll = this.showFixed
        ? this.$refs.ScrollMenu2
        : this.$refs.ScrollMenu;
      //
      thisScroll &&
        thisScroll.scrollToElement(document.getElementById(menuId), 150);
    },
    /***
     *处理首页展示数据
     */
    calculateHomeDisplayData(response) {
      const { brands = [], products = [] } = response;
      for (let brand of brands) {
        brand.products = transformProductList(
          products.filter(product => product.brandId == brand.brandId)
        );
      }
      const menu = brands.map(item => ({
        brandId: item.brandId,
        brandName: item.brandName
      }));
      return { menu, brands };
    },
    // scroll-items
    calculateHeightList() {
      var target = this.$refs.scrollMenuWrap;
      this.menuHeight = target.getBoundingClientRect().height;
      let h = target.offsetTop;
      let heightList = [h];
      const els = document.querySelectorAll(".scroll-item");
      for (let el of Array.prototype.slice.call(els)) {
        h += el.clientHeight;
        heightList.push(h);
      }
      this.heightList = heightList;
    },
    onScrollHandle(pos) {
      this.posY = Math.abs(pos.y);
      !this.heightList && (this.heightList = [220]);
      if (pos.y < 0 && this.posY > this.heightList[0]) {
        this.showFixed = true;
      } else {
        this.showFixed = false;
      }
      if (this.firstClick) {
        this.showFixed = true;
        this.firstClick = false;
      }
    },
    onPullingDown() {
      this._queryHomeProducts();
    },
    backTop() {
      this.$refs.scrollProduct.scrollTo(0, 0, 150);
    },
    _jumpDealerList() {
      this.$router.push({
        name: "dealerList",
        query: {
          id: this.currentDealer.id
        }
      });
    },
    jumpSecondsort(Index) {
      var jumpPath = "",
        query = {};
      switch (Index) {
        case 3:
          if (this.userType == 1) {
            jumpPath = "/exhibitList";
          } else if (this.userType == 2) {
            jumpPath = "/saleSignExhibitList";
          } else {
            jumpPath = "/displayList";
          }
          break;
        case 0:
          jumpPath = "/complaintHomepage";
          break;
        case 1:
          jumpPath = "/redemptionHomepage";
          break;
        case 2:
          jumpPath = "/returnHomepage";
          break;
        case 4:
          if (!this.navigateToLogin()) {
            jumpPath = "/writeApplicationInformation";
            query = {
              mobileNo: storage.get("mobileNo", "")
            };
          }
          break;
        default:
          break;
      }
      jumpPath && this.$router.push({ path: jumpPath, query });
    }
  }
};
</script>

<style lang="stylus">
.scroll-item {
  .H-product-item:nth-last-of-type(1) {
    .H-product-content {
      border: 0;
    }
  }
}

.view-wrapper {
  width: 100%;
  height: 100%;
  pos(relative);
  top: 0;
  left: 0;
}

.fixed-nav {
  width: 100%;
  h(88);
  pos(absolute);
  top: 0;
  left: 0;
  z-index: 2;
}

.mune-wrapper {
  h(88);
  bg(#fff);
}

.menu-title {
  height: 78px;
  line-height: 78px;
  background: #f6f6f6;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-title span {
  margin: 0 24px;
  color: #333;
  font-size: 30px;
}

.menu-title:after {
  content: '';
  width: 80px;
  height: 2px;
  background: rgba(229, 229, 229, 1);
}

.menu-title:before {
  content: '';
  width: 80px;
  height: 2px;
  background: rgba(229, 229, 229, 1);
}

/* ** */
.fixed-dealer {
  position: fixed !important;
  top: 92px;
  z-index: 10;
}

.fixed-customer {
  position: fixed !important;
  top: 174px;
  z-index: 10;
}

#home {
  pt(92);
  pb(98);
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

.home-banner {
  bg(#fff);
  padding: 0 24px;

  .slider-body {
    position: relative;
    overflow: hidden;

    .banner-item {
      width: 100%;
      h(250);

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.top82 {
  top: 82px;
}

.pt174 {
  padding-top: 174px !important;
}

.select-dealer {
  pos(fixed);
  top: 0;
  left: 0;
  width: 100%;
  h(82);
  padding: 0 24px;
  bg(#fff);
  z-index: 100;

  .left {
    flt();
    h(82);
    pr(24);

    img {
      inline();
      squ(60);
    }

    strong {
      ml(16);
      mr(8);
      c(#333);
      ft(32);
      lh(82);
    }

    em {
      inline();
      squ(32);
      background: url('./../assets/images/ic_xiajiantou.png') no-repeat center center #FFF;
      transform: rotateZ(-90deg);
      background-size: contain;
    }

    * {
      vm();
    }
  }
}

.home-icons {
  mb(20);
  background: #fff;
  width: 100%;
  padding-bottom: 32px;
  flex();

  li {
    flex-1();

    > a {
      display: block;
      margin-top: 32px;

      > img {
        margin: 0 auto;
        display: block;
        margin-bottom: 16px;
        width: 88px;
        height: 88px;
      }

      > span {
        text-align: center;
        display: block;
        font-size: 28px;
        color: #333;
      }
    }
  }
}

.scroll-menu-wrap {
  pos(relative);
  width: 100%;
  h(88);
  bg(#fff);
  border-bottom: 1PX solid rgba(0, 0, 0, 0.1);

  .scroll-menu-area {
    mr(88);
    white-space: nowrap;
  }

  .s-m-btn {
    float: right;
    width: 88px;
    height: 88px;
    position: relative;
    z-index: 1;
    box-shadow: -1PX 0px 4px 0px rgba(0, 0, 0, 0.1);
    background: url('./../assets/images/ic_xiajiantou.png') no-repeat center center #FFF;
    background-size: 42px 42px;
    transition: all 0.2s;

    &.active {
      transform: rotate(-180deg);
    }
  }
}

.scroll-menu-ul {
  height: 88px;

  li {
    display: inline-block;
    padding: 0 24px;
    height: 88px;

    a {
      float: left;
      display: inline-block;
      line-height: 83px;
      text-align: center;

      &.active {
        border-bottom: 2PX solid #E53935;
      }
    }
  }
}

.nav-squre-list {
  width: 100%;
  padding: 8px;
  position: absolute;
  top: 88px;
  left: 0;
  z-index: 5;

  .squre-item-wrap {
    padding: 8px;
    width: 25%;

    .squre-item {
      height: 72px;
      line-height: 72px;
      font-size: 30px;
      color: #666;
      border-radius: 2px;
      border: 1PX solid rgba(189, 189, 189, 1);
      text-align: center;

      &.active {
        color: #E53935;
        border: 1PX solid #E53935;
      }
    }

    .squre-item-active {
      color: #E53935;
      border: 1PX solid #E53935;
    }
  }

  &.squre-enter-active, &.squre-leave-active {
    transition: all 0.2s;
  }
}

.home-search-area {
  width: 100%;
  bg(#fff);
  pos(fixed);
  top: 0;
  left: 0;
  z-index: 200;

  .search-bar-wrap {
    pos(static);
    width: auto;
  }

  .dealer-name {
    pos(relative);
    w(200);
    lh(92);
    mr(-24);
    pl(24);
    pr(32);
    flt();
    ft(26);
    c(#333);
    text-c();
    omit();

    em {
      block();
      pos(absolute);
      top: 30px;
      right: 0;
      squ(32);
      background: url('./../assets/images/ic_xiajiantou.png') no-repeat center center #FFF;
      transform: rotateZ(-90deg);
      background-size: contain;
      vm();
    }
  }
}

.cube-pulldown-loaded span {
  ft(12);
}
</style>


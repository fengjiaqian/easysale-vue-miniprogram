<template>
  <div id="home" ref="scrollDom" :class="{'pt174': userType==3}">
    <float-cart></float-cart>
    <!--  -->
    <div class="home-banner" v-if="banners.length">
      <div class="slider-body">
        <slider :loop="true" :data="banners" ref="slider_dom">
          <div class="banner-item" v-for="item in banners" :key="item.id">
            <img :src="item.cloudSrc" alt>
          </div>
        </slider>
      </div>
    </div>
    <!--  -->
    <div class="select-dealer" v-if="userType==3">
      <div class="left" @click="_jumpDealerList">
        <img v-lazy="currentDealer.logoIamgeUrl" alt>
        <strong>{{currentDealer.shopName}}</strong>
        <em></em>
      </div>
    </div>
    <search-bar :jump="true" :class="{'top82': userType==3}"></search-bar>
    <!--  -->
    <ul class="home-icons clearfix">
      <li v-for="item in appIcons">
        <a @click="jumpSecondsort(item)">
          <img v-lazy="item.imgUrl || ''">
          <span>{{item.value}}</span>
        </a>
      </li>
    </ul>
    <!--  -->
    <div class="scroll-menu-wrap clearfix" ref="scrollMenuWrap" v-if="scrollMenu.length">
      <div
        class="s-m-btn"
        v-if="menuCanScroll"
        @click="showSqure=!showSqure"
        :class="{'active':showSqure}"
      ></div>
      <div class="scroll-menu-area">
        <scroll :probeType="1" :scrollX="true" :data="scrollMenu" ref="ScrollMenu">
          <ul ref="scroll_menu_content" class="scroll-menu-ul">
            <li v-for="(menu, index) in scrollMenu" :key="menu.brandId" :id="'menu'+menu.brandId">
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
          <div class="squre-item-wrap flt" v-for="(item, index) in scrollMenu" :key="item.brandId">
            <div
              class="squre-item"
              @click="bindClickMenu(index)"
              :class="{'squre-item-active':currentIndex == index}"
            >{{item.brandName}}</div>
          </div>
        </div>
      </transition>
    </div>
    <!--  -->
    <div style="height:680px;">
      <scroll
        ref="scrollProduct"
        :click="true"
        :probeType="3"
        :data="scrollProducts"
        :listenScroll="true"
        @scroll="listenScroll"
        class="scroll-products"
      >
        <div class="home-product-list">
          <div class="scroll-item" v-for="item in scrollProducts" :key="item.brandId">
            <div :id="'dom'+item.brandId"></div>
            <product v-for="product in item.products " :product="product" :key="product.id"></product>
          </div>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import icBanner from "../assets/images/ic-banner.png";
import ic1 from "../assets/images/ic-tousu.png";
import ic2 from "../assets/images/ic-duijiang.png";
import ic3 from "../assets/images/ic-tuihuo.png";
import ic4 from "../assets/images/ic-chenglie.png";

const appIcons = [
  { imgUrl: ic1, value: "投诉管理" },
  { imgUrl: ic2, value: "兑奖管理" },
  { imgUrl: ic3, value: "退货管理" },
  { imgUrl: ic4, value: "陈列管理" }
];
import floatCart from "components/floatCart.vue";
import searchBar from "components/searchBar.vue";
import product from "components/product.vue";
import scroll from "components/scroll.vue";
import slider from "components/slider.vue";
import { queryHomeProducts, ListProduct } from "api/fetch/home";
import { ListDealerLogs } from "api/fetch/dealer";
import { addClass, removeClass } from "common/dom";
import { transformProductList } from "common/productUtil";
import storage from "common/storage";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "home",
  data() {
    return {
      loop: true,
      appIcons: appIcons,
      showSqure: false,
      menuCanScroll: false,
      scrollMenu: [],
      scrollProducts: [],
      banners: [],
      posY: 0,
      heightList: [],
      currentDealer: storage.get("currentDealer", {})
    };
  },
  components: {
    searchBar,
    scroll,
    product,
    floatCart,
    slider
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
      this.currentDealer = storage.get("currentDealer", {});
      this._listDealerLogs();
      this._queryHomeProducts();
      storage.set("homeRefresh", false);
    } else {
      this.scrollProducts.forEach(item => {
        item.products = transformProductList(item.products);
      });
    }
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
      // 以登录身份访问
      if (mobileNo && token && userType) {
        storage.set("mobileNo", mobileNo);
        storage.set("token", token);
        storage.set("userType", userType);
        shareDealerId && storage.set("currentDealerId", shareDealerId);
        this.userType = userType;
        return false;
      }
      //只有nickName和avatarUrl, cache for mine page。 以终端访客身份访问
      if (nickName && avatarUrl) {
        storage.remove("token");
        storage.remove("userType");
        storage.remove("currentDealerId");
        storage.set("nickName", decodeURIComponent(nickName));
        storage.set("avatarUrl", decodeURIComponent(avatarUrl));
        shareDealerId && storage.set("currentDealerId", shareDealerId);
      }
    },
    _listDealerLogs() {
      ListDealerLogs().then(res => {
        this.banners = res.data;
        this.loop = this.banners.length > 1;
      });
    },
    _queryHomeProducts() {
      queryHomeProducts().then(res => {
        if (res.result === "success" && res.data) {
          const { menu, brands } = this.calculateHomeDisplayData(res.data);
          this.scrollMenu = menu;
          this.scrollProducts = brands;
          if (!this.scrollMenu.length) {
            const msg =
              this.userType == 3
                ? "当前经销商暂无商品,请重新选择经销商"
                : "您的店铺暂无上架商品,请尽快添加";
            return this.$toast(msg);
          }
          this.$nextTick(() => {
            this.calculateScrollRect();
            this.calculateScrollProductHeight();
            this.calculateHeightList();
            this.watchScroll();
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
      //判断menu是否能滑动
      this.menuCanScroll = w > clientWidth - (clientWidth * 88) / 750;
    },
    //计算 scroll-product 的高度
    calculateScrollProductHeight() {
      const clientWidth =
        document.body.clientWidth || document.documentElement.clientWidth;
      const clientHeight =
        document.body.clientHeight || document.documentElement.clientHeight;
      const height = clientHeight - (clientWidth * 98 + 90 + 88) / 750;
      // this.$refs.scrollProduct.$el.style.height = height + "px";
    },
    bindClickMenu(Index) {
      this.showSqure = false;
      let domId = "dom" + this.scrollMenu[Index].brandId;
      this.$refs.scrollProduct.scrollToElement(
        document.getElementById(domId),
        150
      );
      Index = Index > 2 ? Index - 2 : 0;
      let menuId = "menu" + this.scrollMenu[Index].brandId;
      this.$refs.ScrollMenu.scrollToElement(
        document.getElementById(menuId),
        150
      );
    },
    watchScroll() {
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
          return setTimeout(callback, 17);
        };
      }
      const clientWidth =
        document.body.clientWidth || document.documentElement.clientWidth;
      var last_known_scroll_position = 0,
        ticking = false;
      var d = this.userType == 3 ? 174 : 92;
      this.distance =
        this.$refs.scrollMenuWrap.offsetTop - (clientWidth * d) / 750;

      this.$refs.scrollDom.addEventListener("scroll", e => {
        last_known_scroll_position = this.$refs.scrollDom.scrollTop;
        if (!ticking) {
          window.requestAnimationFrame(() => {
            var cls = this.userType == 3 ? "fixed-customer" : "fixed-dealer";
            if (last_known_scroll_position > Math.abs(this.distance)) {
              addClass(this.$refs.scrollMenuWrap, cls);
            } else {
              removeClass(this.$refs.scrollMenuWrap, cls);
            }
            ticking = false;
          });
        }
        ticking = true;
      });
    },
    scrollSmoothTo(el, position) {
      var distance = el.scrollTop;
      if (distance <= position) {
        return false;
      }
      var step = function() {
        // 距离目标滚动距离
        distance -= 200;
        if (Math.abs(distance) < position) {
          el.scrollTop = position;
        } else {
          el.scrollTop = distance;
          window.requestAnimationFrame(step);
        }
      };
      step();
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
    // scroll-item
    calculateHeightList() {
      let h = 0,
        heightList = [0];
      const els = document.querySelectorAll(".scroll-item");
      for (let el of Array.prototype.slice.call(els)) {
        h += el.clientHeight;
        heightList.push(h);
      }
      console.log(heightList);
      this.heightList = heightList;
    },
    listenScroll(pos) {
      this.posY = Math.abs(pos.y);
    },
    _jumpDealerList() {
      this.$router.push({
        name: "dealerList",
        query: {
          id: this.currentDealer.id
        }
      });
    },
    jumpSecondsort(item) {}
  }
};
</script>

<style lang="stylus">
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

  li {
    width: 25%;
    float: left;

    >a {
      display: block;
      margin-top: 32px;

      >img {
        margin: 0 auto;
        display: block;
        margin-bottom: 16px;
        width: 88px;
        height: 88px;
      }

      >span {
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

.home-product-list {
  // .H-product-item {
  // &:nth-last-of-type(1) {
  // .H-product-content {
  // border: 0;
  // }
  // }
  // }
}

.scroll-products {
  height: 100%;
  overflow: hidden;
}
</style>


<template>
  <div id="home" ref="scrollDom" :class="{'pt174': userType===3}">
    <float-cart></float-cart>
    <!--  -->
    <div class="select-dealer" v-if="userType===3">
      <div class="left">
        <img v-lazy="''" alt>
        <strong>某某商贸公司</strong>
        <em></em>
      </div>
      <div class="right">
        <em></em>
        <span>分享</span>
      </div>
    </div>
    <search-bar :jump="true" :class="{'top82': userType===3}"></search-bar>
    <!--  -->
    <ul class="home-icons clearfix">
      <li v-for="item in [1,2,3,4]">
        <a @click="jumpSecondsort(item)">
          <img v-lazy="item.imgUrl || ''">
          <span>陈列</span>
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
            <li v-for="menu in scrollMenu" :key="menu.brandId" :id="'menu'+menu.brandId">
              <a
                href="javascript:;"
                class="c-3 fz30"
                @click="bindClickMenu(menu.brandId)"
                :class="{'active':currentColumnId == menu.brandId}"
              >{{menu.brandName}}</a>
            </li>
          </ul>
        </scroll>
      </div>

      <transition name="squre">
        <div class="nav-squre-list bg-w clearfix" v-show="showSqure">
          <div class="squre-item-wrap flt" v-for="item in scrollMenu" :key="item.brandId">
            <div
              class="squre-item"
              @click="bindClickMenu(item.brandId,true)"
              :class="{'squre-item-active':currentColumnId === item.brandId}"
            >{{item.brandName}}</div>
          </div>
        </div>
      </transition>
    </div>
    <!--  -->
    <div class="home-product-list">
      <product v-for="item in productList" :product="item" :key="item.id"></product>
    </div>
  </div>
</template>

<script>
import floatCart from "components/floatCart.vue";
import searchBar from "components/searchBar.vue";
import product from "components/product.vue";
import scroll from "components/scroll.vue";
import { queryHomeProducts, ListProduct } from "api/fetch/home";
import { addClass, removeClass } from "common/dom";
import { transformProductList } from "common/productUtil";
import storage from "common/storage";
export default {
  name: "home",
  data() {
    return {
      appIcons: [],
      productList: [],
      currentColumnId: "",
      showSqure: false,
      menuCanScroll: false,
      scrollMenu: [],
      currentColumnPorducts: []
    };
  },
  components: {
    searchBar,
    scroll,
    product,
    floatCart
  },
  beforeCreate() {
    const { nickName, avatarUrl } = this.$route.query;
    if (nickName && avatarUrl) {
      storage.set("nickName", decodeURIComponent(nickName));
      storage.set("avatarUrl", decodeURIComponent(avatarUrl));
    }
  },
  computed: {},
  created() {
    queryHomeProducts(19990530).then(res => {
      if (res.result === "success" && res.data) {
        this.scrollMenu = res.data.brands;
        this.scrollMenu.length &&
          (this.currentColumnId = this.scrollMenu[0].brandId);
        this.productList = transformProductList(res.data.products);
        //
        this.scrollMenu[0].products = this.productList;
        this.$nextTick(() => {
          this.calculateScrollRect();
          this.watchScroll();
        });
      }
    });
  },
  mounted() {},
  methods: {
    jumpSecondsort(item) {},
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
    bindClickMenu(id) {
      this.showSqure = false;
      this.currentColumnId = id;
      this.menuScrollToEl(id);
      //匹配
      let matchItem = this.scrollMenu.find(item => id == item.brandId);
      if (matchItem.products) {
        this.productList = matchItem.products;
        return true;
      }
      // const Index = this.productColumns.findIndex(
      //   item => this.currentColumnId == item.columnId
      // );
      // if (Index != -1 && this.productColumns[Index].products) {
      //   this.currentColumnPorducts = transformList(
      //     this.productColumns[Index].products,
      //     getAllGoods()
      //   );
      //   this.$nextTick(() => {
      //     this.scrollSmoothTo(this.$refs.scrollDom, this.distance);
      //   });
      //   return false;
      // }
      //如果没有产品则需查询
      const params = {
        dealerId: "19990530",
        brandId: id,
        pageSize: 10
      };
      ListProduct(params).then(res => {
        if (res.result === "success" && res.data) {
          this.productList = transformProductList(res.data.dataList);
          matchItem.products = this.productList;
          // this.currentColumnPorducts = transformList(res.data, getAllGoods());
          // this.productColumns[Index].products = this.currentColumnPorducts;
          // this.$nextTick(() => {
          //   this.scrollSmoothTo(this.$refs.scrollDom, this.distance);
          // });
        }
      });
    },
    menuScrollToEl(id) {
      let Index = this.scrollMenu.findIndex(item => item.brandId == id);
      Index = Index > 2 ? Index - 2 : 0;
      let domId = "menu" + this.scrollMenu[Index].brandId;
      this.$refs.ScrollMenu.scrollToElement(
        document.getElementById(domId),
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
      var d = this.userType === 3 ? 174 : 92;
      this.distance =
        this.$refs.scrollMenuWrap.offsetTop - (clientWidth * d) / 750;

      this.$refs.scrollDom.addEventListener("scroll", e => {
        last_known_scroll_position = this.$refs.scrollDom.scrollTop;
        if (!ticking) {
          window.requestAnimationFrame(() => {
            var cls = this.userType === 3 ? "fixed-customer" : "fixed-dealer";
            if (last_known_scroll_position > this.distance) {
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
    }
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

  .right {
    frt();

    em {
      inline();
      squ(48);
      mr(8);
      vm();
      background: url('./../assets/images/icon-share.png') no-repeat center center #FFF;
      background-size: cover;
    }

    span {
      vm();
      ft(28);
      c(#666);
      lh(82);
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
        font-size: 26px;
        color: #666;
      }
    }
  }
}

.scroll-menu-wrap {
  pos(relative);
  width: 100%;
  h(88);
  bg(#fff);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

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
    box-shadow: -1px 0px 4px 0px rgba(0, 0, 0, 0.1);
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
      border: 1px solid rgba(189, 189, 189, 1);
      text-align: center;

      &.active {
        color: #E53935;
        border: 1px solid #E53935;
      }
    }

    .squre-item-active {
      color: #E53935;
      border: 1px solid #E53935;
    }
  }

  &.squre-enter-active, &.squre-leave-active {
    transition: all 0.2s;
  }
}

.home-product-list {
  .H-product-item {
    &:nth-last-of-type(1) {
      .H-product-content {
        border: 0;
      }
    }
  }
}
</style>


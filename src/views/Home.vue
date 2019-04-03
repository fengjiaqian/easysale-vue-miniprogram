<template>
  <div id="home">
    <search-bar></search-bar>
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
            <li v-for="menu in scrollMenu" :key="menu.columnId" :id="'menu'+menu.columnId">
              <a
                href="javascript:;"
                class="c-3 fz30"
                @click="bindClickMenu(menu.columnId)"
                :class="{'active':currentColumnId == menu.columnId}"
              >{{menu.columnName}}</a>
            </li>
          </ul>
        </scroll>
      </div>

      <transition name="squre">
        <div class="nav-squre-list bg-w clearfix" v-show="showSqure">
          <div class="squre-item-wrap flt" v-for="item in scrollMenu" :key="item.columnId">
            <div
              class="squre-item"
              @click="bindClickMenu(item.columnId,true)"
              :class="{'squre-item-active':currentColumnId === item.columnId}"
            >{{item.columnName}}</div>
          </div>
        </div>
      </transition>
    </div>
    <!--  -->
    <div class="home-product-list">
        <product v-for="i in 2"></product>
    </div>
  </div>
</template>

<script>
import searchBar from "components/searchBar.vue";
import product from "components/product.vue";
import scroll from "components/scroll.vue";
import {home_scroll_menu} from './mock'
export default {
  name: "home",
  data() {
    return {
      appIcons: [],
      productList: [],
      currentColumnId: "",
      showSqure: false,
      menuCanScroll: true,
      scrollMenu: home_scroll_menu,
      currentColumnPorducts: []
    };
  },
  components: {
    searchBar,
    scroll,
    product
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    jumpSecondsort(item) {}
  }
};
</script>

<style lang="stylus">
#home {
  pt(92);
  pb(98);
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

.home-icons {
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
</style>


<template>
  <div class="m-header" ref="mHeaderDom">
    <div class="icon-back" @click.stop="goBack">
      <span></span>
    </div>
    <!--  -->
    <div class="center-area">
       <!-- <div class="title">{{title}}</div> -->
       <slot></slot>
    </div>
    <!-- slot -->
    <div class="icon-shortcut" @click.stop="showShortcutList">
      <span></span>
    </div>
    <!--  -->
    <ul class="shortcut-list" v-show="show">
      <li class="shortcut-item">
        <router-link to="/navi/home">
          <span></span>
          <strong>首页</strong>
        </router-link>
      </li>
      <li class="shortcut-item">
        <router-link to="/navi/orders">
          <span></span>
          <strong>订单</strong>
        </router-link>
      </li>
      <li class="shortcut-item">
        <router-link to="/navi/mine">
          <span></span>
          <strong>我的</strong>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
/***
 *
 *
 */
import { addClass, removeClass } from "common/dom";
export default {
  name: "m-header",
  data() {
    return {
      show: false,
      title: document.title || ""
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.watchScroll();
  },
  methods: {
    goBack() {
      const { name } = this.$route;
      /*
       * TODO:
       *  1.地图定位后，点击返回上一页，手动返回到改页面的上一页面
       *  2.商品管理列表，客户管理列表，员工管理列表，返回我的页面
       * */
      switch (name) {
        case "addCustomerInfo":
          this.$router.push({ path: "/my/customerList" });
          break;
        case "addStaffInfo":
          this.$router.push({ path: "/my/staffList" });
        case "productList":
        case "staffList":
        case "customerList":
        case "userInfo":
          this.$router.push({ path: "/navi/mine" });
          break;
        default:
          this.$router.go(-1);
      }
    },
    showShortcutList() {
      this.show = !this.show;
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
      var distance = (clientWidth * 90) / 750;

      const scrollDom = document.querySelector("#app");//
      scrollDom.addEventListener("scroll", e => {
        this.show = false;
        last_known_scroll_position = scrollDom.scrollTop;
        if (!ticking) {
          window.requestAnimationFrame(() => {
            if (last_known_scroll_position > Math.abs(distance)) {
              addClass(this.$refs.mHeaderDom, "header-fixed");
            } else {
              removeClass(this.$refs.mHeaderDom, "header-fixed");
            }
            ticking = false;
          });
        }
        ticking = true;
      });
    }
  }
};
</script>

<style lang="stylus">
.m-header {
  width: 100%;
  h(90);
  bg(#fff);
  pos(relative);
  border-bottom: 1px solid #e5e5e5;
}

.header-fixed {
  pos(fixed);
}

.icon-back {
  position: absolute;
  w(88);
  h(88);
  top: 0;
  left: 0;

  span {
    block();
    squ(44);
    margin: 22px auto 0;
    background: url('../assets/images/icon-header-back.png') no-repeat 50%;
    background-position: 0 0;
    background-size: contain;
  }
}

.icon-shortcut {
  overflow: hidden;
  position: absolute;
  w(88);
  h(88);
  top: 0;
  right: 0;

  span {
    block();
    squ(44);
    margin: 44px auto 0;
    background: url('../assets/images/icon-header-point.png') no-repeat 50%;
    background-position: 0 0;
    background-size: contain;
  }
}

.center-area {
  width: 100%;
  padding: 0 88px;

  .title {
    lh(90);
    ft(32);
    c(#333);
    text-c();
  }
}

.shortcut-list {
  position: fixed;
  top: 110px;
  right: 24px;
  z-index: 1000;
  border-radius: 8px;
  width: 200px;
  background: rgba(0, 0, 0, 0.9);

  &:after {
    position: absolute;
    top: -10px;
    right: 10px;
    width: 21px;
    height: 10px;
    background: url('../assets/images/icon-sanjiao.png') no-repeat;
    background-size: 100% 100%;
    content: '';
  }
}

.shortcut-item {
  display: block;
  position: relative;
  margin-left: 80px;
  border-bottom: 1px solid hsla(0, 0%, 100%, 0.2);
  height: 80px;
  line-height: 80px;
  z-index: 1000;

  a {
    display: block;
    border: 0;
    width: 100%;
    font-size: 28px;
    color: #fff;
    z-index: 1000;
    text-decoration: none;
  }

  span {
    position: absolute;
    top: 0;
    left: -80px;
    width: 80px;
    height: 80px;
    background: url('../assets/images/ic-shoucurt-home.png') no-repeat center;
    background-size: 40% 40%;
  }
}
</style>
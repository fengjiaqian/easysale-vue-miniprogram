<template>
  <div class="m-header" ref="mHeaderDom" :style="fixedStyleObj">
    <div class="icon-back" @click.stop="goBack">
      <span></span>
    </div>
    <!--  -->
    <div class="center-area">
      <div class="search-bar" v-if="isSearch">
        <span class="s-b-l"></span>
        <input
          type="search"
          :value="searchKey"
          :placeholder="placeholder"
          @change="handleChange($event)"
        >
      </div>
      <div class="title" v-else>{{tit || title || ''}}</div>
    </div>
    <!--  -->
    <div class="icon-shortcut" @click.stop="showShortList" ref="shortcut">
      <span></span>
    </div>
    <!--  -->
    <ul class="shortcut-list" v-show="show">
      <li class="shortcut-item">
        <router-link to="/navi/home">
          <span class="shortcut-item-ic-home"></span>
          <strong>首页</strong>
        </router-link>
      </li>
      <li class="shortcut-item">
        <router-link to="/navi/orders">
          <span class="shortcut-item-ic-orders"></span>
          <strong>订单</strong>
        </router-link>
      </li>
      <li class="shortcut-item">
        <router-link to="/navi/mine">
          <span class="shortcut-item-ic-mine"></span>
          <strong>我的</strong>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import storage from "common/storage";
export default {
  name: "m-header",
  props: {
    //是否带搜索bar
    isSearch: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ""
    },
    //是否需要定位在顶部
    isFixed: {
      type: Boolean,
      default: false
    },
    //传入的title
    tit: {
      type: String,
      default: ""
    }
  },
  data() {
    var fixedStyleObj = {};
    if (this.isFixed) {
      fixedStyleObj = {
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000
      };
    }
    return {
      show: false,
      searchKey: "",
      fixedStyleObj: fixedStyleObj
    };
  },
  computed: {},
  created() {},
  mounted() {
    document.body.addEventListener("click", e => {
      const el = this.$refs.shortcut;
      if (e.target !== el) {
        this.show = false;
      }
    });
  },
  destroyed() {},
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
          jumpPath = "/my/customerList";
          break;
        case "addStaffInfo":
          jumpPath = "/my/staffList";
          break;
        case "productList":
          jumpPath = "/navi/mine";
          break;
        case "staffList":
          jumpPath = "/navi/mine";
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
          jumpPath = "/navi/mine";
          break;
        case "dealerList":
          const currentDealerId = storage.get("currentDealerId", "");
          if (!currentDealerId) {
            this.$toast("请选择店铺");
          } else {
            this.$router.go(-1);
          }
          break;
        default:
          this.$router.go(-1);
          break;
      }
      jumpPath && this.$router.push({ path: jumpPath });
    },
    showShortList() {
      if (!storage.get("currentDealerId", "")) return false;
      this.show = !this.show;
    },
    handleChange($event) {
      this.searchKey = $event.target.value;
      this.$emit("emitEvt", this.searchKey);
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
  border-bottom: 1PX solid #e5e5e5;
}

.icon-back {
  position: absolute;
  w(50);
  h(50);
  top: 0;
  left: 10px;

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
  h(90);
  padding: 15px 100px 0;
  bg(#fff);

  .title {
    ft(38);
    fb();
    c(#333);
    text-c();
  }
}

.shortcut-list {
  position: fixed;
  top: 90px;
  right: 24px;
  z-index: 1000;
  border-radius: 8px;
  width: 152px;
  background: rgba(0, 0, 0, 0.6);

  &:after {
    position: absolute;
    top: -20px;
    right: 20px;
    width: 42px;
    height: 20px;
    background: url('../assets/images/icon-sanjiao.png') no-repeat;
    background-size: 100% 100%;
    content: '';
  }
}

.shortcut-item {
  display: block;
  position: relative;
  margin-left: 80px;
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

    &.shortcut-item-ic-home {
      background: url('../assets/images/ic-shoucurt-home.png') no-repeat center;
      background-size: 50% 50%;
    }

    &.shortcut-item-ic-orders {
      background: url('../assets/images/ic-shoucurt-orders.png') no-repeat center;
      background-size: 50% 50%;
    }

    &.shortcut-item-ic-mine {
      background: url('../assets/images/ic-shoucurt-mine.png') no-repeat center;
      background-size: 50% 50%;
    }
  }
}

.search-bar {
  flex-1();
  display: flex;
  align-items: center;
  border: 1PX solid #ededed;
  radius(8);
  background: #f2f2f2;
  overflow: hidden;

  .s-b-l {
    display: inline-block;
    squ(33);
    margin: 0 16px;
    background: url('../assets/images/ic_sousuo@2x.png') no-repeat center;
    background-size: contain;
  }

  input {
    flex-1();
    border: 0;
    height: 56px;
    line-height: 56px;
    font-size: 26px;
    color: #333;
    background: #f2f2f2;
    outline: none;
  }
}
</style>

<template>
  <div class="ios-scroll-smooth">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="tab-container">
      <router-link tag="div" class="tab-item" to="/navi/home">
        <a class="tab-home" href="javascript:;"></a>
        <span>首页</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/navi/orders">
        <a class="tab-order" href="javascript:;"></a>
        <span>订单</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/navi/mine">
        <a class="tab-mine" href="javascript:;"></a>
        <span>我的</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import storage from "common/storage";
export default {
  name: "tab",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang='stylus'>

.ios-scroll-smooth {
  width: 100%;
  height: 100%;
  -webkit-overflow-scrolling: touch;
}

.tab-container {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 900;
  width: 100%;
  height: 98px;
  background-color: #FFFFFF;
  display: flex;
  border-top: 1PX solid rgba(0, 0, 0, 0.1);
}
@supports (bottom: env(safe-area-inset-bottom)) {
  .tab-container{
    padding-bottom: env(safe-area-inset-bottom);
  }
}

.tab-item {
  flex-1();
  padding: 3px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;

  >a {
    block();
    squ(50);
    background-size: contain;
  }

  >span {
    line-height: 1.2;
    ft(22);
    c(#999);
  }

  .tab-home {
    background-image: url('./../assets/images/icon-shouye.png');
  }

  .tab-mine {
    background-image: url('./../assets/images/icon-mine.png');
  }

  .tab-order {
    background-image: url('./../assets/images/icon-orders.png');
  }

  &.router-link-active {
    span {
      c(#FF5638);
    }

    .tab-home {
      background-image: url('./../assets/images/icon-shouye-active.png');
    }

    .tab-mine {
      background-image: url('./../assets/images/icon-mine-active.png');
    }

    .tab-order {
      background-image: url('./../assets/images/icon-orders-active.png');
    }
  }
}
</style>
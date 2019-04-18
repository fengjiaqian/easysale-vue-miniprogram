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
      <div class="tab-item" @click="_jumpMine">
        <a class="tab-mine" href="javascript:;"></a>
        <span>我的</span>
      </div>
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
  mounted() {
    this.userType = storage.get("userType", "3");
  },
  methods: {
    _jumpMine() {
      switch (this.userType) {
        case "1":
          this.$router.push({ path: "/navi/mine" });
          break;
        case "2":
          this.$router.push({ path: "/navi/mineSales" });
          break;
        case "3":
          this.$router.push({ path: "/navi/mineClient" });
          this._routeMineActive();
          break;
        default:
          break;
      }
    },
    _routeMineActive() {
      const els = document.querySelectorAll(".tab-item");
      const el = els[els.length - 1];
      console.log(el);
    }
  }
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
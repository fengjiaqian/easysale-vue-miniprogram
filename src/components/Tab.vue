<template>
  <div class="ios-scroll-smooth">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <div class="tab-container" :class="{'isIphoneX':isIphoneX}" >
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
  import Vue from 'vue'
  export default {
    name: "tab",
    data() {
      return {

        isIphoneX:this.isIphoneX,
      };
    },
    created() {
      // this.checkIpx()
    },
    mounted() {
    },
    methods: {
      // checkIpx(){
      //   var u = navigator.userAgent;
      //   var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      //   if (isIOS) {
      //     if (screen.height == 812 && screen.width == 375) {
      //       //是iphoneX
      //       Vue.prototype.isIphoneX = true;
      //     }
      //   }
      // }
    }
  }
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
    /*height: 98px;*/
    background-color: #FFFFFF;
    display: flex;
    border-top: 1PX solid rgba(0, 0, 0, 0.1);
  }

  .tab-container.isIphoneX{
    padding-bottom 34px;
  }


  .tab-item {
    flex-1();
    padding: 3px 0;
    height: 98px;
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
      block();
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
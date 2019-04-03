<style lang="stylus">
.wc-fade-enter {
  opacity: 0;
}

.wc-fade-enter-active, .wc-fade-leave-active {
  transition: opacity 0.4s;
}

.wc-fade-leave-active {
  opacity: 0;
}

.wx-alert__mask {
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999998;
}

.wx-alert__popup {
  position: absolute;
  z-index: 999999;
  width: 80%;
  max-width: 460px;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #FFFFFF;
  text-align: center;
  border-radius: 6px;
  overflow: hidden;
}

.wx-dialog__hd {
  padding: 32px 0 48px;
}

.wx-dialog__title {
  font-weight: 400;
  font-size: 32px;
  color: #333333;
}

.wx-dialog__bd {
  padding: 0 23px 48px;
  min-height: 80px;
  font-size: 30px;
  line-height: 1.2;
  word-wrap: break-word;
  word-break: break-all;
  color: #333;
}

.wx-dialog__ft {
  position: relative;
  line-height: 88px;
  font-size: 32px;
  display: flex;
}

.wx-dialog__btn {
  width: 100%;
  align-items: center;
  color: #E53935;
  text-decoration: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  position: relative;
}

.wx-dialog__ft:after {
  content: ' ';
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid #D5D5D6;
  color: #D5D5D6;
  transform-origin: 0 0;
  transform: scaleY(0.5);
}
</style>
<template>
  <transition name="wc-fade">
    <div class="wx-alert__mask" v-if="show">
      <div class="wx-alert__popup">
        <div class="wx-dialog__hd">
          <strong class="wx-dialog__title">{{"提示"}}</strong>
        </div>
        <div class="wx-dialog__bd">{{content}}</div>
        <div class="wx-dialog__ft">
          <a
            href="javascript:;"
            class="wx-dialog__btn wx-dialog__btn_primary"
            @click.stop="success"
          >{{"确定"}}</a>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import preventPageScroll from "./utils/prevent-page-scroll";
export default {
  data() {
    return {
      show: false,
      duration: 3,
      imgStyle: {},
      imgUrl: "",
      showDuration: false,
      title: "",
      content: "",
      yesText: "",
      noText: "",
      noCls: "",
      yesCls: ""
    };
  },
  mounted() {
    preventPageScroll.prevent();
  },
  methods: {
    success() {
      this.show = false;
    },
    fail() {
      this.show = false;
    }
  }
};
</script>
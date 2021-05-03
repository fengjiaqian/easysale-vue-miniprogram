<style scoped lang='stylus'>
.weui-mask {
  position: fixed;
  z-index: 999998;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}

.weui-dialog {
  position: absolute;
  z-index: 999999;
  width: 80%;
  max-width: 460px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #FFFFFF;
  text-align: center;
  border-radius: 6px;
  overflow: hidden;
}

.weui-dialog__hd {
  padding: 32px 0 48px;
}

.weui-dialog__hd.with-no-content {
  padding-top: 32px 0 48px;
}

.weui-dialog__title {
  font-weight: 400;
  font-size: 32px;
  color: #333333;
}

.weui-dialog__bd {
  padding: 0 32px 48px;
  min-height: 80px;
  font-size: 30px;
  line-height: 1.2;
  word-wrap: break-word;
  word-break: break-all;
  color: #333;
}

.weui-dialog__bd:first-child {
  padding: 40px 20px 32px;
  color: #353535;
}

.weui-dialog__ft {
  position: relative;
  line-height: 88px;
  font-size: 30px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}

.weui-dialog__ft:after {
  content: ' ';
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1PX;
  border-top: 1PX solid #D5D5D6;
  color: #D5D5D6;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

.weui-dialog__btn {
  display: block;
  text-align:center;
  width:50%;
  color: #E53935;
  text-decoration: none;
  text-align: center;
  width: 50%;

  &:nth-last-of-type(1) {
    border-left: 1PX solid #D5D5D6;
  }
}

.weui-dialog__btn:active {
  background-color: #EEEEEE;
}

.weui-dialog__btn:after {
  content: ' ';
  position: absolute;
  left: 0;
  top: 0;
  width: 1PX;
  bottom: 0;
  border-left: 1PX solid #D5D5D6;
  color: #D5D5D6;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  -webkit-transform: scaleX(0.5);
  transform: scaleX(0.5);
}

.weui-dialog__btn:first-child:after {
  display: none;
}

.weui-dialog__btn_default {
  color: #333;
}
</style>
<template>
  <div class="weui-mask" v-if="show">
    <div class="weui-dialog">
      <div class="weui-dialog__hd">
        <strong class="weui-dialog__title">{{"提示"}}</strong>
      </div>
      <div class="weui-dialog__bd">
        <p style="text-align: center;" v-html="content"></p>
      </div>
      <div class="weui-dialog__ft">
        <a
          href="javascript:;"
          class="weui-dialog__btn weui-dialog__btn_default"
          @click.stop="fail"
        >{{"取消"}}</a>
        <a
          href="javascript:;"
          class="weui-dialog__btn weui-dialog__btn_primary"
          @click.stop="success"
        >{{"确定"}}</a>
      </div>
    </div>
  </div>
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
      preventPageScroll.recover();
      this.show = false;
    },
    fail() {
      preventPageScroll.recover();
      this.show = false;
    }
  }
};
</script>
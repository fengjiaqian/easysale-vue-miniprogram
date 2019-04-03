<template>
  <div ref="wrapper">
  	 <slot></slot>
  	<div class='pull-down-tip' v-show='pulldown && data.length' v-text="pullDownTip" ref='downTip'></div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from "better-scroll";

export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    scrollX: {
      type: Boolean,
      default: false
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: null
    },
    pulldown: {
      //下拉刷新
      type: Boolean,
      default: false
    },
    pullup: {
      //上拉更多
      type: Boolean,
      default: false
    },
    autoLoad: {
      //自动加载
      type: Boolean,
      default: false
    },
    beforeScroll: {
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 40
    }
  },
  data() {
    return {
      pullDownTip: ""
    };
  },
  created() {
    this.refreshIng = false;
  },
  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 40);
  },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.scrollX,
        preventDefaultException: {tagName: /^(INPUT|TEXTAREA)$/}
      });
      if (this.listenScroll || this.pulldown) {
        let me = this;
        this.scroll.on("scroll", pos => {
          if (this.listenScroll) {
            me.$emit("scroll", pos);
          }
          if (this.pulldown) {
            if (pos.y >= 60) {
              this.pullDownTip = "释放立即刷新...";
            } else {
              if (this.refreshIng) {
                this.pullDownTip = "刷新中...";
              } else {
                this.pullDownTip = "下拉刷新";
              }
            }
            if (pos.y < 0) {
              this.pullDownTip = "";
            }
            if (pos.y > 0) {
              let translateY = Math.min(Math.round(pos.y / 2), 30);
              this.$refs.downTip.style[
                "transform"
              ] = `translate3d(0,${translateY}px,0)`;
            }
          }
        });
      }
      if (this.pullup) {
        this.scroll.on("scrollEnd", () => {
          if (
            this.scroll.y < -10 &&
            this.scroll.y <= this.scroll.maxScrollY + 60
          ) {
            this.$emit("scrollToEnd");
          }
        });
      }
      if (this.pulldown) {
        this.scroll.on("touchEnd", pos => {
          if (pos.y >= 60) {
            this.pullDownTip = "刷新中...";
            this.refreshIng = true;
            this.$emit("scrollToTop");
          }
        });
      }
      if (this.autoLoad) {
        this.scroll.on("scroll", pos => {
          if (
            this.scroll.movingDirectionY === 1 &&
            pos.y < this.scroll.maxScrollY + 500 &&
            pos.y > this.scroll.maxScrollY + 400
          ) {
            console.log("autoLoad");
            this.$emit("autoLoad");
          }
        });
      }
      if (this.beforeScroll) {
        this.scroll.on("beforeScrollStart", () => {
          this.$emit("beforeScroll");
        });
      }
    },
    disable() {
      this.scroll && this.scroll.disable();
    },
    enable() {
      this.scroll && this.scroll.enable();
    },
    refresh() {
      this.refreshIng = false;
      this.pullDownTip = "下拉刷新";
      this.$refs.downTip.style["transform"] = `translate3d(0,0,0)`;
      this.scroll && this.scroll.refresh();
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    },
    scrollToElement() {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this.refresh();
      }, this.refreshDelay);
    }
  }
};
</script>

<style scoped lang="stylus">
.pull-down-tip {
  position: absolute;
  width: 100%;
  height: 44px;
  line-height: 44px;
  font-size: 30px;
  color: #666;
  text-align: center;
  top: 88px;
  z-index: 1;
}
</style>

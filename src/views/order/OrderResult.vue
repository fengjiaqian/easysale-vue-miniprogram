<template>
  <div id="orderResult">
    <div class="order-result">
      <img :src="imgSrc" alt>
      <div class="state">{{text}}</div>
      <p class="fail-reason" v-if="failReason">{{failReason}}</p>
      <div class="actions">
        <a href="javascript:;" class="btn" @click="_jump(1)">返回首页</a>
        <a href="javascript:;" class="btn" @click="_jump(3)" v-if="failReason!='ok'">重新提交</a>
        <a href="javascript:;" class="btn" @click="_jump(2)" v-else>查看订单</a>
      </div>
    </div>
  </div>
</template>

<script>
import successImg from "@/assets/images/icon-success.png";
import failImg from "@/assets/images/icon-fail.png";
export default {
  name: "order-result",
  data() {
    return {
      failReason: "",
      imgSrc: successImg,
      text: "支付成功"
    };
  },
  created() {
    this.failReason = this.$route.query.passData || "";
    if (this.failReason !== "ok") {
      this.imgSrc = failImg;
      this.text = "支付失败";
    }

    /*let that = this;
    setTimeout(() => {
      that.$submitTalkingData();
    }, 1000);*/
  },

  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.$createTalkingData("Order", "", {}, 1);
  //   });
  // },
  // beforeRouteLeave(to, from, next) {
  //   this.$createTalkingData("Order", "", {}, 2);
  //   next();
  // },

  mounted() {},
  methods: {
    _jump(code) {
      switch (code) {
        case 1:
          this.$router.push({ path: "/navi/home" });
          break;
        case 2:
          const state = this.userType == 3 ? 1 : 2;
          this.$router.push({
            path: "/navi/orders",
            query: {
              state
            }
          });
          break;
        case 3:
         const state0 = this.userType == 3 ? 1 : 2;
          this.$router.push({
            path: "/navi/orders",
            query: {
              state0
            }
          });
          break;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
#orderResult {
  width: 100%;
  height: 100%;
  bg(#fff);
}

.order-result {
  pt(160);

  img {
    block();
    squ(120);
    margin: 0 auto;
  }
}

.state {
  mt(24);
  ft(32);
  c(#333);
  text-c();
}

.fail-reason {
  mt(10);
  ft(26);
  c(#999);
  text-c();
}

.actions {
  mt(56);
  text-c();
}

.btn {
  inline();
  w(240);
  h(72);
  lh(72);
  c(#666);
  b1(#DDDDDD);
  text-c();
  radius(10);
  ft(30);

  &:nth-of-type(2) {
    ml(20);
    c($color-theme);
    b1($color-theme);
  }
}
</style>

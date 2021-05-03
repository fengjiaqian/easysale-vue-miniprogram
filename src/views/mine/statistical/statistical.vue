<template>
  <div class="pt90">
    <div class="eb_mask" v-show="showEmailBox" @click="closeEmailBox" @touchmove.prevent></div>
    <m-header :isFixed="true"></m-header>
    <section class="top-bar">
      <span :class="{'active': activeIdx == 0}" @click="switchBar(0)">今日</span>
      <span :class="{'active': activeIdx == 1}" @click="switchBar(1)">7天</span>
      <span :class="{'active': activeIdx == 2}" @click="switchBar(2)">30天</span>
      <span :class="{'active': activeIdx == 3}" @click="switchBar(3)">总计</span>
    </section>

    <section class="content-wrap">
      <!--累计下单金额-->
      <div>
        <ul class="quanty-total">
          <li class="qt-money">
            <h5>{{$options.filters.priceToFixed(statisticalData.totalAmount)}}</h5>
            <p>{{activeTitle}}累计下单额(元)</p>
          </li>
          <li class="qt-num">
            <h5>{{statisticalData.orderSum}}</h5>
            <p>{{activeTitle}}累计下单数(个)</p>
          </li>
        </ul>
        <ul class="classes-column">
          <li @click="skipTo('product')">
            <span>下单商品数量</span>
            <span>
              {{statisticalData.productSum}}
              <i></i>
            </span>
          </li>
          <li @click="skipTo('customer')">
            <span>下单客户数量</span>
            <span>
              {{statisticalData.customerSum}}
              <i></i>
            </span>
          </li>
        </ul>
      </div>
    </section>

    <div class="email_box" :class="[showEmailBox ? 'visible':'invisible']" @touchmove.prevent>
      <div class="eb_header">
        <div class="text">请填写您的邮箱：</div>
        <div class="i" @click="closeEmailBox"></div>
      </div>
      <div class="email_input">
        <input type="text" placeholder="请输入您的邮箱" v-model="userEmail">
      </div>
    </div>
    <section
      class="sp-footer"
      :class="{'isIphoneX':isIphoneX}"
      v-show="!empty"
      @click="openEmailBox"
    >{{footerText}}</section>
  </div>
</template>

<script>
import { queryStatisticalData, sendReportFormEmail } from "api/fetch/mine";
import storage from "common/storage";
import { validateEmail } from "common/validate";

export default {
  data() {
    return {
      isIphoneX: this.isIphoneX,
      activeIdx: 0, //选中的区间
      activeTitle: "今日", //选中的区间名称
      dayNum: 1,
      statisticalData: {},
      idx: 0,
      showEmailBox: false,
      footerText: "发送至邮箱",
      userEmail: "",
      localUserEmail: "",
      empty: true,
      requestDone: true
    };
  },
  computed: {},
  components: {},

  created() {
    this.initStatistical();
    this.getlocalUserEmail();
  },
  beforeDestory() {},
  destoryed() {},
  mounted() {},
  methods: {
    switchBar(idx) {
      if (this.activeIdx == idx) return;
      this.activeIdx = idx;
      switch (idx) {
        case 0:
          this.dayNum = 1;
          this.activeTitle = "今日";
          break;
        case 1:
          this.dayNum = 7;
          this.activeTitle = "7天";
          break;
        case 2:
          this.dayNum = 30;
          this.activeTitle = "30天";
          break;
        case 3:
          this.dayNum = "";
          this.activeTitle = "总共";
          break;
        default:
          break;
      }
      this.initStatistical();
    },

    initStatistical() {
      let param = {
        dayNum: this.dayNum
      };
      queryStatisticalData(param).then(res => {
        if (res.result === "success" && res.data) {
          this.statisticalData = res.data;
          if (res.data.productSum == 0) {
            this.empty = true;
          } else {
            // 重置状态  因为第一次进页面已经初始化数据  下次在当前页面操作 永远不会触发 上面的empty = false
            this.empty = false;
          }
        }
      });
    },

    //从缓存中取email
    getlocalUserEmail() {
      const localUserEmail = storage.get("userEmail", "");
      this.localUserEmail = localUserEmail;
      this.userEmail = localUserEmail;
    },

    //关闭邮箱弹出
    closeEmailBox() {
      this.footerText = "发送至邮箱";
      this.showEmailBox = false;
    },

    //打开邮箱弹出
    openEmailBox() {
      // if (this.localUserEmail) {

      // }

      if (!this.showEmailBox) {
        this.showEmailBox = true;
        this.footerText = "发送";
      } else {
        this.sendEmail();
      }
    },

    //发送报表邮件
    sendEmail() {
      if (!validateEmail(this.userEmail)) {
        this.$alert(`请输入正确的邮箱！`);
        return;
      }

      if (this.loading) {
        return;
      }

      this.loading = true;

      if (this.localUserEmail !== this.userEmail) {
        storage.set("userEmail", this.userEmail);
        this.getlocalUserEmail();
      }

      let data = {};
      data.dayNum = this.dayNum;
      data.email = this.userEmail;
      // data.shopId=storage.get("currentDealerId", "") || "";
      sendReportFormEmail(data)
        .then(res => {
          if (res.result === "success") {
            setTimeout(() => {
              this.closeEmailBox();
              this.loading = false;
              this.$toast(`发送成功！`);
              this.requestDone = true;
            }, 1200);
          }
        })
        .catch(err => {
          this.loading = false;
          this.requestDone = true;
          this.$toast(err.message);
        });
    },

    skipTo(type) {
      let path =
        type == "product" ? "/my/statisProductList" : "/my/statisCustomerList";
      storage.set("recordIdx", this.activeIdx);
      this.$router.push({
        path,
        query: { idx: this.activeIdx }
      });
    }
  },
  watch: {}
};
</script>

<style lang="stylus" scoped>
@import './stylus/statistical.styl';
</style>


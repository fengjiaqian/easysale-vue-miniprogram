
<template>
  <div class="common pt90">
    <m-header :isFixed="true"></m-header>
    <div class="status">
      <div class="mode">
        <div class="way">申请状态：:</div>
        <div class="fettle">审核中</div>
      </div>
    </div>
    <div class="license" v-if="applyDealerInfo.logoIamgeUrls.length">
      <div class="trade">营业执照</div>
      <div class="slider-wrapper bg-w">
        <div class="slider-body">
          <slider ref="slider_dom" :loop="applyDealerInfo.logoIamgeUrls.length>1?true:false">
            <div class="pic-item" v-for="item in applyDealerInfo.logoIamgeUrls">
              <a href="javascript:;">
                <img :src="item">
              </a>
            </div>
          </slider>
        </div>
      </div>
    </div>
    <div class="infor" v-if="applyDealerInfo.name">
      <div class="trade">个人信息</div>
      <div class="news">
        <div class="name">姓名 : {{applyDealerInfo.name}}</div>
        <div>联系电话 : {{applyDealerInfo.phone}}</div>
      </div>
      <div class="detail">
        <div class="name">{{applyDealerInfo.shopName}}</div>
        <div>{{applyDealerInfo.address}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import icBanner from "@/assets/images/ic-banner.png";
import { findApplyDealerInfo } from "api/fetch/endCustomer";
import slider from "components/slider.vue";
export default {
  data() {
    return {
      applyDealerInfo: { logoIamgeUrls: [] },
      icBanner: icBanner
    };
  },
  components: {
    slider
  },
  computed: {},
  created() {
    this._findApplyDealerInfo();
  },
  methods: {
    _findApplyDealerInfo() {
      findApplyDealerInfo()
        .then(res => {
          this.applyDealerInfo = res.data;
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="stylus" scoped>
.pic-item {
  h(250);

  a>img {
    width: 100%;
    height: 100%;
  }
}

.slider-body {
  pos(relative);
  overflow: hidden;
}

.common {
  background-color: #F6F6F6;
  position: relative;
  overflow: hidden;
}

.common .status {
  padding: 40px 24px 15px 24px;
  background: white;
}

.common .status .mode {
  width: 100%;
  height: 46px;
  overflow: hidden;
  margin-bottom: 10px;
}

.common .status .mode .way {
  float: left;
  font-size: 34px;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 46px;
  margin-right: 20px;
  display: inline;
}

.common .status .mode .fettle {
  float: left;
  font-size: 34px;
  font-weight: bold;
  color: #FF5638;
  line-height: 46px;
  margin-right: 20px;
  display: inline;
}

.common .status .describe {
  width: 468px;
  height: 36px;
  font-size: 26px;
  color: rgba(153, 153, 153, 1);
  line-height: 36px;
}

.common .license, .common .infor {
  width: 96%;
  margin: 2%;
  background: #fff;
}

.common .license .trade, .common .infor .trade {
  padding: 24px;
  font-size: 32px;
  font-weight: bold;
  color: rgba(51, 51, 51, 1);
  line-height: 42px;
  border-bottom: 1PX solid #f6f6f6;
}

.common .infor .news, .common .infor .detail {
  padding: 24px;
  font-size: 30px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 42px;
  border-bottom: 1PX solid #f6f6f6;
}

.common .infor .news .name, .common .infor .detail .name {
  margin-bottom: 10px;
}
</style>

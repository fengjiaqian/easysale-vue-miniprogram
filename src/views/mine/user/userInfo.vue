<template>
  <div class="pt90">
    <m-header :isFixed="true"></m-header>
    <ul class="user-info-wrap">
      <li>
        <div>店铺名称：</div>
        <div>{{shopInfo.shopName}}</div>
      </li>
      <li class="mb-20">
        <div>联系电话：</div>
        <div>{{shopInfo.phone}}</div>
      </li>
      <li class="mb-20 uiw-info">
        <div>店铺介绍：</div>
        <div>{{shopInfo.instruction}}</div>
      </li>
      <li class="uiw-pic">
        <div>店铺图片：</div>
        <ul class="img-list">
          <li v-for="item in shopInfo.logoIamgeUrls">
            <img v-lazy="item || ''">
          </li>
        </ul>
      </li>
    </ul>
    <router-link to="/my/userInfoEdit">
      <div class="user-info-edit">编辑</div>
    </router-link>
  </div>
</template>

<script>
import { queryShopInfo } from "api/fetch/mine";
export default {
  data() {
    return {
      shopInfo: {}
    };
  },
  components: {},
  created() {
    this.initShopInfo();
  },
  mounted() {},
  methods: {
    initShopInfo() {
      let param = {};
      queryShopInfo(param).then(res => {
        if (res.result === "success" && res.data) {
          this.shopInfo = res.data;
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './stylus/user.styl';
</style>


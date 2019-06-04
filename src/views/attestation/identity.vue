<template>
  <div class="identity-wrap pt90">
    <m-header :isFixed="true"></m-header>
    <!-- 欢迎访问茅台商贸公司 -->
    <div class="att-shopname" v-if="shopName">欢迎访问{{shopName}}</div>
    <div class="att-content">
      <div class="c-title">
        <h4>您的身份是</h4>
        <!-- <p>请完善您的身份信息</p> -->
      </div>
      <ul class="c-list">
        <li v-for="(item,i) in identityList" :key="i" @click="skip(item)">
          <span :class="item.class"></span>
          <h5>{{item.title}}</h5>
          <i></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import storage from "common/storage";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      shopName: storage.get("currentDealer", {}).shopName || "",
      identityList: []
    };
  },
  components: {},
  computed: {},
  created() {
    this._identityList();
    this._initAuth();
  },
  mounted() {},
  methods: {
    ...mapActions(["setUserType"]),
    //跳转到认证页面
    skip(item) {
      const mobileNo = storage.get("mobileNo", "");
      this.$router.push({
        name: "attestationForm",
        query: { type: item.type, mobileNo }
      });
    },
    //初始化auth
    _initAuth() {
      let {
        nickName,
        avatarUrl,
        mobileNo,
        token,
        userType,
        shareDealerId,
        shareUserType = "",
        userState = 1,
        permissionState,
      } = this.$route.query;
      shareDealerId = shareDealerId == "undefined" ? 0 : shareDealerId;
      //shareDealerId currentDealerId 即 shopId
      // 以登录身份访问
      if (mobileNo && token && userType) {
        this.clearStorage(); //清楚部分缓存
        storage.set("permissionState", permissionState);
        storage.set("mobileNo", mobileNo);
        storage.set("token", token);
        storage.set("originUserType", userType);
        storage.set("userState", userState);
        this.setUserType({ type: shareUserType || userType, refresh: false });
        //TODO 此时有可能在首页切换了店铺 并不是一定是分享的店铺  认证店主判断 。
        shareDealerId && storage.set("currentDealerId", shareDealerId);
        return false;
      }
    },
    clearStorage() {
      var keys = [
        "homeRefresh",
        "mineRefresh",
        "orderRefresh",
        "fromOrder",
        "orderPrequeryParams",
        "orderExtraParams",
        "ownerShop",
        "userState"
      ];
      for (let key of keys) {
        storage.remove(key);
      }
    },
    _identityList() {
      const menus = [
        {
          title: "我是本公司客户",
          class: "customer",
          type: 0
        },
        {
          title: "我是本公司员工",
          class: "staff",
          type: 1
        },
        {
          title: "我是本公司老板",
          class: "owner",
          type: 2
        },
        {
          title: "我想开通其他公司平台",
          class: "apply",
          type: 3
        }
      ];
      //该店铺的认证状态
      const currentDealer = storage.get("currentDealer", {});
      let alreadyAudit = true; //默认认证或者认证中
      if (JSON.stringify(currentDealer) != "{}") {
        alreadyAudit = currentDealer.shopType != 2;
      }
      alreadyAudit && menus.splice(2, 1);
      this.identityList = menus;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './stylus/attestation.styl';
</style>


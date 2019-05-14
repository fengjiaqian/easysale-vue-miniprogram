<template>
  <div class="identity-wrap pt90">
    <m-header :isFixed="true"></m-header>
    <div class="content">
      <div class="c-title">
        <h4>您的身份是</h4>
        <p>请完善您的身份信息</p>
      </div>
      <ul class="c-list">
        <li v-for="(item,i) in identityList" :key="i" @click="skip(i)">
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
      identityList: [
        {
          title: "我是客户",
          class: "customer"
        },
        {
          title: "我是员工",
          class: "staff"
        },
        {
          title: "我是店主",
          class: "owner"
        },
        {
          title: "我要认证",
          class: "apply"
        }
      ]
    };
  },
  components: {},
  computed: {},
  created() {
    this._initAuth();
  },
  mounted() {},
  methods: {
    ...mapActions(["setUserType"]),
    //跳转到认证页面
    skip(index) {
      const mobileNo = storage.get("mobileNo", "");
      this.$router.push({
        name: "attestationForm",
        query: { type: index, mobileNo }
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
        shareUserType = ""
      } = this.$route.query;
      shareDealerId = shareDealerId == "undefined" ? 0 : shareDealerId;
      //shareDealerId currentDealerId 即 shopId
      // 以登录身份访问
      if (mobileNo && token && userType) {
        this.clearStorage(); //清楚部分缓存
        storage.set("mobileNo", mobileNo);
        storage.set("token", token);
        storage.set("originUserType", userType);
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
        "currentDealer",
        "fromOrder",
        "orderPrequeryParams",
        "orderExtraParams"
      ];
      for (let key of keys) {
        storage.remove(key);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './stylus/attestation.styl';
</style>


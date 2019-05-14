<template>
  <div class="pt90">
    <m-header :isFixed="true" :tit="myTitle"></m-header>
    <ul class="user-info-wrap">
      <li>
        <div>{{showStore?`店铺名称：`:`公司名称：`}}</div>
        <div>{{shopInfo.shopName}}</div>
      </li>
      <li class="mb-20">
        <div>联系电话：</div>
        <div>{{shopInfo.phone}}</div>
      </li>
      <li class="mb-20 uiw-info">
        <div>{{showStore?`店铺介绍：`:`公司介绍：`}}</div>
        <div>{{shopInfo.instruction}}</div>
      </li>
      <li class="mb-20 uiw-info">
        <div>{{showStore?`店铺地址：`:`公司地址：`}}</div>
        <div>{{shopInfo.address}}</div>
      </li>
      <li class="uiw-pic">
        <div>{{showStore ?`门头照片：`:`公司形象照：`}}</div>
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
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      myTitle: "",
      shopInfo: {},
      showStore: false
    };
  },
  components: {},
  computed: {
    ...mapGetters(["userInSwitching"])
  },
  created() {
    this.showStore = this.userType == 3 && !this.userInSwitching;
    this.myTitle = this.showStore ? `店铺信息` : `公司信息`;
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


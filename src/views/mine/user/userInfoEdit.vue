<template>
  <div v-if="domShow">
    <ul class="user-info-wrap">
      <li>
        <div>店铺名称：</div>
        <input v-model="shopInfo.shopName" type="text" maxlength="20" placeholder="请输入店铺名称">
      </li>
      <li class="mb-20">
        <div>联系电话：</div>
        <input v-model="shopInfo.phone" type="tel" maxlength="11" placeholder="请输入您的联系电话">
      </li>
      <li class="mb-20 uiw-info">
        <div>店铺介绍：</div>
        <textarea v-model="shopInfo.instruction" maxlength="180" rows="4" placeholder="请输入店铺介绍"></textarea>
      </li>
      <li class="uiw-pic">
        <div>店铺图片：</div>
        <div>
          <img v-lazy="shopInfo.logoIamgeUrl" >
        </div>
      </li>
    </ul>
    <div class="user-info-edit save" @click="saveEdit">保存</div>
  </div>
</template>

<script>
  import { queryShopInfo,editShopInfo } from "api/fetch/mine";
  export default {
    data() {
      return {
        userId: '',
        shopInfo: {},
        domShow: false,
      };
    },
    components: {

    },
    created() {
      this.userId = '465273'
      this.initShopInfo()
    },
    mounted() {},
    methods: {
      initShopInfo(){
        let param = {
          userId: this.userId
        }
        queryShopInfo(param).then(res => {
          if (res.result === "success" && res.data) {
            this.shopInfo = res.data
            this.domShow = true
          }
        });
      },
      //保存修改
      saveEdit(){
        let param = this.shopInfo
        editShopInfo(param).then(res => {
          if (res.result === "success") {
            this.$router.push({ path: "/my/userInfo" });
          }
        });
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import "./stylus/user.styl"
</style>


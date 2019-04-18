
<template>
  <div class="common">
    <div class="name">
      <div class="left">客户姓名 :</div>
      <input class="right" v-model="clientName" value type="text" placeholder="请输入姓名">
    </div>
    <div class="tele">
      <div class="left">联系电话 :</div>
      <input class="right" value v-model="clientTel" type="number" placeholder="请输入手机号码">
    </div>
    <div class="shopname">
      <div class="left">店铺名称 :</div>
      <input class="right" value v-model="storeName" type="text" placeholder="请输入店铺名称">
    </div>
    <div class="address">
      <div class="left">店铺地址 :</div>
      <input class="right" value v-model="storeAddress" type="text" placeholder="请输入店铺地址">
      <img class="location" src="../../../assets/images/address_position_icon.png" alt>
    </div>
    <div class="license">
      <div class="left">营业执照 :</div>
      <div class="right"></div>
    </div>
    <div class="edit" @click="referData()">保存</div>
  </div>
</template>

<script>
import { applyDealer } from "api/fetch/endCustomer";

export default {
  data() {
    return {
      clientName: "", //客户名字
      clientTel: "", //电话
      storeName: "", //店铺名字
      storeAddress: "" //收货人地址
    };
  },
  created() {},
  methods: {
    referData() {
      //点击保存的时候
      console.log(666);
      let param = {
        name: this.clientName,
        id: 323232,
        phone: this.clientTel,
        shopName: this.storeName,
        address: this.storeAddress
      };
      applyDealer(param).then(res => {
        if (res.result === "success") {
          // bus.$emit('update',''); //刷新页面的东西
          console.log("保存成功");
        }
      });
      // this.$router.push({
      //   path: "/navi/mineClient"
      // });
    },
    step() {}
  }
};
</script>

<style lang="stylus" scoped>
.common {
  background-color: #F6F6F6;
  position: relative;
  height: 100%;
}

.common .name, .common .tele, .common .name, .common .shopname {
  height: 90px;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
  border-bottom: 1px solid #f6f6f6;
}

.common .tele {
  margin-bottom: 20px;
}

.common .name .left, .common .tele .left, .common .name .left, .common .shopname .left {
  float: left;
  width: 150px;
  height: 42px;
  font-size: 30px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 42px;
  margin: 24px 12px 24px 24px;
}

.common .name .right, .common .tele .right, .common .name .right, .common .shopname .right {
  float: left;
  width: 600px;
  height: 42px;
  font-size: 30px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 42px;
  margin-top: 24px;
  outline: none;
}

.common .address {
  height: 90px;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
  position: relative;
}

.common .address .left {
  float: left;
  width: 150px;
  height: 42px;
  font-size: 30px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 42px;
  margin: 24px 12px 66px 24px;
}

.common .address .right {
  float: left;
  width: 600px;
  height: 42px;
  font-size: 30px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 42px;
  margin-top: 24px;
  outline: none;
}

.common .address .location {
  width: 48px;
  height: 48px;
  display: inline-block;
  position: absolute;
  right: 24px;
  top: 24px;
}

.common .license {
  width: 100%;
  height: 208px;
  overflow: hidden;
  background: rgba(255, 255, 255, 1);
  margin-top: 20px;
}

.common .license .left {
  float: left;
  width: 150px;
  height: 42px;
  font-size: 30px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 42px;
  margin: 24px 12px 24px 24px;
}

.common .license .right {
  float: left;
  width: 160px;
  height: 160px;
  border-radius: 6px;
  border: 1px dashed rgba(221, 221, 221, 1);
  margin-top: 24px;
  background: rgba(246, 246, 246, 1) url('../../../assets/images/ic_jiahao.png.jpg') no-repeat center;
  background-size: 64px 64px;
}

.common .edit {
  width: 100%;
  height: 98px;
  background: rgba(255, 86, 56, 1);
  position: fixed;
  bottom: 0;
  font-size: 32px;
  color: rgba(255, 255, 255, 1);
  line-height: 98px;
  text-align: center;
}
</style>

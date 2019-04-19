
<template>
  <div class="common">
    <div class="name">
      <div class="left">客户姓名 :</div>
      <input class="right" v-model="name" value type="text" placeholder="请输入姓名">
    </div>
    <div class="tele">
      <div class="left">联系电话 :</div>
      <input class="right" value v-model="phone" type="number" placeholder="请输入手机号码">
    </div>
    <div class="shopname">
      <div class="left">店铺名称 :</div>
      <input class="right" value v-model="shopName" type="text" placeholder="请输入店铺名称">
    </div>
    <div class="address">
      <div class="left">店铺地址 :</div>
      <input class="right" value v-model="address" type="text" placeholder="请输入店铺地址">
      <img class="location" src="../../../assets/images/address_position_icon.png" alt>
    </div>
    <div class="license">
      <div class="left">营业执照 :</div>
      <div class="right"></div>
    </div>
    <div class="edit" @click="_applyDealer()" :class="{'can-operate': canOperate}">保存</div>
  </div>
</template>

<script>
import { applyDealer, findCustomerOwerInfo } from "api/fetch/endCustomer";

export default {
  data() {
    return {
      name: "",
      phone: "",
      shopName: "",
      address: ""
    };
  },
  computed: {
    canOperate() {
      return this.name && this.phone && this.shopName && this.address;
    }
  },
  created() {},
  methods: {
    //TODO: 带入电话号码和姓名
    //TODO: 上传参数加入图片
    _applyDealer() {
      if (!this.canOperate) return false;
      const partter = /^0?1[3|4|5|6|8|7|9][0-9]\d{8}$/;
      const regExp = new RegExp(partter);
      if (!regExp.test(this.phone)) {
        return this.$toast("手机号码格式不正确");
      }
      const params = {
        name: this.name,
        phone: this.phone,
        shopName: this.shopName,
        address: this.address
      };
      applyDealer(params)
        .then(res => {
          this.$toast("申请信息提交成功");
          this.$router.go(-1);
        })
        .catch(err => {
          this.$toast(err.message);
        });
    }
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

.edit {
  width: 100%;
  height: 98px;
  background: #BDBDBD;
  position: fixed;
  bottom: 0;
  font-size: 32px;
  color: #fff;
  line-height: 98px;
  text-align: center;
}

.can-operate {
  bg(rgba(255, 86, 56, 1));
}
</style>

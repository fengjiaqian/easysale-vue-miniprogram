<template>
  <div class="common">
    <div class="name">
      <div class="left">姓名 :</div>
      <input class="right" v-model="name" placeholder="请输入姓名" type="text">
    </div>
    <div class="tele">
      <div class="left">联系电话 :</div>
      <input class="right" v-model="phone" placeholder="请输入手机号码" type="text">
    </div>
    <div class="shopname">
      <div class="left">店铺名称 :</div>
      <input class="right" v-model="shopName" placeholder="请输入店铺名称" type="text">
    </div>
    <div class="address">
      <div class="left">收货地址 :</div>
      <textarea rows="2" cols="20" class="right" v-model="address" placeholder="请输入店铺名称"></textarea>
    </div>
    <div class="edit" @click="_operate" :class="{'can-operate': canOperate}">保存</div>
  </div>
</template>

<script>
import * as Operation from "api/fetch/endCustomer";
export default {
  data() {
    return {
      code: 1, //新增1  编辑2
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
  created() {
    this.init();
  },
  methods: {
    init() {
      this.code = this.$route.params.code;
      let addressInfo = this.$route.query.addressInfo;
      addressInfo &&
        (addressInfo = JSON.parse(decodeURIComponent(addressInfo)));
      document.title = this.code == 1 ? "新增收货人" : "编辑收货人";
      if (this.code == 2 && addressInfo) {
        for (let preperty in addressInfo) {
          this[preperty] = addressInfo[preperty];
        }
      }
    },
    _operate() {
      if (!this.canOperate) return false;
      const partter = /^0?1[3|4|5|6|8|7|9][0-9]\d{8}$/;
      const regExp = new RegExp(partter);
      const { name, phone, shopName, address } = this;
      if (!regExp.test(phone)) {
        return this.$toast("手机号码格式不正确");
      }
      const operate = this.code == 1 ? "addConsigneer" : "modifyConsignee";
      Operation[operate]({ name, phone, shopName, address })
        .then(res => {
          if (res.result === "success") {
            this.$router.push({
              path: "/myConsignee"
            });
          }
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
  color: rgba(102, 102, 102, 1);
  line-height: 42px;
  margin: 24px 12px 24px 24px;
}

.common .name .right, .common .tele .right, .common .name .right, .common .shopname .right {
  float: left;
  width: 600px;
  height: 42px;
  font-size: 30px;
  color: rgba(51, 51, 51, 1);
  line-height: 42px;
  margin-top: 24px;
  outline: none;
}

.common .address {
  height: 132px;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
}

.common .address .left {
  float: left;
  width: 150px;
  height: 42px;
  font-size: 30px;
  color: rgba(102, 102, 102, 1);
  line-height: 42px;
  margin: 24px 12px 66px 24px;
}

.common .address .right {
  width: 540px;
  height: 84px;
  font-size: 30px;
  color: rgba(51, 51, 51, 1);
  line-height: 42px;
  margin-top: 24px;
  outline: none;
  resize: none;
  border: 0;
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
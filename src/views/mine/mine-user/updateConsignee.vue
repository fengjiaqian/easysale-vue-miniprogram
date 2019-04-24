<template>
  <div class="common">
    <div class="name">
      <div class="left">姓名 :</div>
      <input class="right" type="text" v-model="consigneeInfo.name" placeholder="请输入姓名">
    </div>
    <div class="tele">
      <div class="left">联系电话 :</div>
      <input class="right" type="number" v-model="consigneeInfo.phone" placeholder="请输入手机号码">
    </div>
    <div class="shopname">
      <div class="left">店铺名称 :</div>
      <input class="right" type="text" v-model="consigneeInfo.customerShopName" placeholder="请输入店铺名称">
    </div>
    <div class="address-column">
      <span>收货地址 :</span>
      <div>
        <input v-model="consigneeInfo.address" type="text" maxlength="50" placeholder="请输入店铺地址">
      </div>
      <i @click="obtainAddress" class="position"></i>
    </div>
    <div class="edit" @click="_operate" :class="{'can-operate': canOperate}">保存</div>
  </div>
</template>

<script>
import * as Operation from "api/fetch/endCustomer";
import { evokeWxLocation } from "common/location";
export default {
  data() {
    return {
      code: 1, //新增1  编辑2
      consigneeInfo: {
        name: "",
        phone: "",
        customerShopName: "",
        address: "",
        id: ""
      },
    };
  },
  computed: {
    canOperate() {
      const { name,phone,customerShopName,address } = this.consigneeInfo
      return name && phone && customerShopName && address;
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm=>{
      let passData = to.query.passData ? to.query.passData : null
      if(passData){
        passData = JSON.parse(passData)
        Object.assign(vm.consigneeInfo,passData.pageData)
        vm.consigneeInfo.address = passData.addressData.address
      }
    })
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      //是否从order页面
      this.fromOrder = this.$route.query.fromOrder || false;
      //
      this.code = this.$route.params.code;
      let addressInfo = this.$route.query.addressInfo;
      addressInfo && (addressInfo = this.decodeUrl(addressInfo));
      console.log(addressInfo);
      document.title = this.code == 1 ? "新增收货人" : "编辑收货人";
      if (this.code == 2 && addressInfo) {
        for (let preperty in addressInfo) {
          this.consigneeInfo[preperty] = addressInfo[preperty];
        }
      }
    },
    _operate() {
      if (!this.canOperate) return false;
      const partter = /^0?1[3|4|5|6|8|7|9][0-9]\d{8}$/;
      const regExp = new RegExp(partter);
      const { name, phone, customerShopName, address, id } = this.consigneeInfo;
      if (!regExp.test(phone)) {
        return this.$toast("手机号码格式不正确");
      }
      const params = { name, phone, customerShopName, address, id };
      const operate = this.code == 1 ? "addConsigneer" : "modifyConsignee";
      Operation[operate](params)
        .then(res => {
          //TODO 跳到orderSubmit无法带上id
          if (this.code == 1 && this.fromOrder) {
            return this.$router.push({
              path: "/myConsignee",
              query: {
                fromOrder: true
              }
            });
          }
          this.$router.push({
            path: "/myConsignee"
          });
        })
        .catch(err => {
          this.$toast(err.message);
        });
    },
    //去定位地址
    obtainAddress(){
      let recordData = {
        path: this.$route.path,
        pageData: this.consigneeInfo
      }
      evokeWxLocation(recordData)
    },
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
  .position{
    float right
    display inline-block
    mt(24)
    mr(24)
    w(48)
    h(48)
    background-size contain
    background-repeat no-repeat
    background-position center
    background-image url(../../../assets/images/address_position_icon.png)
  }
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
.address-column{
  padding 0 24px
  bg(#fff)
  flex()
  align-items center
  justify-content flex-start
  lh(90)
  ft(30)
  c-3()
  span{
    c-6()
    mr(12)
    min-width 150px
  }
  input{
    flex-1()
    outline none
    border none
  }
  div{
    flex-1()
    lh(90)
    h(90)
    input{
      width 100%
      height 100%
    }
  }
  i{
    background-size contain
    background-repeat no-repeat
    background-position center
  }
  .position{
    w(48)
    h(48)
    background-image url(../../../assets/images/address_position_icon.png)
  }
}
</style>
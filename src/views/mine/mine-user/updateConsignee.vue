<template>
  <div class="modify-consignee pt90">
    <m-header :isFixed="true" :tit="myTitle"></m-header>
    <div class="mc-item">
      <div class="left">姓名 :</div>
      <input class="right" type="text" v-model="consigneeInfo.name" placeholder="请输入姓名">
    </div>
    <div class="mc-item">
      <div class="left">联系电话 :</div>
      <input class="right" type="number" v-model="consigneeInfo.phone" placeholder="请输入手机号码">
    </div>
    <div class="mc-item mc-item-shopname">
      <div class="left">店铺名称 :</div>
      <input
        class="right"
        type="text"
        v-model="consigneeInfo.customerShopName"
        placeholder="请输入店铺名称"
      >
    </div>
    <div class="address-column">
      <span>收货地址 :</span>
      <div class="locate-address">
        <textarea v-model="consigneeInfo.address" maxlength="50" cols="30" rows="2" placeholder="请输入店铺地址"></textarea>
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
      myTitle: "",
      consigneeInfo: {
        name: "",
        phone: "",
        customerShopName: "",
        address: "",
        id: ""
      }
    };
  },
  computed: {
    canOperate() {
      const { name, phone, address } = this.consigneeInfo;
      return name.trim() && phone && address.trim();
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let passData = to.query.passData ? to.query.passData : null;
      if (passData) {
        passData = JSON.parse(passData);
        Object.assign(vm.consigneeInfo, passData.pageData);
        vm.consigneeInfo.address = passData.addressData.address;
      }
    });
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.code = this.$route.params.code;
      let addressInfo = this.$route.query.addressInfo;
      addressInfo && (addressInfo = this.decodeUrl(addressInfo));
      console.log(addressInfo);
      this.myTitle = this.code == 1 ? "新增收货人" : "编辑收货人";
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
          this.$router.replace({
            path: "/myConsignee"
          });
        })
        .catch(err => {
          this.$toast(err.message);
        });
    },
    //去定位地址
    obtainAddress() {
      let recordData = {
        path: this.$route.path,
        pageData: this.consigneeInfo
      };
      evokeWxLocation(recordData);
    }
  }
};
</script>

<style lang="stylus">
.modify-consignee {
  height: 100%;
}

.mc-item {
  padding: 0 24px;
  bg(#fff);
  flex();
  align-items: center;
  justify-content: flex-start;
  lh(90);
  ft(30);
  c-3();

  .left {
    c-6();
    mr(12);
    min-width: 150px;
  }

  .right {
    lh(90);
    h(90);
    flex-1();
    outline: none;
    border: none;
  }
}

.mc-item-shopname {
  mt(20);
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

.address-column {
  padding: 0 24px;
  bg(#fff);
  flex();
  align-items: center;
  justify-content: flex-start;
  lh(90);
  ft(30);
  c-3();

  span {
    c-6();
    mr(12);
    min-width: 150px;
  }

  input {
    flex-1();
    outline: none;
    border: none;
  }

  div {
    flex-1();
    lh(90);
    h(90);

    input {
      width: 100%;
      height: 100%;
    }
  }

  i {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .position {
    w(48);
    h(48);
    background-image: url('../../../assets/images/address_position_icon.png');
  }
}
</style>
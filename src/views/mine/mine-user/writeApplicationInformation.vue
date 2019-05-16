
<template>
  <div class="common pt90">
    <m-header :isFixed="true"></m-header>
    <!--    <div class="mc-item mt20">
      <div class="left">您的姓名 :</div>
      <input class="right" v-model="applyInfo.name" value type="text" placeholder="请输入您的姓名">
    </div>-->
    <div class="mc-item-hr"></div>
    <div class="mc-item">
      <div class="left">公司名称 :</div>
      <input class="right" value v-model="applyInfo.shopName" type="text" placeholder="请输入公司名称">
    </div>
    <div class="mc-item mt20">
      <div class="left">联系电话 :</div>
      <input
        class="right"
        value
        v-model="applyInfo.phone"
        type="number"
        placeholder="请输入手机号码"
        readonly
      >
    </div>
    <div class="mc-item-hr"></div>
    <div class="mc-item pre">
      <div class="left">公司地址 :</div>
      <div class="locate-address right">
        <textarea v-model="applyInfo.address" maxlength="50" cols="30" rows="2" placeholder="请输入公司地址"></textarea>
      </div>
      <img
        class="location"
        @click.stop="obtainAddress"
        src="../../../assets/images/address_position_icon.png"
        alt
      >
    </div>
    <div class="uiw-pic">
      <div class="left" style="width: 80px">公司形象照 :</div>
      <upload-file :img-list="stagImgList" :limit-num="limitUploadNum" ref="uploadFile"></upload-file>
    </div>
    <div class="logos-desc">尺寸大小2:1,如400*200,格式(jpg、png、gif)</div>
    <div class="edit" @click="verify()" :class="{'can-operate': canOperate}">保存</div>
  </div>
</template>

<script>
import { applyDealer, findCustomerOwerInfo } from "api/fetch/endCustomer";
import storage from "common/storage";
import { evokeWxLocation } from "common/location";
import { compress } from "common/util";
import uploadFile from "components/upload-file";
import bus from "common/Bus";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      applyInfo: {
        name: "",
        phone: "",
        shopName: "",
        address: ""
      },
      stagImgList: [], //暂存的图片数组
      limitUploadNum: 3, //上传图片的限制张数
      logoIamgeUrls: [],
    };
  },
  components: {
    uploadFile
  },
  computed: {
    canOperate() {
      return (
        this.applyInfo.phone &&
        this.applyInfo.shopName &&
        this.applyInfo.address
      );
    },
    headers() {
      const token = storage.get("token", "");
      return {
        token: token
      };
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let passData = to.query.passData ? to.query.passData : null;
      if (passData) {
        passData = JSON.parse(passData);
        Object.assign(vm.applyInfo, passData.pageData);
        vm.applyInfo.address = passData.addressData.address;
      }
    });
  },
  created() {
    this.applyInfo.phone = this.$route.query.mobileNo;
  },
  mounted() {
    bus.$off("uploadImgUrls")
    bus.$on("uploadImgUrls", (data) => {
      this.logoIamgeUrls = data || []
      this._applyDealer()
    });
  },
  methods: {
    ...mapActions(["setUserType"]),
    //验证添加商品所需字段
    verify() {
      if (!this.canOperate) return false;
      const fileLength =  this.$refs.uploadFile.fileList.length
      if(fileLength){
        //上传图片
        this.$refs.uploadFile.submitFile(fileLength)
        return;
      }else{
        this._applyDealer()
      }
    },

    //TODO: 带入电话号码和姓名
    //TODO: 上传参数加入图片
    _applyDealer() {
      const partter = /^0?1[3|4|5|6|8|7|9][0-9]\d{8}$/;
      const regExp = new RegExp(partter);
      if (!regExp.test(this.applyInfo.phone)) {
        return this.$toast("手机号码格式不正确");
      }
      const { name, phone, shopName, address } = this.applyInfo;
      const params = {
        name,
        phone,
        shopName,
        address,
        logoIamgeUrls: this.logoIamgeUrls
      };
      applyDealer(params)
        .then(res => {
          this.$toast("恭喜，您公司的线上平台已经开通");
          const { mobileNo, token, userType, shopId = "" } = res.data;
          storage.set("mobileNo", mobileNo);
          storage.set("token", token);
          storage.set("originUserType", userType);
          this.setUserType(userType);
          shopId && storage.set("currentDealerId", shopId);
          //todo remove currentDealer
          storage.remove("currentDealer");
          this.$router.push({ path: "/navi/home" });
        })
        .catch(err => {
          this.$toast(err.message);
        });
    },

    //去小程序定位地址
    obtainAddress() {
      storage.set("ApplyToLocation", true);
      let recordData = {
        path: this.$route.path,
        pageData: this.applyInfo
      };
      evokeWxLocation(recordData);
    },
    changeLoad() {}
  }
};
</script>

<style lang="stylus" scoped>
.logos-desc {
  ft(24);
  c(#999);
  bg(#fff);
  pb(16);
  pl(24);
}

.common {
  background-color: #F6F6F6;
  position: relative;
  height: 100%;
}

.mc-item-hr {
  bg(#fff);

  &:after {
    content: '';
    block();
    h(0);
    margin: 0 24px;
    border-bottom: 1PX solid #ededed;
  }
}

.mc-item {
  pos(relative);
  padding: 0 24px;
  bg(#fff);
  flex();
  align-items: center;
  justify-content: flex-start;
  lh(90);
  ft(30);
  c-3();
  .locate-address{
    mr(50)
  }
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

.location {
  block();
  squ(55);
  position: absolute;
  right: 24px;
  top: 24px;
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

.uiw-pic {
  mt(20);
  bg(#fff);
  padding: 24px;
  flex();
  justify-content: flex-start;
  align-items: flex-start;

  .left {
    ft(30);
    c-6();
    w(150);
    word-break: keep-all;
  }

  .img-list {
    flex-1();
    flex();
    flex-wrap: wrap;
    justify-content: flex-start;
    ml(24);

    >li {
      position: relative;

      img {
        w(160);
        h(160);
        mr(20);
        border-radius: 6px;
        border: 1PX solid #ededed;
        box-sizing: border-box;
      }

      i {
        position: absolute;
        right: 8px;
        top: -20px;
        w(40);
        h(40);
        background-image: url('../../../assets/images/close_icon1.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
}
</style>

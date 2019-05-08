
<template>
  <div class="common pt90">
    <m-header :isFixed="true"></m-header>
    <div class="mc-item mt20">
      <div class="left">客户姓名 :</div>
      <input class="right" v-model="applyInfo.name" value type="text" placeholder="请输入姓名">
    </div>
    <div class="mc-item-hr"></div>
    <div class="mc-item">
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
    <div class="mc-item mt20">
      <div class="left">店铺名称 :</div>
      <input class="right" value v-model="applyInfo.shopName" type="text" placeholder="请输入店铺名称">
    </div>
    <div class="mc-item-hr"></div>
    <div class="mc-item pre">
      <div class="left">店铺地址 :</div>
      <input class="right" value v-model="applyInfo.address" type="text" placeholder="请输入店铺地址">
      <img
        class="location"
        @click.stop="obtainAddress"
        src="../../../assets/images/address_position_icon.png"
        alt
      >
    </div>
    <div class="uiw-pic">
      <div class="left">上传门头照 :</div>
      <ul class="img-list">
        <li v-for="(item,index) in stagImgList">
          <img :src="item">
          <i @click="deleteUploadImg(index)"></i>
        </li>
        <el-upload
          class="upload-wrap"
          :action="uploadImgUrl"
          list-type="picture-card"
          :headers="headers"
          :before-upload="onBeforeUpload"
          :on-change="changeLoad"
          :on-success="fileSuccess"
          :on-error="fileFaild"
          accept="image/*"
        ></el-upload>
      </ul>
    </div>
    <div class="edit" @click="_applyDealer()" :class="{'can-operate': canOperate}">保存</div>
  </div>
</template>

<script>
import { applyDealer, findCustomerOwerInfo } from "api/fetch/endCustomer";
import storage from "common/storage";
import { evokeWxLocation } from "common/location";
import { compress } from "common/util";
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
      limitUploadNum: 3 //上传图片的限制张数
    };
  },
  computed: {
    canOperate() {
      return (
        this.applyInfo.name &&
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
  methods: {
    ...mapActions(["setUserType"]),
    //TODO: 带入电话号码和姓名
    //TODO: 上传参数加入图片
    _applyDealer() {
      if (!this.canOperate) return false;
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
        logoIamgeUrls: this.stagImgList
      };
      applyDealer(params)
        .then(res => {
          this.$toast("申请成功");
          const { mobileNo, token, userType, shopId } = res.data;
          storage.set("mobileNo", mobileNo);
          storage.set("token", token);
          storage.set("originUserType", userType);
          this.setUserType(userType);
          shopId && storage.set("currentDealerId", shopId);
          //
          storage.remove("currentDealer");
          storage.set("homeRefresh", true);
          storage.set("mineRefresh", true);
          storage.set("orderRefresh", true);
          this.$router.push({ path: "/navi/mine" });
        })
        .catch(err => {
          this.$toast(err.message);
        });
    },
    //图片上传前验证
    onBeforeUpload(file) {
      const isIMAGE = file.type === "image/jpeg" || "image/gif" || "image/png";
      const isLt1M = file.size / 1024 / 1024 < 10;
      if (!isIMAGE) {
        this.$alert("上传文件只能是图片格式!");
      }
      if (!isLt1M) {
        this.$alert("上传文件大小不能超过 10MB!");
      }
      if (isIMAGE && isLt1M) {
        return new Promise((resolve, reject) => {
          compress(file, function(val) {
            resolve(val);
          });
        });
      } else {
        return false;
      }
    },
    //图片上传成功时
    fileSuccess(res, file) {
      this.stagImgList.push(res.data);
      if (this.stagImgList.length == this.limitUploadNum) {
        document
          .querySelector(".el-upload--picture-card")
          .setAttribute("style", "display:none;");
      }
    },
    //图片上传失败
    fileFaild() {
      this.$alert("图片上传失败，请重试！");
    },
    //删除图片
    deleteUploadImg(idx) {
      this.stagImgList = this.stagImgList.filter((item, index) => {
        return idx != index;
      });
      if (this.stagImgList.length < this.limitUploadNum) {
        document
          .querySelector(".el-upload--picture-card")
          .removeAttribute("style");
      }
    },
    //去小程序定位地址
    obtainAddress() {
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

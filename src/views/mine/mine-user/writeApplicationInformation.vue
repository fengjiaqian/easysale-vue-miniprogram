
<template>
  <div class="common">
    <div class="name">
      <div class="left">客户姓名 :</div>
      <input class="right" v-model="name" value type="text" placeholder="请输入姓名">
    </div>
    <div class="tele">
      <div class="left">联系电话 :</div>
      <input class="right" value v-model="phone" type="number" placeholder="请输入手机号码" readonly>
    </div>
    <div class="shopname">
      <div class="left">店铺名称 :</div>
      <input class="right" value v-model="shopName" type="text" placeholder="请输入店铺名称">
    </div>
    <div class="address">
      <div class="left">店铺地址 :</div>
      <input class="right" value v-model="address" type="text" placeholder="请输入店铺地址">
      <img
        class="location"
        @click.stop="obtainAddress"
        src="../../../assets/images/address_position_icon.png"
        alt
      >
    </div>
    <div class="uiw-pic">
      <div class="left">营业执照 :</div>
      <ul class="img-list">
        <li v-for="(item,index) in stagImgList">
          <img :src="item">
          <i @click="deleteUploadImg(index)"></i>
        </li>
        <el-upload class="upload-wrap"
                   :action="uploadImgUrl"
                   list-type="picture-card"
                   :headers="headers"
                   :before-upload="onBeforeUpload"
                   :on-change="changeLoad"
                   :on-success="fileSuccess"
                   :on-error="fileFaild"
                   accept="image/*">
        </el-upload>
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

export default {
  data() {
    return {
      name: "",
      phone: "",
      shopName: "",
      address: "",
      stagImgList: [], //暂存的图片数组
      limitUploadNum: 3 //上传图片的限制张数
    };
  },
  computed: {
    canOperate() {
      return this.name && this.phone && this.shopName && this.address;
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
        vm.address = passData.addressData.address;
      }
    });
  },
  created() {
    this.phone = this.$route.query.mobileNo;
  },
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
        address: this.address,
        logoIamgeUrls: this.stagImgList
      };
      applyDealer(params)
        .then(res => {
          this.$toast("申请信息提交成功");
          this.$router.push({ path: "/navi/mine" });
        })
        .catch(err => {
          this.$toast(err.message);
        });
    },
    //图片上传前验证
    onBeforeUpload(file){
      const isIMAGE = file.type === 'image/jpeg'||'image/gif'||'image/png';
      const isLt1M = file.size / 1024 / 1024 < 10;
      if (!isIMAGE) {
        this.$alert("上传文件只能是图片格式!");
      }
      if (!isLt1M) {
        this.$alert('上传文件大小不能超过 10MB!');
      }
      if(isIMAGE && isLt1M){
        return new Promise((resolve, reject)=>{
          compress(file, function(val) {
            resolve(val)
          })
        })
      }else{
        return false
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
        pageData: {}
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

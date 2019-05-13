<template>
  <div v-if="domShow" class="pt90">
    <m-header :isFixed="true"></m-header>
    <ul class="user-info-wrap">
      <li>
        <div>店铺名称：</div>
        <input v-model="shopInfo.shopName" type="text" maxlength="20" placeholder="请输入店铺名称">
      </li>
      <li class="mb-20">
        <div>联系电话：</div>
        <input
          @input="limitPhone"
          v-model="shopInfo.phone"
          type="tel"
          maxlength="11"
          placeholder="请输入您的联系电话"
        >
      </li>
      <li class="mb-20 uiw-info">
        <div>店铺介绍：</div>
        <textarea v-model="shopInfo.instruction" maxlength="180" rows="4" placeholder="请输入店铺介绍"></textarea>
      </li>
      <li class="mb-20 uiw-info info-address">
        <div class="ia-title">店铺地址：</div>
        <div class="ia-value locate-address">
          <textarea v-model="shopInfo.address" maxlength="50" cols="30" rows="2" placeholder="请输入店铺地址"></textarea>
        </div>
        <i @click="obtainAddress" class="position"></i>
      </li>
      <li class="uiw-pic">
        <div>门头图片：</div>
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
      </li>
    </ul>
    <div class="user-info-edit save" :class="[achieve ? 'save' : 'disable']" @click="verify">保存</div>
  </div>
</template>

<script>
import { queryShopInfo, editShopInfo } from "api/fetch/mine";
import storage from "common/storage";
import { verifyPhone } from "common/validate";
import { compress } from "common/util";
import { evokeWxLocation } from "common/location";
export default {
  data() {
    return {
      shopInfo: {
        shopName: '',
        phone: '',
        instruction: '',
        address: '',
      },
      domShow: false,
      limitUploadNum: 5, //上传图片的限制张数
      stagImgList: [], //暂存的图片数组
      achieve: false
    };
  },
  components: {},
  computed: {
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
        Object.assign(vm.shopInfo, passData.pageData);
        vm.shopInfo.address = passData.addressData.address;
      }
    });
  },
  created() {
    this.initShopInfo();
  },
  mounted() {},
  methods: {
    limitPhone(e) {
      this.shopInfo.phone = e.target.value.slice(0, 11);
    },
    initShopInfo() {
      queryShopInfo({}).then(res => {
        if (res.result === "success" && res.data) {
          //如果定位的地址有值，则取定位后的地址
          let posAddress = this.shopInfo.address || ''
          Object.assign(this.shopInfo, res.data);
          if(posAddress) this.shopInfo.address = posAddress
          this.stagImgList = res.data.logoIamgeUrls;
          this.domShow = true;
        }
      });
    },
    //验证添加商品所需字段
    verify() {
      if (!this.achieve) return;
      const { shopName, phone, instruction } = this.shopInfo;
      if (!shopName) {
        this.$alert(`请输入店铺名称！`);
        return;
      } else if (!verifyPhone(phone)) {
        this.$alert(`请输入正确的手机号！`);
        return;
      } else if (!instruction) {
        this.$alert(`请输入店铺介绍！`);
        return;
      }
      this.saveEdit();
    },
    //保存修改
    saveEdit() {
      this.shopInfo.logoIamgeUrls = this.stagImgList;
      let param = this.shopInfo;
      editShopInfo(param).then(res => {
        if (res.result === "success") {
          storage.set("homeRefresh", true);
          this.$router.push({ path: "/my/userInfo" });
        }
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
            if( val.size/1024/1024 > 1 ){
              this.$alert('图片过大，请重新选择');
              return
            }
            resolve(val);
          });
        });
      } else {
        return false;
      }
    },
    changeLoad(file, fileList) {},
    //图片上传成功时
    fileSuccess(res, file) {
      if(res.data){
        this.stagImgList.push(res.data);
        if (this.stagImgList.length == this.limitUploadNum) {
          document
                  .querySelector(".el-upload--picture-card")
                  .setAttribute("style", "display:none;");
        }
      }else{
        this.fileFaild()
      }
    },
    fileFaild() {
      this.$alert("图片上传失败，请重试！");
    },
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
    obtainAddress(){
      let recordData = {
        path: this.$route.path,
        pageData: this.shopInfo
      }
      evokeWxLocation(recordData)
    },
  },
  watch: {
    shopInfo: {
      handler(newVal, oldVal) {
        const { shopName, phone, instruction } = newVal;
        if (shopName && phone && instruction) {
          this.achieve = true;
        } else {
          this.achieve = false;
        }
      },
      deep: true
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './stylus/user.styl';
</style>


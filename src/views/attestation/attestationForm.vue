<template>
  <div class="att-wrap pt90">
    <m-header :isFixed="true" :tit="myTitle" :showShortcutList="false"></m-header>
    <section>
      <!--客户-->
      <div class="att-content" v-if="type==0">
        <div class="c-header">
          <div>
            <h5>填写资料</h5>
            <p>请填写您的详细资料</p>
          </div>
          <i class="icon-customer"></i>
        </div>
        <ul class="c-form">
          <li>
            <span class="required">您的姓名</span>
            <input v-model="formParam.name" maxlength="20" type="text" placeholder="请输入姓名">
          </li>
          <li>
            <span class="required">手机号码</span>
            <input v-model="formParam.phone" type="tel" placeholder="请输入手机号码" readonly>
          </li>
          <!--li>
            <span>店铺名称</span>
            <input v-model="formParam.shopName" maxlength="20" type="text" placeholder="请输入店铺名称">
          </li-->
          <li>
            <span class="mt-ads required">地址</span>
            <textarea
              v-model="formParam.address"
              maxlength="50"
              cols="30"
              rows="3"
              placeholder="请输入地址"
            ></textarea>
            <i @click="obtainAddress" class="position"></i>
          </li>
        </ul>
      </div>
      <!--员工-->
      <div class="att-content" v-if="type==1">
        <div class="c-header">
          <div>
            <h5>填写资料</h5>
            <p>请填写您的详细资料</p>
          </div>
          <i class="icon-staff"></i>
        </div>
        <ul class="c-form">
          <li>
            <span class="required">您的姓名</span>
            <input v-model="formParam.name" maxlength="20" type="text" placeholder="请输入姓名">
          </li>
          <li>
            <span class="required">手机号码</span>
            <input v-model="formParam.phone" type="tel" placeholder="请输入手机号码" readonly>
          </li>
          <!--  <li>
            <span>身份证号</span>
            <input v-model="formParam.cardId" type="tel" placeholder="请输入身份证号">
          </li>
          <li>
            <span class="mt-ads">家庭住址</span>
            <textarea
              v-model="formParam.address"
              maxlength="50"
              cols="30"
              rows="3"
              placeholder="请输入家庭住址"
            ></textarea>
            <i @click="obtainAddress" class="position"></i>
          </li>
          <li>
            <span>入职日期</span>
            <el-date-picker
              class="date-pick-wrap"
              v-model="formParam.hireDate"
              type="date"
              placeholder="请选择入职日期"
            ></el-date-picker>
            <i class="extension"></i>
          </li>-->
        </ul>
      </div>
      <!--店主-->
      <div class="att-content" v-if="type==2">
        <div class="c-header">
          <div>
            <h5>认证提示</h5>
            <p @click="toOpenNew" style="color:red;margin-top:5px;" class="_required">您将要申请店主的店铺是[{{shopName}}]，如需开通自己的线上店铺请点击此处</p>
            <!-- <p style="margin-top:5px;font-size: 0.823529rem;
    color: #999;">店主认证需要上传您的营业执照</p> -->
          </div>
          <i class="icon-owner"></i>
        </div>
        <ul class="c-form">
          <li>
            <span class="required">您的姓名</span>
            <input v-model="formParam.name" maxlength="20" type="text" placeholder="请输入姓名">
          </li>
          <li>
            <span class="required">手机号码</span>
            <input v-model="formParam.phone" type="tel" placeholder="请输入手机号码" readonly>
          </li>
        </ul>
        <div class="upload-viewer">
          <h5 class="required">上传营业执照</h5>
          <p style="margin-top:5px;font-size: 0.823529rem;
    color: #999;">店主认证需要上传您的营业执照</p>
          <div class="upload-area upload-license">
            <upload-file class="license-pic" :img-list="imgList" :limit-num="1" ref="uploadFile"></upload-file>
          </div>
        </div>
      </div>
      <!--开店申请-->
      <div class="att-content" v-if="type==3">
        <div class="c-header">
          <div>
            <h5>公司信息</h5>
            <p>请填写您公司的详细资料</p>
          </div>
          <i class="icon-apply"></i>
        </div>
        <ul class="c-form">
          <li>
            <span class="required">公司名称</span>
            <input v-model="formParam.shopName" maxlength="20" type="text" placeholder="请输入公司名称">
          </li>
          <li>
            <span class="required">手机号码</span>
            <input v-model="formParam.phone" type="tel" placeholder="请输入手机号码" readonly>
          </li>
          <li>
            <span class="required mt-ads">公司地址</span>
            <textarea
              v-model="formParam.address"
              maxlength="50"
              cols="30"
              rows="3"
              placeholder="请输入公司地址"
            ></textarea>
            <i @click="obtainAddress" class="position"></i>
          </li>
        </ul>
        <div class="upload-viewer" style="display: none;">
          <h5 class="required">
            公司形象照
            <span>(公司标志/背景形象墙/前台照片)</span>
          </h5>
          <div class="upload-area">
            <!--<m-upload @file-success="onFileSuccess" @file-removed="onFileRemoved"/>-->
            <upload-file :img-list="imgList" :limit-num="limitUploadNum" ref="uploadFile"></upload-file>
          </div>
          <div class="logos-desc">建议图片宽高比为2:1,如400*200,格式(jpg、png、gif)</div>
        </div>
      </div>
      <!--提交按钮-->
      <div class="att-bottom-btn" :class="{'achieve':achieve}" @click="verify">提交</div>
    </section>
  </div>
</template>

<script>
import storage from "common/storage";
import { applyDealer } from "api/fetch/endCustomer";
import {
  saveAsOurCompanyCustomer,
  applyToOurCompanyEmployee,
  auditEmployee
} from "api/fetch/dealer";
import mUpload from "components/m-upload.vue";
import compress from "common/image";
import { evokeWxLocation } from "common/location";
import identityFn from "./attestationCommon";
import { mapActions } from "vuex";
import uploadFile from "components/upload-file";
import bus from "common/Bus";
export default {
  data() {
    return {
      fieldList: [], //门头照
      fileLicenses: [], //认证图片
      type: 0, //认证类型：0:客户；1:员工；2:店主；3:开店申请；
      formParam: {
        name: "",
        phone: "",
        shopName: "",
        address: "",
        hireDate: "",
        cardId: ""
      }, //提交参数
      imgList: [],
      limitUploadNum: 3,
      mobileNo:-1,
      shopName:""
    };
  },
  components: {
    mUpload,
    uploadFile
  },
  computed: {
    myTitle() {
      const titleArray = [
        "我是客户",
        "我是员工",
        "店主认证",
        "开通我公司线上平台"
      ];
      return titleArray[this.type] || "";
    },
    achieve() {
      const { name, phone, shopName, address } = this.formParam;
      let required = name.trim() && phone && address.trim();
      if (this.type == 1) {
        //identityEmployee
        return name.trim() && phone;
      }
      if (this.type == 2) {
        //identityBoss
        return name.trim() && phone;
      }
      if (this.type == 3) {
        //openStore
        return phone && address.trim() && shopName.trim();
      }
      return required;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let passData = to.query.passData ? to.query.passData : null;
      if (passData) {
        passData = JSON.parse(passData);
        Object.assign(vm.formParam, passData.pageData);
        vm.type = passData.pageData.type || 0;
        vm.formParam.address = passData.addressData.address;
      }
    });
  },
  created() {
    const { type = 0, mobileNo, shopName } = this.$route.query;
    this.type = type;
    this.mobileNo=mobileNo;
    this.shopName=shopName;
    mobileNo && (this.formParam.phone = mobileNo);
  },
  mounted() {
    bus.$off("uploadImgUrls");
    bus.$on("uploadImgUrls", data => {
      if (this.type == 2) {
        this.formParam.fileLicenses = data || [];
      } else {
        this.formParam.fieldList = data || [];
      }
      this._submit();
    });
  },
  methods: {
    ...mapActions(["setUserType"]),
    limitCardId(e) {
      this.formParam.cardId = e.target.value.slice(0, 18);
    },
    transformPic(files = []) {
      return files.map(item => {
        var response = item.response;
        if (response && response.data) {
          return response.data;
        }
      });
    },
    /**m-upload */
    onFileSuccess(file) {
      var response = file.response || {};
      response.result === "success" && this.fieldList.push(file);
    },
    onFileRemoved(file) {
      this.fieldList = this.fieldList.filter(item => item.name != file.name);
    },
    /** 认证大图 自定义模式*/
    processFile(file, next) {
      compress(
        file,
        {
          compress: {
            width: 1024,
            height: 1024 * 2,
            quality: 0.5
          }
        },
        next
      );
    },
    addedHandler() {
      const file = this.fileLicenses[0];
      file && this.$refs.upload.removeFile(file);
    },
    errHandler(file) {
      this.$alert("图片上传失败，请重试");
    },
    verify() {
      if (!this.achieve) return this.$toast("请完善信息后提交");
      if (this.type == 2 || this.type == 3) {
        const fileLength = this.$refs.uploadFile.fileList.length;
        if (fileLength) {
          //上传图片
          this.$refs.uploadFile.submitFile(fileLength);
        } else {
          this._submit();
        }
      } else {
        this._submit();
      }
    },
    _submit() {
      //this.formParam.fileLicenses = this.transformPic(this.fileLicenses);
      //this.formParam.fieldList = this.transformPic(this.fieldList);

      const theType = String(this.type);
      identityFn.call(this, theType, this.formParam);
    },
    //去定位地址
    obtainAddress() {
      this.formParam.type = this.type;
      let recordData = {
        path: this.$route.path,
        pageData: this.formParam
      };
      evokeWxLocation(recordData);
    },
    toOpenNew() {
    this.type=3;
    }
  }
};
</script>

<style lang="stylus">
@import './stylus/attestation.styl';

.upload-license .cube-upload {
  .cube-upload-file, .cube-upload-btn {
    margin: 0;
    h(335);
  }

  .cube-upload-file {
    margin: 0;

    + .cube-upload-btn {
      margin-top: -200px;
      opacity: 0;
    }
  }

  .cube-upload-file-def {
    width: 100%;
    height: 100%;

    .cubeic-wrong {
      display: none;
    }
  }

  .cube-upload-btn {
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
      text-align: center;
    }

    i {
      display: inline-flex;
      squ(80);
      mb(20);
      pos(relative);

      &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 72px;
        height: 1PX;
        transform: translate(-50%, -50%);
        background-color: #BDBDBD;
        transform: translate(-50%, -50%) rotate(90deg);
      }

      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 72px;
        height: 1PX;
        transform: translate(-50%, -50%);
        background-color: #BDBDBD;
      }
    }
  }
}

.upload-license {
  background-color: transparent !important;
  border: none !important;
}

.license-pic /deep/ {
  .upload-wrap {
    width: 100%;
  }

  .el-upload--picture-card {
    width: 100%;
    height: 335px !important;
    background-image: url('../../assets/images/shangchuanzhaopian.png') !important;
    background-color: transparent;
  }

  li {
    width: 100%;

    img {
      width: 100% !important;
      height: 335px !important;
    }
  }
}
</style>


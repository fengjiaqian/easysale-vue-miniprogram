<template>
  <div class="att-wrap pt90">
    <m-header :isFixed="true" :tit="myTitle"></m-header>
    <section>
      <!--客户-->
      <div class="content" v-if="type==0">
        <div class="c-header">
          <div>
            <h5>填写资料</h5>
            <p>请填写您的详细资料</p>
          </div>
          <i class="icon-customer"></i>
        </div>
        <ul class="c-form">
          <li>
            <span>您的姓名</span>
            <input v-model="formParam.name" maxlength="20" type="text" placeholder="请输入姓名">
          </li>
          <li>
            <span>手机号码</span>
            <input v-model="formParam.phone" type="tel" placeholder="请输入手机号码" readonly>
          </li>
          <li>
            <span>店铺名称</span>
            <input v-model="formParam.shopName" maxlength="20" type="text" placeholder="请输入店铺名称">
          </li>
          <li>
            <span>店铺地址</span>
            <textarea
              v-model="formParam.address"
              maxlength="50"
              cols="30"
              rows="2"
              placeholder="请输入店铺地址"
            ></textarea>
            <i @click="obtainAddress" class="position"></i>
          </li>
        </ul>
      </div>
      <!--员工-->
      <div class="content" v-if="type==1">
        <div class="c-header">
          <div>
            <h5>填写资料</h5>
            <p>请填写您的详细资料</p>
          </div>
          <i class="icon-staff"></i>
        </div>
        <ul class="c-form">
          <li>
            <span>您的姓名</span>
            <input v-model="formParam.name" maxlength="20" type="text" placeholder="请输入姓名">
          </li>
          <li>
            <span>手机号码</span>
            <input v-model="formParam.phone" type="tel" placeholder="请输入手机号码" readonly>
          </li>
          <li>
            <span>身份证号</span>
            <input v-model="formParam.cardId" type="tel" placeholder="请输入身份证号">
          </li>
          <li>
            <span>家庭住址</span>
            <textarea
              v-model="formParam.address"
              maxlength="50"
              cols="30"
              rows="2"
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
          </li>
        </ul>
      </div>
      <!--店主-->
      <div class="content" v-if="type==2">
        <div class="c-header">
          <div>
            <h5>店主认证</h5>
            <p>店主认证需要上传您的营业执照</p>
          </div>
          <i class="icon-owner"></i>
        </div>
        <ul class="c-form">
          <li>
            <span>您的姓名</span>
            <input v-model="formParam.name" maxlength="20" type="text" placeholder="请输入姓名">
          </li>
          <li>
            <span>手机号码</span>
            <input v-model="formParam.phone" type="tel" placeholder="请输入手机号码" readonly>
          </li>
        </ul>
        <div class="upload-viewer">
          <h5>上传营业执照</h5>
          <div class="upload-area">
            <!-- <m-upload @file-success="onFileSuccess" @file-removed="onFileRemoved"/> -->
            <!-- <cube-upload
              ref="upload"
              v-model="files"
              :action="uploadImgUrl"
              :process-file="processFile"
              @files-added="addedHandler"
              @file-error="errHandler"
            >
              <div class="clear-fix">
                <cube-upload-file v-for="(file, i) in files" :file="file" :key="i"></cube-upload-file>
                <cube-upload-btn :multiple="false">
                  <div>
                    <i></i>
                    <p style="color:#bdbdbd;font-size: 14px">添加营业执照</p>
                  </div>
                </cube-upload-btn>
              </div>
            </cube-upload>-->
          </div>
        </div>
      </div>
      <!--开店申请-->
      <div class="content" v-if="type==3">
        <div class="c-header">
          <div>
            <h5>店铺资料</h5>
            <p>请填写您公司的详细资料</p>
          </div>
          <i class="icon-apply"></i>
        </div>
        <ul class="c-form">
          <li>
            <span>您的姓名</span>
            <input v-model="formParam.name" maxlength="20" type="text" placeholder="请输入姓名">
          </li>
          <li>
            <span>手机号码</span>
            <input v-model="formParam.phone" type="tel" placeholder="请输入手机号码" readonly>
          </li>
          <li>
            <span>店铺名称</span>
            <input v-model="formParam.shopName" maxlength="20" type="text" placeholder="请输入店铺名称">
          </li>
          <li>
            <span>店铺地址</span>
            <textarea
              v-model="formParam.address"
              maxlength="50"
              cols="30"
              rows="2"
              placeholder="请输入店铺地址"
            ></textarea>
            <i @click="obtainAddress" class="position"></i>
          </li>
        </ul>
        <div class="upload-viewer">
          <h5>门头照片</h5>
          <div class="upload-area">
            <m-upload @file-success="onFileSuccess" @file-removed="onFileRemoved"/>
          </div>
          <div class="logos-desc">尺寸大小2:1,如400*200,格式(jpg、png、gif)</div>
        </div>
      </div>
      <!--提交按钮-->
      <div class="bottom-btn" :class="{'achieve':achieve}" @click="_submit">提交</div>
    </section>
  </div>
</template>

<script>
import { applyDealer } from "api/fetch/endCustomer";
import mUpload from "components/m-upload.vue";
import compress from "common/image";
import { evokeWxLocation } from "common/location";
export default {
  data() {
    return {
      files: [], //申请店铺门头照
      type: 0, //认证类型：0:客户；1:员工；2:店主；3:开店申请；
      formParam: {
        name: "",
        phone: "",
        shopName: "",
        address: "",
        hireDate: "",
        cardId: ""
      } //提交参数
    };
  },
  components: {
    mUpload
  },
  computed: {
    myTitle() {
      const titleArray = ["我是客户", "我是员工", "我是店主", "申请开店"];
      return titleArray[this.type] || "";
    },
    achieve() {
      const { name, phone, shopName, address } = this.formParam;
      return name.trim() && phone && shopName && address.trim();
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let passData = to.query.passData ? to.query.passData : null;
      if (passData) {
        passData = JSON.parse(passData);
        Object.assign(vm.formParam, passData.pageData);
        vm.formParam.address = passData.addressData.address;
      }
    });
  },
  created() {
    this.fieldList = []; //认证图片
    const { type = 0, mobileNo } = this.$route.query;
    this.type = type;
    mobileNo && (this.formParam.phone = mobileNo);
  },
  mounted() {},
  methods: {
    limitCardId(e) {
      this.formParam.cardId = e.target.value.slice(0, 18);
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
          },
          type: "file"
        },
        next
      );
    },
    // _submit() {
    //   let logoIamgeUrls = this.files.map(file => {
    //     const response = file.response;
    //     if (response && response.data) {
    //       return response.data;
    //     }
    //   });
    //   if (!logoIamgeUrls.length) {
    //     return this.$toast("请上传营业执照");
    //   }
    //   shopkeeperCertification(logoIamgeUrls)
    //     .then(res => {
    //       refreshTabPages();
    //       this.$toast("认证申请已提交，请等待审核结果");
    //       this.$router.push({ path: "/navi/mine" });
    //     })
    //     .catch(_ => {});
    // },
    addedHandler() {
      const file = this.files[0];
      file && this.$refs.upload.removeFile(file);
    },
    errHandler(file) {
      this.$alert("图片上传失败，请重试");
    },
    _submit() {
      //判断为空

      //认证类型：0:客户；1:员工；2:店主；3:开店申请；
      const theType = Number(this.type);
      switch (theType) {
        case 0:
          setTimeout(() => {
            this.$router.push({ path: "/navi/home" });
          }, 2000);
          break;
        case 1:
          setTimeout(() => {
            this.$router.push({ path: "/navi/home" });
          }, 2000);
          break;
        case 2:
          setTimeout(() => {
            //如果当前店铺是自己店铺
            this.$router.push({ path: "/navi/home" });
          }, 2000);
          break;
        case 3:
          const { name, phone, shopName, address } = this.formParam;
          const fieldList = this.fieldList.map(item => {
            if (item.response) {
              return item.response.data;
            }
          });
          const params = {
            name,
            phone,
            shopName,
            address,
            fieldList
          };
          applyDealer(params)
            .then(res => {
              this.$toast("恭喜，您已开通线上公司");
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
          break;
        default:
          break;
      }
    },
    //去定位地址
    obtainAddress() {
      let recordData = {
        path: this.$route.path,
        pageData: this.formParam
      };
      evokeWxLocation(recordData);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './stylus/attestation.styl';
</style>


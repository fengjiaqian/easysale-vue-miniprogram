<template>
  <div v-if="domShow" class="pt90">
    <m-header :isFixed="true" :tit="myTitle"></m-header>
    <ul class="user-info-wrap">
      <li>
        <div>{{showStore?`店铺名称：`:`公司名称：`}}</div>
        <input
          v-model="shopInfo.shopName"
          type="text"
          maxlength="20"
          :placeholder="showStore?`请输入店铺名称`:`请输入公司名称`"
        >
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
        <div>{{showStore?`店铺介绍：`:`公司介绍：`}}</div>
        <textarea
          v-model="shopInfo.instruction"
          maxlength="180"
          rows="4"
          :placeholder="showStore?`请输入店铺介绍`:`请输入公司介绍`"
        ></textarea>
      </li>
      <li class="mb-20 uiw-info info-address" >
        <div class="ia-title">{{showStore?`店铺地址：`:`公司地址：`}}</div>
        <div class="ia-value locate-address">
          <textarea
            v-model="shopInfo.address"
            maxlength="50"
            cols="30"
            rows="2"
            :placeholder="showStore?`请输入店铺地址`:`请输入公司地址`"
          ></textarea>
        </div>
        <i @click="obtainAddress" class="position"></i>
      </li>
      <li class="uiw-pic" style="display: none;">
        <div>{{showStore?`门头照片：`:`公司形象照：`}}</div>
        <upload-file :img-list="stagImgList" :limit-num="limitUploadNum" ref="uploadFile"></upload-file>
      </li>
        <li class="mb-20" style="display: none;">
            <div class="logos-desc">建议图片宽高比为2:1,如400*200,格式(jpg、png、gif)</div>
        </li>
    </ul>
    <div class="user-info-edit save" :class="[achieve ? 'save' : 'disable',isIphoneX ? 'isIphoneX':none]"  @click="verify">保存</div>
  </div>
</template>

<script>
import { queryShopInfo, editShopInfo } from "api/fetch/mine";
import storage from "common/storage";
import { verifyPhone } from "common/validate";
import { compress } from "common/util";
import { evokeWxLocation } from "common/location";
import uploadFile from "components/upload-file";
import bus from "common/Bus";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isIphoneX:this.isIphoneX,
      showStore: false,
      myTitle: "",
      shopInfo: {
        shopName: "",
        phone: "",
        instruction: "",
        address: ""
      },
      domShow: false,
      limitUploadNum: 5, //上传图片的限制张数
      stagImgList: [], //暂存的图片数组
      achieve: false
    };
  },
  components: {
    uploadFile
  },
  computed: {
    ...mapGetters(["userInSwitching"]),
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
    this.showStore = this.userType == 3 && !this.userInSwitching;
    this.myTitle = this.showStore ? `店铺信息` : `公司信息`;
    this.initShopInfo();
  },
  mounted() {
    bus.$off("uploadImgUrls")
    bus.$on("uploadImgUrls", (data) => {
      this.shopInfo.logoIamgeUrls = data || []
      this.saveEdit()
    });
  },
  methods: {
    limitPhone(e) {
      this.shopInfo.phone = e.target.value.slice(0, 11);
    },
    initShopInfo() {
      queryShopInfo({}).then(res => {
        if (res.result === "success" && res.data) {
          //如果定位的地址有值，则取定位后的地址
          let posAddress = this.shopInfo.address || "";
          Object.assign(this.shopInfo, res.data);
          if (posAddress) this.shopInfo.address = posAddress;
          this.stagImgList = res.data.logoIamgeUrls;
          this.domShow = true;
        }
      });
    },
    //验证添加商品所需字段
    verify() {
      if (!this.achieve) return;
      const { shopName, phone } = this.shopInfo;
      let insTitle = this.showStore ? `店铺` : `公司`;
      if (!shopName) {
        this.$alert(`请输入${insTitle}名称。`);
        return;
      } else if (!verifyPhone(phone)) {
        this.$alert(`手机号码格式不正确，请核对修改。`);
        return;
      }
      const fileLength =  this.$refs.uploadFile.fileList.length
      if(fileLength){
        //上传图片
        this.$refs.uploadFile.submitFile(fileLength)
        return;
      }else{
          this.shopInfo.logoIamgeUrls = [];
        this.saveEdit()
      }
    },
    //保存修改
    saveEdit() {
      let param = this.shopInfo;
      editShopInfo(param).then(res => {
        if (res.result === "success") {
          storage.set("homeRefresh", true);
          this.$router.push({ path: "/my/userInfo" });
        }
      });
    },
    obtainAddress() {
      let recordData = {
        path: this.$route.path,
        pageData: this.shopInfo
      };
      evokeWxLocation(recordData);
    }
  },
  watch: {
    shopInfo: {
      handler(newVal, oldVal) {
        const { shopName, phone, instruction } = newVal;
        if (shopName && phone) {
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


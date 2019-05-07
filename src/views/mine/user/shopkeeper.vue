
<template>
  <div class="shop-keeper">
    <div class="upload-viewer">
      <h5>上传营业执照</h5>
      <div class="upload-area">
        <m-upload @file-success="onFileSuccess" @file-removed="onFileRemoved"/>
      </div>
    </div>
    <a href="javascript:;" class="authenticate-btn" @click="_submit">立即认证</a>
  </div>
</template>

<script>
import { applyDealer, findCustomerOwerInfo } from "api/fetch/endCustomer";
import { shopkeeperCertification } from "api/fetch/dealer";
import storage from "common/storage";
import { evokeWxLocation } from "common/location";
import compress from "common/image";

import mUpload from "components/m-upload.vue";
import { mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    mUpload
  },
  computed: {},
  created() {
    this.fieldList = [];
  },
  mounted() {
    // this.calculateShape();
  },
  methods: {
    ...mapActions(["setUserType"]),
    onFileSuccess(file) {
      console.log(file);
      var response = file.response || {};
      response.result === "success" && this.fieldList.push(file);
    },
    onFileRemoved(file) {
      this.fieldList = this.fieldList.filter(item => item.name != file.name);
    },
    calculateShape() {
      const clientW =
        document.body.clientWidth || document.documentElement.clientWidth;
      const w = clientW - (80 * clientW) / 750;
      this.$refs.inner.style.width = w + "px";
      this.$refs.inner.style.height = w / 2 + "px";
    },
    _submit() {
      let logoIamgeUrls = this.fieldList.map(file => {
        const response = file.response;
        if (response && response.data) {
          return response.data;
        }
      });
      if (!logoIamgeUrls.length) {
        return this.$toast("请上传营业执照");
      }
      shopkeeperCertification(logoIamgeUrls)
        .then(res => {
          this.$toast("上传成功，等待审核");
          this.$router.push({ path: "/my/mine" });
        })
        .catch(_ => {});
    }
  }
};
</script>

<style lang="stylus">
.upload-hr {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 72px;
  height: 1PX;
  transform: translate(-50%, -50%);
  background-color: #BDBDBD;
}

.inner-viewer {
  pos(relative);
}

.inner-content {
  pos(absolute);
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);

  i {
    block();
    squ(80);
    margin: 0 auto;
    pos(relative);

    &:after {
      @extend .upload-hr;
      transform: translate(-50%, -50%) rotate(90deg);
    }

    &:before {
      @extend .upload-hr;
    }
  }

  span {
    mt(24);
    ft(26);
    c(#bdbdbd);
  }
}

.upload-viewer {
  bg(#fff);
  margin: 20px 16px 0;
  padding: 0 24px 24px;

  h5 {
    ft(30);
    c(#333);
    lh(90);
    border-bottom: 1PX solid #EDEDED;
  }

  .upload-area {
    mt(24);
    border: 1PX dashed #ededed;
    width: 100%;
    h(335);
    background: rgba(250, 250, 250, 1);
  }
}

.authenticate-btn {
  pos(fixed);
  bottom: 0;
  left: 0;
  width: 100%;
  lh(98);
  ft(32);
  c(#fff);
  text-c();
  bg($color-theme);
}
</style>

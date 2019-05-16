
<template>
  <div class="shop-keeper pt90">
    <m-header :isFixed="true"></m-header>
    <div class="upload-viewer">
      <h5>上传营业执照</h5>
      <div class="upload-area upload-license">
        <!-- <m-upload @file-success="onFileSuccess" @file-removed="onFileRemoved"/> -->
        <!--<cube-upload
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
        <upload-file :img-list="imgList" :limit-num="limitUploadNum" ref="uploadFile"></upload-file>
      </div>
    </div>

    <a href="javascript:;" class="authenticate-btn" @click="verify">立即认证</a>
  </div>
</template>

<script>
import { shopkeeperCertification } from "api/fetch/dealer";
import storage from "common/storage";
import compress from "common/image";
import { refreshTabPages } from "common/authStorage";
import mUpload from "components/m-upload.vue";
import uploadFile from "components/upload-file";
import bus from "common/Bus";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      files: [],
      imgList: [],
      limitUploadNum: 1,
      logoIamgeUrls: []
    };
  },
  components: {
    mUpload,
    uploadFile
  },
  computed: {},
  created() {},
  mounted() {
    bus.$off("uploadImgUrls")
    bus.$on("uploadImgUrls", (data) => {
      this.logoIamgeUrls = data || []
      this._submit()
    });
  },
  methods: {
    ...mapActions(["setUserType"]),
    // onFileSuccess(file) {
    //   var response = file.response || {};
    //   response.result === "success" && this.fieldList.push(file);
    // },
    // onFileRemoved(file) {
    //   this.fieldList = this.fieldList.filter(item => item.name != file.name);
    // },
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
    verify() {
      const fileLength =  this.$refs.uploadFile.fileList.length
      if (!fileLength) {
        return this.$toast("请上传营业执照");
      }
      this.$refs.uploadFile.submitFile()
    },
    _submit() {
      shopkeeperCertification(this.logoIamgeUrls)
        .then(res => {
          refreshTabPages();
          this.$toast("认证申请已提交，请等待审核结果");
          this.$router.push({ path: "/navi/mine" });
        })
        .catch(_ => {});
    },
    addedHandler() {
      const file = this.files[0];
      file && this.$refs.upload.removeFile(file);
    },
    errHandler(file) {
      this.$alert("图片上传失败，请重试");
    }
  }
};
</script>

<style lang="stylus">
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

<template>
  <div id="addNewComplaint">
    <m-header :isFixed="true"></m-header>
    <div class="body">
      <div class="reason">
        <p class="title">
          <i>*</i>意见类型
        </p>
        <div class="complaint-type" @click="openDialog">
          <p :style="{color:complaintHeadLine?'#333':'#BDBDBD'}">{{complaintHeadLine||'请选择意见类型'}}</p>
          <img :src="arrowUrl" class="arrow-img">
        </div>
      </div>
      <div class="description">
        <p class="title">
          <i>*</i>内容描述
        </p>
        <textarea
          id="description"
          cols="30"
          rows="9"
          placeholder="请输入意见内容"
          v-model="complaintContent"
        ></textarea>
        <p class="count">{{length}}/100</p>
      </div>
      <!-- <div class="remark">
                <p class="title">备注</p>
                <textarea id="remark" cols="30" rows="6" placeholder="请输入内容"
                          v-model="remark"></textarea>
      </div>-->
      <div class="upload-viewer">
        <p class="title">上传相关图片</p>
        <div class="upload-area upload-license">
          <upload-file :img-list="imgList" :limit-num="limitUploadNum" ref="uploadFile"></upload-file>
        </div>
      </div>
    </div>
    <button class="submit" :class="{'achieve':canOperate,'isIphoneX':isIphoneX}" @click="verify">提交</button>
    <select-dialog
      :roleList="typeList"
      :rolePopShow="rolePopShow"
      title="选择意见类型"
      @closePop="closePop"
      @submitQuery="certain"
    ></select-dialog>
  </div>
</template>

<script>
import { saveComplain } from "api/fetch/complaints";
import storage from "common/storage";
import mHeader from "components/header.vue";
import arrow from "../../assets/images/icon-enter.png";
import selectDialog from "components/select-dialog.vue";
import bus from "common/Bus";
import uploadFile from "components/upload-file";
import { compress } from "common/util";

const arrowUrl = arrow;
export default {
  name: "addNewComplaint",
  data() {
    return {
      logoIamgeUrls: [],
      isIphoneX: this.isIphoneX,
      imgList: [],
      limitUploadNum: 3,
      complaintHeadLine: "",
      complaintContent: "",
      remark: "",
      length: 0,
      arrowUrl: arrowUrl,
      rolePopShow: false,
      complaintType: "",
      typeList: [
        {
          id: 1,
          name: "商品质量"
        },
        {
          id: 2,
          name: "商品日期"
        },
        {
          id: 3,
          name: "商品价格"
        },
        {
          id: 4,
          name: "送货服务"
        },
        {
          id: 5,
          name: "其他问题"
        }
      ]
    };
  },
  components: { mHeader, selectDialog, uploadFile },

  watch: {
    complaintContent(val, oval) {
      this.length = val.length;
    }
  },
  computed: {
    canOperate() {
      return this.complaintHeadLine.trim() && this.complaintContent.trim();
    }
  },
  mounted() {
    bus.$off("uploadImgUrls");
    bus.$on("uploadImgUrls", data => {
      this.logoIamgeUrls = data || [];
      this.addNewComplaint();
    });
  },
  methods: {
    verify() {
      const fileLength = this.$refs.uploadFile.fileList.length;
      if (fileLength) {
        //上传图片
        this.$refs.uploadFile.submitFile(fileLength);
        return;
      } else {
        this.logoIamgeUrls = [];
        this.addNewComplaint();
      }

      // this.$refs.uploadFile.submitFile()
    },

    openDialog() {
      this.rolePopShow = true;
    },

    closePop() {
      this.rolePopShow = false;
    },

    certain(id, name) {
      this.closePop();
      this.complaintType = id;
      this.complaintHeadLine = name;
    },

    /**
     * 校验表单
     * @returns {boolean}
     */
    isValid() {
      let errList = [];
      if (!this.complaintType) {
        errList.push({ errMsg: "请选项意见类型" });
      }
      if (!this.complaintContent) {
        errList.push({ errMsg: "请填写意见内容" });
      }

      if (errList.length !== 0) {
        this.$toast(errList[0].errMsg);
      }
      return errList.length === 0;
    },

    addNewComplaint() {
      if (!this.isValid()) return;
      let params = {
        complaintContent: this.complaintContent,
        complaintHeadLine: this.complaintHeadLine,
        remark: this.remark,
        complaintType: this.complaintType,
        imageList: this.logoIamgeUrls
      };
      saveComplain(params)
        .then(res => {
          this.$toast("新增成功");
          this.$router.go(-1);
        })
        .catch(res => {
          this.$toast(res.message);
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
#addNewComplaint {
  width: 100%;
  height: 100%;
  bg(#f6f6f6);

  .body {
    height: 100%;
    pb(118);
    pt(90);
    overflow: scroll;
  }

  .reason {
    mt(20);
    width: 100%;
    padding: 0 24px;
    bg(#fff);
    overflow: hidden;

    input::-webkit-input-placeholder {
      color: #BDBDBD !important;
      font-size: 30px;
      text-align: left;
    }

    input {
      display: inline-block;
      outline: none;
      margin: 24px 0;
      font-size: 30px;
      c(#333);
    }
  }

  .title {
    padding: 24px 0;
    border-bottom: 1px solid #f6f6f6;
    font-size: 30px;
    c(#333);
    font-weight: bold;

    i {
      c(#E53935);
      ft(32);
    }
  }

  .complaint-type {
    padding: 24px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ft(30);
  }

  .arrow-img {
    h(26);
    w(16);
  }

  .description {
    width: 100%;
    height: 480px;
    margin: 24px 0 24px 0;
    padding: 0 24px 0 24px;
    bg(white);
    overflow: hidden;

    textarea::-webkit-input-placeholder {
      color: #BDBDBD !important;
      font-size: 30px;
      text-align: left;
    }

    textarea {
      width: 100%;
      display: inline-block;
      padding: 24px 0 0 0;
      border: none;
      resize: none;
      outline: none;
      font-size: 30px;
      c(#333);
    }
  }

  .remark {
    width: 100%;
    height: 373px;
    margin: 24px 0 24px 0;
    padding: 0 24px 0 24px;
    bg(white);
    overflow: hidden;

    textarea::-webkit-input-placeholder {
      color: #BDBDBD !important;
      font-size: 30px;
      text-align: left;
    }

    textarea {
      width: 100%;
      display: inline-block;
      padding: 24px 0 0 0;
      border: none;
      resize: none;
      outline: none;
      font-size: 30px;
      c(#333);
    }
  }

  .count {
    text-align: right;
    c(#999);
    margin-bottom: 20px;
  }

  .submit {
    position: fixed;
    bottom: 0;
    left: 0;
    border: 0;
    outline: none;
    width: 100%;
    lh(98);
    bg(#BDBDBD);
    font-size: 32px;
    c(#fff);
    text-align: center;
  }

  .submit.isIphoneX {
    padding-bottom: 34px;
  }

  .achieve {
    bg(#FF5638);
  }

  .upload-viewer {
    bg(#fff);
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
      height: auto;
      background: rgba(250, 250, 250, 1);
    }
  }

  .upload-license {
    background-color: transparent !important;
    border: none !important;
  }
}
</style>


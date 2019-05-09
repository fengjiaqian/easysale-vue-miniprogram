<template>
  <div>
    <cube-upload
      ref="upload"
      :action="uploadImgUrl"
      :simultaneous-uploads="1"
      :process-file="processFile"
      @file-success="onFileSuccess"
      @file-removed="onFileRemoved"
      @file-error="onFileError"
    ></cube-upload>
  </div>
</template>
<script>
import compress from "common/image";
export default {
  name: "m-upload",
  data() {
    return {
      files: []
    };
  },
  computed: {},
  created() {},
  mounted() {
    // this.calculateShape();
  },
  methods: {
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
    onFileSuccess(file) {
      this.$emit("file-success", file);
    },
    onFileRemoved(file) {
      this.$emit("file-removed", file);
    },
    onFileError(file) {
      this.$alert("图片上传失败，请重试");
    },
    calculateShape() {
      const clientW =
        document.body.clientWidth || document.documentElement.clientWidth;
      const w = clientW - (80 * clientW) / 750;
      this.$refs.inner.style.width = w + "px";
      this.$refs.inner.style.height = w / 2 + "px";
    }
  }
};
</script>

<style lang="stylus">
.cube-upload-btn-def, .cube-upload-file-def {
  squ(160);
}

.cube-upload-btn-def > i::before, .cube-upload-btn-def > i::after {
  w(78);
}
</style>

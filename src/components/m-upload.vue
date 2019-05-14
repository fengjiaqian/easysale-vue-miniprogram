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
      @files-added="filesAdded"
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
  mounted() {},
  methods: {
    processFile(file, next) {
      compress(
        file,
        {
          compress: {
            width: 1024,
            height: 1024,
            quality: 0.5
          }
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
    filesAdded(files) {
      let hasIgnore = false;
      const maxSize = 1 * 1024 * 1024; // 1M
      for (let k in files) {
        const file = files[k];
        if (file.size > maxSize) {
          file.ignore = true;
          hasIgnore = true;
        }
      }
      hasIgnore && this.$toast("图片尺寸过大，请压缩后重试");
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

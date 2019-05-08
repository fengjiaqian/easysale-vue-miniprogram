
<template>
  <div class="shop-keeper pt90">
    <m-header :isFixed="true"></m-header>
    <div class="upload-viewer">
      <h5>
        营业执照
        <span class="frt c-theme">认证中</span>
      </h5>
      <div class="upload-area" v-for="file in fieldList" v-if="fieldList.length">
        <img v-lazy="file || ''" class="license-pic" alt>
      </div>
    </div>
    <div class="authentication-desc" v-if="fieldList.length">工作人员正在审核，请耐心等待。</div>
  </div>
</template>

<script>
import { listShopCertificationFile } from "api/fetch/mine";

export default {
  data() {
    return {
      fieldList: []
    };
  },
  components: {},
  computed: {},
  created() {
    this._listShopCertificationFile();
  },
  mounted() {},
  methods: {
    _listShopCertificationFile() {
      listShopCertificationFile()
        .then(res => {
          this.fieldList = res.data || [];
        })
        .catch(err => {});
    }
  }
};
</script>

<style lang="stylus">
.authentication-desc {
  ft(28);
  c(#666);
  lh(118);
  text-c();
}

.license-pic {
  block();
  max-width: 100%;
  height: 100%;
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
</style>

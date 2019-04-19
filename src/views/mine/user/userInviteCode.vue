<template>
  <div class="invite-code-wrap">
    <div class="profile-photo">
      <img v-lazy="avatarUrl">
      <span>{{nickName || '测试'}}</span>
    </div>
    <div class="profile-code">
      <img v-lazy="''" >
    </div>
  </div>
</template>

<script>
  import storage from "common/storage";
  export default {
    data() {
      return {
        nickName: "",
        avatarUrl: "",
      };
    },
    computed: {},
    components: {},
    beforeCreate: function() {},
    created: function() {
      this.nickName = storage.get("nickName", "");
      this.avatarUrl = storage.get("avatarUrl", "");
    },
    beforeDestory() {},
    destoryed() {},
    mounted() {},
    methods: {

    },
    watch: {}
  };
</script>

<style lang="stylus" scoped>
  @import "./stylus/user.styl"
</style>


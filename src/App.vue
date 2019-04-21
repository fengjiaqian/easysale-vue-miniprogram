<template>
  <div id="app">
    <go-back v-show="show"></go-back>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import goBack from "components/go-back.vue";
export default {
  name: "app",
  data() {
    return {
      show: false
    };
  },
  created() {},
  mounted() {},
  components: {
    goBack
  },
  methods: {
    isShowBack(path) {
      return path.indexOf("/navi") === -1;
    }
  },
  watch: {
    "$route.path": {
      handler(newval, oldval) {
        this.show = this.isShowBack(newval);
      }
      //deep: true
      //immediate: true //首次绑定是否执行handler
    }
  }
};
</script>

<style lang="stylus">
.float-icon {
  &:nth-of-type(2) {
    top: 70%;
  }
}
</style>
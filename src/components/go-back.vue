<template>
  <div
    class="go-back float-icon"
    @click="enterCart"
    @touchstart="down($event)"
    @touchmove.prevent="move($event)"
    @touchend="end"
  ></div>
</template>

<script>
import mixin from "common/floatMixin";

export default {
  mixins: [mixin],
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    enterCart() {
      const { name } = this.$route
      /*
      * TODO:
      *  1.地图定位后，点击返回上一页，手动返回到改页面的上一页面
      *  2.商品管理列表，客户管理列表，员工管理列表，返回我的页面
      * */
      switch (name) {
        case 'addCustomerInfo':
          this.$router.push({ path: "/my/customerList" });
          break;
        case 'addStaffInfo':
          this.$router.push({ path: "/my/staffList" });
        case 'productList':
        case 'staffList':
        case 'customerList':
        case 'userInfo':
          this.$router.push({ path: "/navi/mine" });
          break;
        default :
          this.$router.go(-1);
      }
    }
  }
};
</script>

<style lang="stylus">
.go-back {
  position: fixed;
  left: 80%;
  top: 72%;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: url('../assets/images/icon-back.png') center center no-repeat, #fff;
  background-size: 120% 120%;
  z-index: 50;
}
</style>
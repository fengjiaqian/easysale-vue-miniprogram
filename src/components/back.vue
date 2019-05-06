<template>
  <div
    class="back-top"
    @click="$emit('bindClick')"
    @touchstart="down($event)"
    @touchmove.prevent="move($event)"
    @touchend="end"
  ></div>
</template>

<script>
import mixin from "common/floatMixin";
export default {
  name: "back",
  mixins: [mixin],
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="stylus">
.back-top {
  position: fixed;
  left: 80%;
  top: 72%;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: url('../assets/images/ic_back_top.png') center center no-repeat;
  background-size: 120% 120%;
  z-index: 50;
}
</style>
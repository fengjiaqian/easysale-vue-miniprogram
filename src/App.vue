<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import FastClick from "fastclick";
export default {
  name: "app",
  data() {
    return {
      show: false
    };
  },
  created() {},
  mounted() {
   // FastClick.attach(document.body);
    document.body.addEventListener("touchend", function(el) {
      if (el.target.tagName != "INPUT") {
        const els = document.querySelectorAll("input");
        Array.prototype.slice.call(els).forEach(input => {
          input.blur();
        });
      }
    });
  }
};
</script>

<style lang="stylus">

  body{
    padding-bottom: 50px !important;
  }

</style>
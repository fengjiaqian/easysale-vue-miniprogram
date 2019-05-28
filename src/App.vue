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
  import Vue from 'vue'
  // Vue.prototype.isIphoneX = true;
  export default {
    name: "app",
    data() {
      return {
        show: false
      };
    },
    created() {
      this.checkIpx();
    },
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
    },
    methods:{
      checkIpx(){
        var u = navigator.userAgent;
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isIOS) {
          if (screen.height == 812 && screen.width == 375) {
            //是iphoneX
            Vue.prototype.isIphoneX = true;
          }
        }
      }
    }
  };
</script>

<style lang="stylus"></style>
<template>
  <div class="product-wrap-noraml">
    <div class="pw-l" @click="onTap">
      <span :class="{'selected':product.select}"></span>
    </div>
    <div class="pw-r">
      <div class="product-pic-normal">
        <img v-lazy="product.productImageUrl" >
      </div>
      <div class="product-info-normal">
        <h5 class="name">{{product.productName}}</h5>
      </div>
    </div>
  </div>
</template>

<script>
  import bus from "common/Bus";
  export default {
    props: {
      product: {
        type: Object,
        default: {}
      },
    },
    data() {
      return {

      };
    },
    components: {

    },
    created() {

    },
    mounted() {},
    methods: {
      onTap(){
        //this.product.select = !this.product.select
        bus.$emit("selectProduct", this.product)
      }

    },
  };
</script>

<style lang="stylus" scoped>
  @import "./product-manage.styl"
</style>


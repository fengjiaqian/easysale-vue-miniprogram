<template>
  <div class="product-wrap-noraml">
    <div class="pw-l" @click="onTap">
      <span :class="{'selected':product.select}"></span>
    </div>
    <div class="pw-r">
      <div class="product-pic-normal" @click="goDetail">
        <img v-lazy="product.productImageUrl" >
      </div>
      <div class="product-info-normal" @click="goDetail">
        <h5 class="name">{{product.productName}}</h5>
        <div style="flex:1;"></div>
        <div class="price">规格：{{product.specification}}</div>
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
      source: {
        type: String,
        default: ''
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
      },
      goDetail(){
        if(this.source){
          this.$router.push({
            path: "/my/productDetail",
            query: {
              id: this.product.id,
              source: this.source
            }
          })
        }
      },
    },
  };
</script>

<style lang="stylus" scoped>
  @import "./product-manage.styl"
</style>


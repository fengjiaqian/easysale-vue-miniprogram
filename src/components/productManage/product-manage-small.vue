<template>
  <div class="product-wrap">
    <div class="pw-l" @click="onTap">
      <span :class="{'selected':product.select}"></span>
    </div>
    <div class="pw-r">
      <div class="product-pic-small">
        <img v-lazy="product.productImageUrl" >
      </div>
      <div class="product-info-small">
        <h5 class="name">{{product.productName}}</h5>
        <div style="flex:1;"></div>
        <div class="spec">
          <span>规格 {{product.specification}}</span>
          <span class="price">{{product.price}} 元/{{product.priceUnit}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
        this.product.select = !this.product.select
      }

    },
  };
</script>

<style lang="stylus" scoped>
  @import "./product-manage.styl"
</style>


<template>
  <div class="product-wrap" @click="goToDetail">
    <div class="pw-l">
      <span></span>
    </div>
    <div class="pw-r">
      <div class="product-pic">
        <img v-lazy="''" >
      </div>
      <div class="product-info">
        <h5 class="name">
          <i v-if="product.productType == 1" class="tag">自有</i>
          <span>{{product.productName}}</span>
        </h5>
        <div class="spec">
          <span>规格 {{product.specification}}</span>
        </div>
        <div style="flex:1;"></div>
        <div class="price">¥{{product.price}}<span>元/{{product.priceUnit}}</span></div>
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
      goToDetail(){
        const code = this.product.id;
        this.$router.push({
          path: "/my/productDetail",
          query: {
            code
          }
        });
      },
    }
  };
</script>

<style lang="stylus" scoped>
  @import "./product-manage.styl"
</style>


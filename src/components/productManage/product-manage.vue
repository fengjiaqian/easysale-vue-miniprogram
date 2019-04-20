<template>
  <div class="product-wrap">
    <div class="pw-l" @click="onTap">
      <span :class="{'selected':product.select}"></span>
    </div>
    <div class="pw-r" @click="goToDetail">
      <div class="product-pic">
        <img v-lazy="product.productImageUrl" >
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
        <div class="price" v-html="$options.filters.normalPrice(product.price, product.priceUnit)"></div>
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
      onTap(){
        this.product.select = !this.product.select
      }

    },
  };
</script>

<style lang="stylus" scoped>
  @import "./product-manage.styl"
</style>


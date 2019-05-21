<template>
  <div class="product-wrap">
    <div class="pw-l" @click="onTap">
      <span :class="{'selected':product.select}"></span>
    </div>
    <div class="pw-r" @click="goToDetail">
      <div class="product-content">
        <div class="product-pic">
          <img v-lazy="product.productImageUrl" >
        </div>
        <div class="product-info">
          <h5 class="name">
            <i v-if="product.productType == 1" class="tag">自有</i>
            <i v-if="product.state" :class="[product.state==1 ? 's-success' : 's-fail']">{{product.state==1?'上架':'下架'}}</i>
            <span>{{product.productName}}</span>
          </h5>
          <div class="grama">
            <span class="brand">品牌 {{product.brandName}}</span>
          </div>
          <div class="spec">
            <span>规格 {{product.specification}}</span>
          </div>
          <div style="flex:1;"></div>
          <div class="price" v-html="$options.filters.normalPrice(product.price, product.priceUnit)"></div>
          <h5 class="name">
            <i v-if="product.remark" :class="'s-success'">{{product.remark}}</i>
          </h5>


        </div>
      </div>
      <!--商品设置项-->
      <div class="product-option" v-if="product.returnState || product.awardState || product.displayState">
        <span v-if="product.returnState">可退货</span>
        <span v-if="product.awardState">可兑奖</span>
        <span v-if="product.displayState">可陈列</span>
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
        const id = this.product.id;
        if(!id) return
        this.$router.push({
          path: "/my/productDetail",
          query: {
            id
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


<template>
  <div class="product-add-wrap">
    <div>
      <ul class="add-column">
        <li>
          <span>商品名称：</span>
          <input v-model="productModal.productName" :readonly="productType==0" type="text" maxlength="30" placeholder="请输入商品名称">
        </li>
        <li>
          <span>商品品牌：</span>
          <input v-model="productModal.brandName" :readonly="productType==0"  unselectable="on" type="text" maxlength="30" placeholder="请输入商品品牌">
        </li>
        <li>
          <span>商品价格：</span>
          <input v-model="productModal.price" type="number" class="price" placeholder="请输入商品价格">
          <i>元</i>
        </li>
      </ul>
      <div class="upload-pic-wrap">
        <span>商品图片</span>
        <ul></ul>
      </div>
      <div class="product-introduce">
        <span>商品介绍：</span>
        <textarea v-model="productModal.description" :readonly="productType==0" maxlength="180" rows="4" placeholder="请输入介绍文字"></textarea>
      </div>
    </div>
    <div class="confirm" @click="verify">确认</div>
  </div>
</template>

<script>
  import { editProduct } from "api/fetch/mine";
  export default {
    data() {
      return {
        productModal: {
          dealerId: '19990530',//经销商id
          id: '',//商品id
          brandName: '',//品牌
          productName: '',//商品名称
          price: '',//商品价格
          productImageUrl: '',//商品图片地址
          description: '',//商品介绍
          priceUnit: '',//价格单位
          productType: '',//商品类型
          specification: '',//产品规格
          effectiveDate: null,//生效时间
          createUser: '465273',
        },
        productType: 0, //产品类型 0=酒批 1=经销商
      };
    },
    components: {

    },
    computed: {

    },
    created() {
      let productInfo = JSON.parse(localStorage.getItem('productInfo'))
      Object.assign(this.productModal,productInfo)
      this.productType = productInfo.productType
    },
    methods: {
      //验证添加商品所需字段
      verify(){
        const { productName,brandName,price,description } = this.productModal
        if(!productName){
          this.$alert(`请输入商品名称！`)
          return
        }else if(!brandName){
          this.$alert(`请输入商品品牌！`)
          return
        }else if(!price){
          this.$alert(`请输入商品价格！`)
          return
        }else if(!description){
          this.$alert(`请输入商品介绍信息！`)
          return
        }
        this.saveAdd()
      },
      saveAdd(){
        editProduct(this.productModal).then(res => {
          if (res.result === "success") {
             //商品添加成功后回到商品详情
            this.$router.go(-1)
          }
        });
      },
    }
  };
</script>

<style lang="stylus" scoped>
  @import "stylus/productManage.styl"
</style>


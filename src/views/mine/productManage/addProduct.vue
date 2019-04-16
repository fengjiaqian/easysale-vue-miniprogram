<template>
  <div class="product-add-wrap">
    <div>
      <ul class="add-column">
        <li>
          <span>商品名称：</span>
          <input v-model="productModal.productName" type="text" maxlength="30" placeholder="请输入商品名称">
        </li>
        <li>
          <span>商品品牌：</span>
          <input v-model="productModal.brandName" type="text" maxlength="30" placeholder="请输入商品品牌">
        </li>
        <li>
          <span>商品价格：</span>
          <input v-model="productModal.price" type="number" class="price" placeholder="请输入商品价格">
          <i>元</i>
        </li>
        <li>
          <span>价格单位：</span>
          <input v-model="productModal.priceUnit" type="text" maxlength="10" placeholder="请输入价格单位，如瓶、件">
        </li>
        <li>
          <span>产品规格：</span>
          <input v-model="productModal.specification" type="text" maxlength="10" placeholder="请输入产品规格">
        </li>
      </ul>
      <div class="upload-pic-wrap">
        <span>商品图片</span>
        <ul></ul>
      </div>
      <div class="product-introduce">
        <span>商品介绍：</span>
        <textarea v-model="productModal.description" maxlength="180" rows="4" placeholder="请输入介绍文字"></textarea>
      </div>
    </div>
    <div class="confirm" @click="verify">确认</div>
  </div>
</template>

<script>
  import { addProduct } from "api/fetch/mine";
  export default {
    data() {
      return {
        dealerId: '19990530',
        createUser: '465273',
        productModal: {
          productSpecificationId: null,
          brandName: '',
          productName: '',
          price: '',
          productImageUrl: '',
          description: '',
          priceUnit: '',
          productType: 1, //类型 0=酒批 1=经销商
          specification: '',
          effectiveDate: ''
        },
      };
    },
    components: {

    },
    computed: {

    },
    created() {

    },
    methods: {
      //验证添加商品所需字段
      verify(){
        const { productName,brandName,price,priceUnit,specification,description } = this.productModal
        if(!productName){
          this.$alert(`请输入商品名称！`)
          return
        }else if(!brandName){
          this.$alert(`请输入商品品牌！`)
          return
        }else if(!price){
          this.$alert(`请输入商品价格！`)
          return
        }else if(!priceUnit){
          this.$alert(`请输入商品价格单位！`)
          return
        }else if(!specification){
          this.$alert(`请输入商品规格！`)
          return
        }else if(!description){
          this.$alert(`请输入商品介绍信息！`)
          return
        }
        this.saveAdd()
      },
      saveAdd(){
        let param = {
          dealerId: this.dealerId,
          createUser: this.createUser,
          productList: [this.productModal]
        }
        addProduct(param).then(res => {
          if (res.result === "success") {
             //商品添加成功后回到商品管理列表页
            this.$router.push({ path: "/my/productList" });
          }
        });
      },
    }
  };
</script>

<style lang="stylus" scoped>
  @import "stylus/productManage.styl"
</style>


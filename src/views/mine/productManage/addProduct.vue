<template>
  <div class="product-add-wrap pt90">
       <m-header :isFixed="true"></m-header>
    <div class="product-edit-content">
      <ul class="add-column">
        <li>
          <span>商品名称：</span>
          <input v-model="productModal.productName" type="text" maxlength="30" placeholder="请输入商品名称">
        </li>
        <li>
          <span>商品品牌：</span>
          <input v-model="productModal.brandName" type="text" maxlength="20" placeholder="请输入商品品牌">
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
        <ul class="img-list">
          <li v-for="(item,index) in fileList">
            <img :src="item.url">
            <i @click="deleteUploadImg(index)"></i>
          </li>
          <el-upload class="upload-wrap"
                     :action="uploadImgUrl"
                     list-type="picture-card"
                     :headers="headers"
                     :before-upload="onBeforeUpload"
                     :on-change="changeLoad"
                     :on-progress="progressUpload"
                     :on-success="fileSuccess"
                     :on-error="fileFaild"
                     accept="image/*"
                     >
          </el-upload>
        </ul>
      </div>
      <div class="product-introduce">
        <span>商品介绍：</span>
        <textarea v-model="productModal.description" maxlength="180" rows="4" placeholder="请输入介绍文字"></textarea>
      </div>
      <div class="set-property">
        <h5>设置商品属性</h5>
        <ul class="option-list">
          <li>
            <span>可退货</span>
            <i @click="switchOption('return')" :class="{'open':productModal.returnState}"></i>
          </li>
          <li>
            <span>可兑奖</span>
            <i @click="switchOption('award')" :class="{'open':productModal.awardState}"></i>
          </li>
          <li>
            <span>可陈列</span>
            <i @click="switchOption('display')" :class="{'open':productModal.displayState}"></i>
          </li>
        </ul>
        <div class="reward-column" v-if="productModal.displayState">
          <span>陈列奖励：</span>
          <textarea v-model="productModal.displayAward" cols="30" rows="3" placeholder="请输入陈列奖励"></textarea>
        </div>
      </div>
    </div>
    <div class="confirm" :class="{'achieve':achieve}" @click="verify">确认</div>
  </div>
</template>

<script>
  import { addProduct,uploadImg } from "api/fetch/mine";
  import storage from "common/storage";
  import { compress } from "common/util";
  export default {
    data() {
      return {
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
          effectiveDate: '',
          returnState: 0,//退换
          awardState: 0,//兑奖
          displayState: 0,//陈列
          displayAward: '',//陈列奖励（选填）
        },
        limitUploadNum: 1,//上传图片的限制张数
        fileList: [],
        achieve: false,//能否保存
      };
    },
    components: {

    },
    computed: {
      headers() {
        const token = storage.get("token", "");
        return {
          'token': token,
      }
      }
    },
    created() {
      const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
    },
    methods: {
      //验证添加商品所需字段
      verify(){
        if(!this.achieve) return;
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
          productList: [this.productModal]
        }
        addProduct(param).then(res => {
          if (res.result === "success") {
             //商品添加成功后回到商品管理列表页
            this.$router.push({ path: "/my/productList" });
          }
        });
      },
      //图片上传前验证
      onBeforeUpload(file){
        const isIMAGE = file.type === 'image/jpeg'||'image/gif'||'image/png';
        const isLt1M = file.size / 1024 / 1024 < 10;
        if (!isIMAGE) {
          this.$alert('上传文件只能是图片格式!');
        }
        if (!isLt1M) {
          this.$alert('上传文件大小不能超过 10MB!');
        }
        if(isIMAGE && isLt1M){
          //console.log('压缩前',file)
          return new Promise((resolve, reject)=>{
            compress(file, function(val) {
              //console.log('压缩后',val)
              if( val.size/1024/1024 > 1 ){
                this.$alert('图片过大，请重新选择');
                return
              }
              resolve(val)
            })
          })
        }else{
          return false
        }
      },
      changeLoad(file, fileList){

      },
      //图片上传时
      progressUpload(event, file, fileList){

      },
      //图片上传成功时
      fileSuccess(res, file) {
        if(res.data){
          this.fileList.unshift(file)
          if(this.fileList.length == this.limitUploadNum){
            document.querySelector('.el-upload--picture-card').setAttribute('style', 'display:none;')
          }
          this.productModal.productImageUrl = res.data
        }else{
          this.fileFaild()
        }
      },
      fileFaild(){
        this.$alert('图片上传失败！')
      },
      deleteUploadImg(idx){
        this.fileList = this.fileList.filter((item,index)=>{
          return idx!=index
        })
        if(this.fileList.length < this.limitUploadNum){
          document.querySelector('.el-upload--picture-card').removeAttribute('style')
        }
        this.productModal.productImageUrl = ''
      },
      //切换商品设置
      switchOption(type){
        const {returnState,awardState,displayState} = this.productModal
        switch (type) {
          case `return`:
            this.productModal.returnState = returnState ==1 ? 0 : 1
            break;
          case `award`:
            this.productModal.awardState = awardState ==1 ? 0 : 1
            break;
          case `display`:
            this.productModal.displayState = displayState ==1 ? 0 : 1
            break;
          default :
            break;
        }
      },
    },
    watch: {
      productModal: {
        handler(newVal, oldVal) {
          const { productName,brandName,price,priceUnit,specification,description,productImageUrl } = newVal
          if(productName && brandName && price && priceUnit && specification && description && productImageUrl){
            this.achieve = true
          }else{
            this.achieve = false
          }
        },
        deep: true
      },
    }
  };
</script>

<style lang="stylus" scoped>
  @import "stylus/productManage.styl"
</style>


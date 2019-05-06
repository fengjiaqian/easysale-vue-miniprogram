<template>
  <div class="product-add-wrap pt90">
       <m-header :isFixed="true"></m-header>
    <div class="product-edit-content">
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
        <ul class="img-list">
          <li v-for="(item,index) in stagImgList">
            <img :src="item">
            <i @click="deleteUploadImg(index)" v-if="productType==1"></i>
          </li>
          <el-upload class="upload-wrap"
                     :action="uploadImgUrl"
                     list-type="picture-card"
                     :headers="headers"
                     :before-upload="onBeforeUpload"
                     :on-change="changeLoad"
                     :on-success="fileSuccess"
                     :on-error="fileFaild"
                     accept="image/*">
          </el-upload>
        </ul>
      </div>
      <div class="product-introduce">
        <span>商品介绍：</span>
        <textarea v-model="productModal.description" :readonly="productType==0" maxlength="180" rows="4" placeholder="请输入介绍文字"></textarea>
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
        <div class="reward-column">
          <span>陈列奖励：</span>
          <textarea cols="30" rows="3" placeholder="请输入陈列奖励"></textarea>
        </div>
      </div>
    </div>
    <div class="confirm" :class="{'achieve':achieve}" @click="verify">确认</div>
  </div>
</template>

<script>
  import { editProduct } from "api/fetch/mine";
  import storage from "common/storage";
  import { compress } from "common/util";
  export default {
    data() {
      return {
        productModal: {
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
          returnState: 0,//退换
          awardState: 0,//兑奖
          displayState: 0,//陈列
        },
        productType: 0, //产品类型 0=酒批 1=经销商 ,酒批产品只能改价格
        limitUploadNum: 1,//上传图片的限制张数
        stagImgList: [],//暂存的图片数组
        achieve: false,//能否保存
        setOptions: [
          {title:`可退货`,switch:0},
          {title:`可兑奖`,switch:0},
          {title:`可陈列`,switch:0},
        ],//商品属性设置项
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
      let productInfo = JSON.parse(localStorage.getItem('productInfo'))
      Object.assign(this.productModal,productInfo)
      this.productType = productInfo.productType
      this.stagImgList = [productInfo.productImageUrl]
      //酒批产品只能修改价格
      if(this.stagImgList.length == this.limitUploadNum || this.productType == 0){
        this.$nextTick(() => {
          document.querySelector('.el-upload--picture-card').setAttribute('style', 'display:none;')
        });
      }
    },
    methods: {
      //验证添加商品所需字段
      verify(){
        if(!this.achieve) return;
        const { productName,brandName,price,description } = this.productModal
        if(this.productType == 0){
          if(!price){
            this.$alert(`请输入商品价格！`)
            return
          }
        }else{
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
        }
        this.saveAdd()
      },
      saveAdd(){
        if(this.stagImgList.length&&this.productType==1){
          this.productModal.productImageUrl = this.stagImgList[0]
        }
        editProduct(this.productModal).then(res => {
          if (res.result === "success") {
             //商品添加成功后回到商品详情
            this.$router.go(-1)
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
          return new Promise((resolve, reject)=>{
            compress(file, function(val) {
              resolve(val)
            })
          })
        }else{
          return false
        }
      },
      changeLoad(file, fileList){

      },
      //图片上传成功时
      fileSuccess(res, file) {
        this.stagImgList.push(res.data)
        if(this.stagImgList.length == this.limitUploadNum){
          document.querySelector('.el-upload--picture-card').setAttribute('style', 'display:none;')
        }
      },
      fileFaild(){
        this.$alert('图片上传失败，请重试！')
      },
      //删除图片
      deleteUploadImg(idx){
        this.stagImgList = this.stagImgList.filter((item,index)=>{
          return idx!=index
        })
        if(this.stagImgList.length < this.limitUploadNum){
          document.querySelector('.el-upload--picture-card').removeAttribute('style')
        }
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
          //酒批productType=0 只能修改价格
          if(this.productType == 0){
            if(price){
              this.achieve = true
            }else{
              this.achieve = false
            }
          }else{
            if(productName && brandName && price && priceUnit && specification && description && productImageUrl){
              this.achieve = true
            }else{
              this.achieve = false
            }
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


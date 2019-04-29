<template>
  <section class="perform-wrap pt90" v-if="domShow">
    <m-header :isFixed="true"></m-header>
    <div class="perform-title">
      <div>陈列状态：<span>{{stateContent}}</span></div>
      <p v-if="performContent">{{performContent}}</p>
      <div class="remark-wrap" v-if="performInfo.state&&performInfo.comments">
        <h5>
          <span>{{performInfo.dealerDto.shopName}}回复：</span>
          <span class="time">{{performInfo.update_time}}</span>
        </h5>
        <p>{{performInfo.comments}}</p>
      </div>
    </div>
    <ul class="et-content">
      <li>
        <h5>陈列商品</h5>
        <div class="product">
          <img v-lazy="product.productImageUrl" >
          <p>{{product.productName}}</p>
        </div>
      </li>
      <li>
        <h5>陈列要求</h5>
        <div class="require">
          <p>{{performInfo.shopDisplayItemDto.display_rule}}</p>
          <p class="reward">{{performInfo.shopDisplayItemDto.display_reward}}</p>
        </div>
      </li>
      <li class="perform-case" v-if="performInfo.state!=0&&type!=1">
        <div class="pc-title">
          <span>执行情况</span>
          <span class="detail" @click="goRecord">查看详情</span>
        </div>
        <div class="pc-content">
          <p>执行周期：{{performInfo.shopDisplayItemDto.display_days}}天，共{{performInfo.shopDisplayItemDto.total_periods}}期，当前第{{performInfo.periods}}期</p>
          <p>已上传{{nperNum.uploadedNum}}期，共有<i>{{nperNum.unloadedNum}}</i>期未按时上传</p>
          <!--上传陈列图片-->
          <div class="upload-column" v-if="showUpload">
            <ul class="upload-column-list">
              <li v-for="(item,index) in fileList">
                <img :src="item.url">
                <i @click="deleteUploadImg(index)"></i>
              </li>
              <el-upload class="upload-wrap-large"
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
            <div class="upload-btn" @click="uploadNper" :class="{'achieve':achieve}">上传</div>
          </div>
          <div class="nper-column" :class="{'nper-more':showMoreNper}" >
            <span v-for="(item,idx) in performInfo.displayitemphotoDtos">
              {{idx+1}}
              <i :class="{'faild':item.state==0}"></i>
            </span>
          </div>
          <div class="scale-btn"
               @click="showMoreNper=!showMoreNper"
               v-if="performInfo.periods>10">
            {{showMoreNper?`收起`:`展开更多`}}
          </div>
        </div>
      </li>
      <li>
        <h5>陈列周期</h5>
        <div class="require">
          <p>{{performInfo.display_days}}天</p>
        </div>
      </li>
      <li>
        <h5>上传周期</h5>
        <div class="require">
          <p>{{performInfo.photo_space_day}}天</p>
        </div>
      </li>
      <li>
        <h5>奖励</h5>
        <div class="require">
          <p>{{performInfo.display_rule}}</p>
        </div>
      </li>
      <li>
        <h5>商贸公司</h5>
        <div class="require">
          <p>{{performInfo.dealerDto ? performInfo.dealerDto.shopName : '经销商店铺'}}</p>
        </div>
      </li>
      <li>
        <h5>申请截止日期</h5>
        <div class="require">
          <p>{{performInfo.end_time}}</p>
        </div>
      </li>
    </ul>

    <!--申请按钮-->
    <section v-if="type==1">
      <div class="et-footer">
        <span class="ex-apply" @click="applyEx">申请</span>
      </div>
    </section>

  </section>
</template>

<script>
  import { querySaleExhibitDetail,oprateExhibit,uploadExhibitNper,queryExhibitDetail,applyExhibit } from "api/fetch/exhibit";
  import { compress } from "common/util";
  import storage from "common/storage";
  export default {
    data() {
      return {
        performInfo: {},
        product:{},
        domShow: false,
        id: '',
        nperNum: {},
        limitUploadNum: 1,//上传图片的限制张数
        fileList: [],
        productImageUrl: '',//
        achieve: false,//能否上传
        showUpload: false,//是否有上传按钮
        type: null,//type==1 是可申请详情
        showMoreNper: false,//展示更多的执行期数
      };
    },
    components: {

    },
    computed: {
      stateContent() {
        const { state } = this.performInfo
        let content = state == 0 ? `可申请` :
                state == 1 ? `已拒绝` :
                state == 2 ? `进行中` :
                state == 3 ? `已到期` :
                state == 4 ? `已完成，收到陈列奖品` :
                state == 5 ? `已拒绝，拒绝兑奖` : ``
        if(this.$route.query.type==1){
          content = `可申请`
        }
        return content
      },
      performContent() {
        const { state } = this.performInfo
        const { uploadedNum,unloadedNum } = this.nperNum
        let content
        if(state == 2){
          content = `该客户已提交${uploadedNum}期，有${unloadedNum}期未按时提交。`
        }else if(state == 3){
          if(unloadedNum == 0){
            content = `陈列周期到期，该客户圆满完成陈列任务。`
          }else{
            content = `陈列周期到期，该客户没有完成陈列任务`
          }
        }else if(state == 4){
          content = `已成功发放奖励。`
        }else if(state == 5){
          content = ``
        }else if(state == 1){
          content = ``
        }
        return content
      },
      headers() {
        const token = storage.get("token", "");
        return {
          'token': token,
        }
      }
    },
    created() {
      this.id = this.$route.query.id
      this.type = this.$route.query.type
      this.queryDetail(this.type)
    },
    mounted() {},
    methods: {
      queryDetail(type){
        let queryApi = querySaleExhibitDetail
        if(type == 1) queryApi = queryExhibitDetail
          queryApi(this.id).then(res => {
          if (res.result === "success") {
            this.performInfo = res.data
            if(type == 1){
              this.performInfo.shopDisplayItemDto = {}
              Object.assign(this.product,res.data.dealerProductDTO)
              Object.assign(this.performInfo.shopDisplayItemDto,res.data)
            }else{
              Object.assign(this.product,res.data.shopDisplayItemDto.dealerProductDTO)
              if(this.performInfo.state == 2 || this.performInfo.state == 3){
                let nperNum = this.calculateNper(this.performInfo.displayitemphotoDtos)
                Object.assign(this.nperNum,nperNum)
              }
              if(this.performInfo.state==2&&this.performInfo.displayitemphotoDto.state==0){
                this.showUpload = true
              }
              const {display_days,display_reward,display_rule,end_time,photo_space_day} = res.data.shopDisplayItemDto
              Object.assign(this.performInfo,{display_days,display_reward,display_rule,end_time,photo_space_day})
            }
            this.domShow = true
          }
        }).catch(err => {
          this.$toast(err.message)
        })
      },
      //查看执行详情
      goRecord(){
        this.$router.push({
          path: "/performRecord",
          query: {id: this.performInfo.id}
        });
      },
      //计算用户执行中，已上传以及未上传的期数
      calculateNper(arr){
        let uploadedNum = 0  //已上传数
        let unloadedNum = 0   //未上传数
        for(let item of arr){
          if(item.state == 1){
            uploadedNum += 1
          }else{
            unloadedNum += 1
          }
        }
        return {
          uploadedNum,
          unloadedNum
        }
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
        this.fileList.unshift(file)
        if(this.fileList.length == this.limitUploadNum){
          document.querySelector('.el-upload--picture-card').setAttribute('style', 'display:none;')
        }
        this.productImageUrl = res.data
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
        this.productImageUrl = ''
      },
      //上传期数
      uploadNper(){
        if(!this.achieve) return
        const { id,sign_id } = this.performInfo.displayitemphotoDto
        let param = {
          id,
          sign_id,
          path: this.productImageUrl
        }
        uploadExhibitNper(param).then(res => {
          if (res.result === "success") {
            this.$toast(`操作成功！`)
            this.queryDetail('')
          }
        }).catch(err => {
          this.$toast(err.message)
        })
      },
      //点击申请签约
      applyEx(){
        if(this.isVisitor){
          this.navigateToLogin()
          return
        }
        let param = {
          display_Id: this.id
        }
        applyExhibit(param).then(res => {
          if (res.result === "success") {
            this.$toast(`申请成功！`)
            this.$router.push({ path: "/saleExhibitList" });
          }
        }).catch(err => {
          this.$toast(err.message)
        })
      },
    },
    watch: {
      productImageUrl: function(val) {
        if(val){
          this.achieve = true
        }else{
          this.achieve = false
        }
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import "./stylus/exhibit.styl"
</style>


<template>
  <section class="perform-wrap pt90" v-if="domShow">
    <m-header :isFixed="true"></m-header>
    <div class="perform-title">
      <div>陈列状态：<span>{{stateContent}}</span></div>
      <p v-if="performContent">{{performContent}}</p>
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
      <li class="perform-case" v-if="performInfo.state!=0">
        <div class="pc-title">
          <span>执行情况</span>
          <span class="detail" @click="goRecord">查看详情</span>
        </div>
        <div class="pc-content">
          <p>执行周期：{{performInfo.shopDisplayItemDto.display_days}}天，共{{performInfo.shopDisplayItemDto.total_periods}}期，当前第{{performInfo.periods}}期</p>
          <p>已上传{{nperNum.uploadedNum}}期，共有<i>{{nperNum.unloadedNum}}</i>期未按时上传</p>
          <div class="nper-column">
            <span v-for="(item,idx) in performInfo.displayitemphotoDtos">
              {{idx+1}}
              <i :class="{'faild':item.state==0}"></i>
            </span>
          </div>
          <div class="scale-btn" v-if="performInfo.periods>10">展开更多</div>
        </div>
      </li>
      <li>
        <h5>客户信息</h5>
        <div class="customer-info">
          <p>客户姓名：{{performInfo.customerInfoDTO.name}}</p>
          <p>手机号码：{{performInfo.customerInfoDTO.phone}}
            <a class="tel" :href="'tel:'+performInfo.customerInfoDTO.phone"></a>
          </p>
          <p>申请时间：{{performInfo.create_time}}</p>
          <p>销售负责人：{{performInfo.customerInfoDTO.salesmen}}</p>
        </div>
      </li>
      <li class="remark" v-if="performInfo.state == 0 || performInfo.state == 3">
        <h5>备注<span>(若拒绝，则必须填写拒绝原因)</span></h5>
        <textarea v-model="oprateParam.comments" cols="30" rows="6" placeholder="请输入内容"></textarea>
      </li>
    </ul>
    <div class="et-footer" v-if="performInfo.state==0">
      <span class="refuse" @click="oprateApply(`refuse`)">拒绝</span>
      <span class="agree" @click="oprateApply(`agree`)">同意</span>
    </div>
    <div class="et-footer" v-if="performInfo.state==3">
      <span class="refuse" @click="oprateApply(`refuseReward`)">拒绝发放</span>
      <span class="agree" @click="oprateApply(`agreeReward`)">发放奖励</span>
    </div>
  </section>
</template>

<script>
  import { queryPerformDetail,oprateExhibit } from "api/fetch/exhibit";
  export default {
    data() {
      return {
        performInfo: {},
        product:{},
        domShow: false,
        id: '',
        oprateParam: {
          state: 0,//状态  1=拒绝审核  2=审核通过      已完成(4=发放奖励  5拒绝发放奖励)
          comments: ''//拒绝原因
        },
        nperNum: {},
      };
    },
    components: {

    },
    computed: {
      stateContent() {
        const { state } = this.performInfo
        let content = state == 0 ? `待审核` :
                state == 2 ? `执行中` :
                state == 3 ? `已到期` :
                state == 4 || state == 5 ? `已完成` : ``
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
          content = `已拒绝发放奖励。`
        }else if(state == 1){
          content = ``
        }
        return content
      },
    },
    created() {
      this.id = this.$route.query.id
      this.queryDetail()
    },
    mounted() {},
    methods: {
      queryDetail(){
        queryPerformDetail(this.id).then(res => {
          if (res.result === "success") {
            this.performInfo = res.data
            Object.assign(this.product,res.data.shopDisplayItemDto.dealerProductDTO)
            if(this.performInfo.state == 2 || this.performInfo.state == 3){
              let nperNum = this.calculateNper(this.performInfo.displayitemphotoDtos)
              Object.assign(this.nperNum,nperNum)
            }
            this.domShow = true
          }
        }).catch(err => {
          this.$toast(err.message)
        })
      },
      //处理陈列申请
      oprateApply(type){
        switch (type) {
          case 'refuse':
            this.oprateParam.state = 1
            this.oprateParam.cids = [this.id]
            break;
          case 'agree':
            this.oprateParam.state = 2
            this.oprateParam.cids = [this.id]
            break;
          case 'refuseReward':
            this.oprateParam.state = 5
            this.oprateParam.id = this.id
            break;
          case 'agreeReward':
            this.oprateParam.state = 4
            this.oprateParam.id = this.id
            break;
          default:
            break;
        }
        if((type==`refuse`||type==`refuseReward`)&&!this.oprateParam.comments){
          this.$toast(`请填写拒绝原因！`)
          return
        }
        oprateExhibit(this.oprateParam,type).then(res => {
          if (res.result === "success") {
            this.$toast(`操作成功！`)
            this.$router.push({
              path: "/exhibitStateList",
              query: {id: this.performInfo.display_Id}
            });
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
    }
  };
</script>

<style lang="stylus" scoped>
  @import "./stylus/exhibit.styl"
</style>


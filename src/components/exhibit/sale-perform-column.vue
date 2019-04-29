<template>
  <div>
    <slot></slot>
    <!--陈列状态-->
    <!--待审核-->
    <div class="state-audit" v-if="exhibit.state==0">
      <div class="sa-t">
        <div class="st-content" @click="goDetail">
          <div class="stc-t">
            <span class="shop-name">{{exhibit.customerInfoDTO.customerShopName || exhibit.customerInfoDTO.name}}</span>
            <span>{{exhibit.create_time}}</span>
          </div>
          <div class="stc-b">
            <span class="task">{{exhibit.customerInfoDTO.name}}的店铺申请该商品的陈列任务。</span>
            <span>店铺地址：{{exhibit.customerInfoDTO.address}}</span>
          </div>
        </div>
      </div>
      <div class="state-tag">待审核</div>
    </div>
    <!--申请中-->
    <div class="state-audit" v-if="exhibit.state==1">
      <div class="sa-t">
        <div class="st-content" @click="goDetail">
          <div class="stc-t">
            <span class="shop-name">{{exhibit.dealerDto.shopName || exhibit.dealerDto.name}}</span>
            <span>{{exhibit.create_time}}</span>
          </div>
          <div class="stc-b">
            <span class="task">{{exhibit.display_rule}}</span>
            <span>{{exhibit.display_reward}}</span>
          </div>
        </div>
      </div>
      <div class="state-tag">可申请</div>
    </div>
    <!--执行中-->
    <div class="state-audit" v-if="exhibit.state==2" @click="goDetail">
      <div class="sa-t">
        <div class="st-content">
          <div class="stc-t">
            <span class="shop-name">{{exhibit.dealer.shopName || exhibit.dealer.name}}</span>
            <span>{{exhibit.create_time}}</span>
          </div>
          <div class="stc-b">
            <span class="task" v-if="!exhibit.begin_time">执行时间：还未开始陈列</span>
            <span class="task" v-else>执行时间：{{exhibit.begin_time}}至{{exhibit.end_time}}</span>
            <span>陈列周期为{{exhibit.shopDisplayItemDto.display_days}}天，共{{exhibit.total_periods}}期，已上传{{exhibit.uploadedNum}}期。</span>
            <span class="warn-tips" v-if="exhibit.unloadedNum">该客户目前有{{exhibit.unloadedNum}}期未上传。</span>
            <!--期数信息-->
            <span class="nper">
                  <i :class="{'warn':item.state==0}" v-for="(item,index) in exhibit.displayitemphotoDtos">第{{index+1}}期</i>
                </span>
          </div>
        </div>
      </div>
      <div class="state-tag">执行中</div>
    </div>
    <!--已到期-->
    <div class="state-audit" v-if="exhibit.state==3" @click="goDetail">
      <div class="sa-t">
        <div class="st-content">
          <div class="stc-t">
            <span class="shop-name">{{exhibit.customerInfoDTO.customerShopName || exhibit.customerInfoDTO.name}}</span>
            <span>{{exhibit.create_time}}</span>
          </div>
          <div class="stc-b">
            <span class="task">陈列任务已到期</span>
            <span>{{exhibit.expirePrompt}}</span>
          </div>
        </div>
      </div>
      <div class="state-tag">已到期</div>
    </div>
    <!--已完成-->
    <div class="state-audit" v-if="exhibit.state==4||exhibit.state==5" @click="goDetail">
      <div class="sa-t">
        <div class="st-content">
          <div class="stc-t">
            <span class="shop-name">{{exhibit.customerInfoDTO.customerShopName || exhibit.customerInfoDTO.name}}</span>
            <span>{{exhibit.create_time}}</span>
          </div>
          <div class="stc-b" v-if="exhibit.state==4">
            <span class="task">陈列奖品已发放</span>
            <span>奖品：{{exhibit.shopDisplayItemDto.display_reward}}</span>
          </div>
          <div class="stc-b" v-if="exhibit.state==5">
            <span class="task">陈列奖品未发放</span>
            <span>未发放原因：{{exhibit.comments}}</span>
          </div>
        </div>
      </div>
      <div class="state-tag">已完成</div>
    </div>
  </div>
</template>

<script>
  import bus from "common/Bus";
  export default {
    props: {
      exhibit: {
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
      if(this.exhibit.state == 2 || this.exhibit.state == 3){
        let nperNum = this.calculateNper(this.exhibit.displayitemphotoDtos)
        Object.assign(this.exhibit,nperNum)
        if(this.exhibit.state == 3){
          const { unloadedNum } = this.exhibit
          let expirePrompt = `此客户完成了此次陈列任务。`
          if(unloadedNum) expirePrompt= `此客户未在规定时间完成陈列任务，共有${unloadedNum}期陈列照片未上传。`
          this.exhibit.expirePrompt = expirePrompt
        }
      }
    },
    mounted() {},
    methods: {
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
      //产看详情
      goDetail(){
        this.$router.push({
          path: "/salePerformDetail",
          query: {
            id: this.exhibit.id,
            type: this.exhibit.state
          }
        });
      },
      select(){
        this.exhibit.select = !this.exhibit.select
      },
    },
  };
</script>

<style lang="stylus" scoped>
  @import "./exhibit.styl"
</style>


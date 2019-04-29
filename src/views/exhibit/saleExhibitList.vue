<template>
  <div class="exhibit-state-wrap">
    <m-header :isFixed="true"></m-header>
    <section class="top-bar">
      <span v-for="(item,index) in stateList" :class="{'active': activeIdx == index}" @click="switchBar(index)">{{item.title}}</span>
    </section>
    <!--经销商店铺列表-->
    <section class="dealer-list-wrap" v-if="activeIdx!=0&&dealerList.length">
      <span :class="{'active':activeDealerIdx==idx}"
            v-for="(item,idx) in dealerList"
            @click="switchShop(item,idx)"
      >{{item.shopName||item.name}}</span>
    </section>

    <section class="exhibit-state-content" :class="{'top-t':activeIdx!=0}">
      <scroll
              class="exhibit-state-scroll"
              :data="performList"
              :probeType="3"
              :pullup="true"
              @scrollToEnd="loadMoreData"
              ref="productScrollDom">
        <div>
          <sale-perform-column
                  v-for="exhibit in performList"
                  :key="exhibit.id"
                  :exhibit="exhibit"
                  class="perform-column"
          >
            <i></i>
          </sale-perform-column>
        </div>

      </scroll>
    </section>

    <!--空页面友好提示-->
    <section class="empty-exhibit" v-if="isEmpty">
      <i></i>
      <span>暂无数据~</span>
    </section>
  </div>
</template>

<script>
  import { queryPerformList,oprateExhibit,querySaleDealers,queryVisitorPerformList } from "api/fetch/exhibit";
  import salePerformColumn from "components/exhibit/sale-perform-column.vue";
  import scroll from "components/scroll.vue";
  export default {
    data() {
      return {
        activeIdx: 0,//选中的状态
        stateList: [{
          title: `可申请`,
          idx: 0
        },{
          title: `执行中`,
          idx: 1
        },{
          title: `已到期`,
          idx: 2
        },{
          title: `已完成`,
          idx: 3
        }],//陈列情况状态
        domShow: false,
        loading: false,
        requestDone: false,
        totalPage: 0,//总页数
        filterParam: {
          pageNum: 1,
          pageSize: 10,
          display_Id: '',//活动id
          lists_tates: [0],//可选查询状态
          dealer_id: '',//当前选中的经销商id
          customer: 1,//代表客户调用
        },
        performList: [],//执行情况列表
        isEmpty: false,
        dealerList: [],//经销商列表
        activeDealerIdx: 0,//默认选中的经销商
      };
    },
    components: {
      scroll,
      salePerformColumn
    },
    created() {
      this.filterParam.display_Id = this.$route.query.id
      if(this.activeIdx==0){
        //获取可申请的列表
        this.queryPerforms(`apply`)
      }
      if(!this.isVisitor){
        //this.queryDealers()
      }
    },
    mounted() {},
    methods: {
      //切换状态栏
      switchBar(idx){
        if(idx == this.activeIdx) return false
        this.dealerList = []
        //如果是游客，只能查看可申请的陈列
        if(this.isVisitor&&idx!=0){
          this.navigateToLogin()
        }
        this.activeIdx = idx
        switch (idx) {
          case 0:
          break;
          case 1:
            this.filterParam.lists_tates = [2]
            break;
          case 2:
            this.filterParam.lists_tates = [3]
            break;
          case 3:
            this.filterParam.lists_tates = [4,5]
            break;
          default:
            break;
        }
        this.filterParam.pageNum = 1
        this.performList = []
        if(idx==0) {
          this.queryPerforms(`apply`)
        }
        this.queryDealers()
      },
      //获取任务列表
      queryPerforms(type){
        this.loading = true
        this.requestDone = false
        let param = this.filterParam
        //可申请列表
        if(type==`apply`){
          param = {}
        }
        let queryListApi = queryPerformList
        //如果是游客，走另外一个查询接口
        if(this.isVisitor){
          queryListApi = queryVisitorPerformList
        }
        queryListApi(param,type).then(res => {
          if (res.result === "success") {
            this.domShow = true
            if(this.activeIdx==0){
              this.performList = res.data
              this.totalPage = 1
            }else{
              const { dataList = [], pager } = res.data;
              const { currentPage, totalPage } = pager;
              if(currentPage==1){
                this.totalPage = totalPage
              }
              dataList.forEach((item)=>{
                item.dealer = {}
                this.dealerList.forEach((dealer)=>{
                  if(dealer.id == item.dealer_id){
                    Object.assign(item.dealer,dealer)
                  }
                })
              })
              this.performList = this.performList.concat(dataList)
            }
            this.loading = false
            this.requestDone = true
          }
        }).catch(err => {
          this.loading = false
          this.requestDone = true
        })
      },
      //批量操作
      batchOprate(){
        let cids = []
        this.performList.forEach((item)=>{
          if(item.select){
            cids.push(item.id)
          }
        })
        if(!cids.length) return this.$toast(`请选择需要同意的陈列`)
        let param = {
          cids,
          state: 2
        }
        oprateExhibit(param,'').then(res => {
          if (res.result === "success") {
            this.$toast(`操作成功！`)
            //操作成功后刷新列表页
            if(this.filterParam.pageNum==1){
              this.performList = []
              this.queryPerforms()
            }else{
              this.performList = []
              this.filterParam.pageNum = 1
            }
          }
        }).catch(err => {
          this.$toast(err.message)
        })
      },
      loadMoreData() {
        if (this.loading || this.filterParam.pageNum >= this.totalPage) return false;
        this.filterParam.pageNum += 1
      },
      //查询客户签约的店铺列表
      queryDealers(){
        let param = {
          lists_tates: this.filterParam.lists_tates
        }
        querySaleDealers(param).then(res => {
          if (res.result === "success") {
            this.dealerList = res.data
            this.filterParam.dealer_id = this.dealerList.length ? this.dealerList[0].id : ''
            if(this.activeIdx != 0 && this.dealerList.length) this.queryPerforms()
          }
        }).catch(err => {
          this.$toast(err.message)
        })
      },
      //切换经销商店铺
      switchShop(item,idx){
        this.activeDealerIdx = idx
        this.filterParam.pageNum = 1
        this.performList = []
        this.filterParam.dealer_id = item.id
      },
    },
    watch: {
      filterParam: {
        handler(newVal, oldVal) {
          if(this.activeIdx!=0){
            //this.queryPerforms(``)
          }
        },
        deep: true
      },
      performList(val) {
        if (this.requestDone) {
          if(!val.length){
            this.isEmpty = true
          }else{
            this.isEmpty = false
          }
        }
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import "./stylus/exhibit.styl"
</style>


<template>
  <div>
    <section class="top-bar">
      <span :class="{'active': activeIdx == 0}" @click="switchBar(0)">今日</span>
      <span :class="{'active': activeIdx == 1}" @click="switchBar(1)">7天</span>
      <span :class="{'active': activeIdx == 2}" @click="switchBar(2)">30天</span>
      <span :class="{'active': activeIdx == 3}" @click="switchBar(3)">总计</span>
    </section>

    <section class="content-wrap">

      <!--累计下单用户数据-->
      <div>
        <div class="adsorb-bar">
          <div class="ab-l">客户名称</div>
          <div class="ab-m" @click="sortList('num')">
            下单件数
            <span :class="{'drop':filterParam.numOrderType=='desc','litre':filterParam.numOrderType=='asc'}"></span>
          </div>
          <div class="ab-r" @click="sortList('amount')">
            下单金额
            <span :class="{'drop':filterParam.amountOrderType=='desc','litre':filterParam.amountOrderType=='asc'}"></span>
          </div>
        </div>
        <ul class="list">
          <li v-for="(item,index) in recordList" :key="index">
            <div>{{item.customerName}}</div>
            <div class="letter-p1">{{item.totalOrders}}件</div>
            <div>¥{{item.totalAmount}}</div>
          </li>
        </ul>
      </div>

    </section>

  </div>
</template>

<script>
  import { queryCustomerPerformance } from "api/fetch/mine";
  export default {
    data() {
      return {
        activeIdx: 0,   //选中的区间
        filterParam: {
          userId: "465273",
          dayNum: 1,
          pageNum: 1,
          pageSize: 20,
          orderByNum: 0,//1=数量排序，0=不按数量排序
          numOrderType: null,//"desc"降序 " asc"升序
          orderByAmount: 0,//1=金额排序，0=不按金额排序
          amountOrderType: null,//"desc"降序 " asc"升序
        },
        recordList: [],
        requestDone: true,
        autoMoreData: false,
        domShow: false,
      }
    },
    computed: {

    },
    components: {

    },

    created() {
      this.queryRecordList()
    },
    beforeCreate () {
      document.getElementById('app').setAttribute('style', 'height:auto;')
    },
    beforeDestroy () {
      document.getElementById('app').removeAttribute('style')
    },
    mounted() {

    },
    methods: {
      //切换时间区间
      switchBar(idx) {
        this.activeIdx = idx
        switch (idx) {
          case 0:
            this.filterParam.dayNum = 1
            break;
          case 1:
            this.filterParam.dayNum = 7
            break;
          case 2:
            this.filterParam.dayNum = 30
            break;
          case 3:
            this.filterParam.dayNum = ''
            break;
          default:
            break;
        }
        this.filterParam.pageNum = 1
        this.recordList = []
      },
      //获取记录列表
      queryRecordList(){
        queryCustomerPerformance(this.filterParam).then(res => {
          if (res.result === "success") {
            this.domShow = true
            //如果当前页的数据条数小于一页的列表数，则下次滑到最底部不再加载更多数据
            if(res.data.dataList.length < this.filterParam.pageSize){
              this.autoMoreData = false;
            }else{
              this.autoMoreData = true;
            }
            res.data.dataList.forEach((item)=>{
              item.totalAmount = Number(item.totalAmount).toFixed(2)
            })
            this.recordList = this.recordList.concat(res.data.dataList)
            this.requestDone = true
          }
        }).catch(err => {
          this.autoMoreData = false
          this.requestDone = true
        });
      },
      //滑动底部加载更多
      scrollMore(){
        let that = this
        window.addEventListener('scroll',function(){
          let scrollTop = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop;
          let scrollHeight = document.body.scrollHeight;
          let windowHeight = document.documentElement.clientHeight;
          if(scrollTop + windowHeight >= scrollHeight && that.requestDone && that.autoMoreData) {
            that.filterParam.pageNum += 1
          }
        })
      },
      //列表排序
      sortList(type){
        let { numOrderType,amountOrderType } = this.filterParam
        if(type == 'num'){
          this.filterParam.orderByNum = 1
          if(!numOrderType){
            numOrderType = 'desc'
          }else if(numOrderType == 'desc'){
            numOrderType = 'asc'
          }else if(numOrderType == 'asc'){
            numOrderType = null
            this.filterParam.orderByNum = 0
          }
          this.filterParam.numOrderType = numOrderType
        }else if(type == 'amount'){
          this.filterParam.orderByAmount = 1
          if(!amountOrderType){
            amountOrderType = 'desc'
          }else if(amountOrderType == 'desc'){
            amountOrderType = 'asc'
          }else if(amountOrderType == 'asc'){
            amountOrderType = null
            this.filterParam.orderByAmount = 0
          }
          this.filterParam.amountOrderType = amountOrderType
        }
        this.filterParam.pageNum = 1
        this.recordList = []
      },
    },
    watch: {
      filterParam: {
        handler(newVal, oldVal) {
          this.queryRecordList()
        },
        deep: true
      },
      domShow: function(val) {
        if(val) {
          this.$nextTick(() => {
            this.scrollMore()
          })
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "./stylus/statistical.styl"
</style>


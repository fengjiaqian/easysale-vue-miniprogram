<template>
  <div class="pt90">
     <m-header :isFixed="true"></m-header>
    <section class="top-bar">
      <span :class="{'active': activeIdx == 0}" @click="switchBar(0)">今日</span>
      <span :class="{'active': activeIdx == 1}" @click="switchBar(1)">7天</span>
      <span :class="{'active': activeIdx == 2}" @click="switchBar(2)">30天</span>
      <span :class="{'active': activeIdx == 3}" @click="switchBar(3)">总计</span>
    </section>

    <section class="content-wrap">
      <!--累计下单金额-->
      <div>
        <ul class="quanty-total">
          <li class="qt-money">
            <h5>{{$options.filters.priceToFixed(statisticalData.totalAmount)}}</h5>
            <p>{{activeTitle}}累计下单额(元)</p>
          </li>
          <li class="qt-num">
            <h5>{{statisticalData.orderSum}}</h5>
            <p>{{activeTitle}}累计下单数(个)</p>
          </li>
        </ul>
        <ul class="classes-column">
          <li @click="skipTo('product')">
            <span>下单商品数量</span>
            <span>{{statisticalData.productSum}}<i></i></span>
          </li>
          <li @click="skipTo('customer')">
            <span>下单客户数量</span>
            <span>{{statisticalData.customerSum}}<i></i></span>
          </li>
        </ul>
      </div>

    </section>

  </div>
</template>

<script>
  import { queryStatisticalData } from "api/fetch/mine";
  export default {
    data() {

      return {
        activeIdx: 0,   //选中的区间
        activeTitle: '今日', //选中的区间名称
        dayNum: 1,
        statisticalData: {},
      }
    },
    computed: {

    },
    components: {

    },

    created() {
      this.initStatistical()
    },
    beforeDestory(){
    },
    destoryed(){
    },
    mounted() {

    },
    methods: {
      switchBar(idx) {
        this.activeIdx = idx
        switch (idx) {
          case 0:
            this.dayNum = 1
            this.activeTitle = '今日'
            break;
          case 1:
            this.dayNum = 7
            this.activeTitle = '7天'
            break;
          case 2:
            this.dayNum = 30
            this.activeTitle = '30天'
            break;
          case 3:
            this.dayNum = ''
            this.activeTitle = '总共'
            break;
          default:
            break;
        }
      },
      initStatistical(){
        let param = {
          dayNum: this.dayNum,
        }
        queryStatisticalData(param).then(res => {
          if (res.result === "success" && res.data) {
            this.statisticalData = res.data
          }
        });
      },
      skipTo(type){
        let path = type == 'product' ? '/my/statisProductList' : '/my/statisCustomerList'
        this.$router.push({ path });
      },
    },
    watch: {
      dayNum: function(val) {
          this.initStatistical()
        }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "./stylus/statistical.styl"
</style>


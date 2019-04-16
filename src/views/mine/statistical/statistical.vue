<template>
  <div>
    <section class="top-bar">
      <span :class="{'active': activeIdx == 0}" @click="switchBar(0)">今日</span>
      <span :class="{'active': activeIdx == 1}" @click="switchBar(1)">7天</span>
      <span :class="{'active': activeIdx == 2}" @click="switchBar(2)">30天</span>
      <span :class="{'active': activeIdx == 3}" @click="switchBar(3)">总计</span>
    </section>

    <section class="content-wrap">
      <!--累计下单金额-->
      <div v-if="moduleShowIdx == 0">
        <ul class="quanty-total">
          <li class="qt-money">
            <h5>{{statisticalData.totalAmount || 0}}</h5>
            <p>{{activeTitle}}累计下单额(元)</p>
          </li>
          <li class="qt-num">
            <h5>{{statisticalData.orderSum}}</h5>
            <p>{{activeTitle}}累计下单数(个)</p>
          </li>
        </ul>
        <ul class="classes-column">
          <li @click="switchModule(1)">
            <span>下单商品数量</span>
            <span>{{statisticalData.productSum}}<i></i></span>
          </li>
          <li @click="switchModule(2)">
            <span>下单客户数量</span>
            <span>{{statisticalData.customerSum}}<i></i></span>
          </li>
        </ul>
      </div>

      <!--累计下单商品数据-->
      <div v-if="moduleShowIdx == 1">
        <div class="adsorb-bar">
          <div class="ab-l">商品名称</div>
          <div class="ab-m">
            下单件数
            <span></span>
          </div>
          <div class="ab-r">
            下单金额
            <span></span>
          </div>
        </div>
        <ul class="list">
          <li v-for="item in [1,2,3,4]">
            <div>洋河蓝色经典梦之洋河蓝色经典梦之洋河蓝色经典梦之洋河蓝色经典梦之</div>
            <div class="letter-p1">100件</div>
            <div>¥9478.00</div>
          </li>
        </ul>
      </div>

      <!--累计下单用户数据-->
      <div v-if="moduleShowIdx == 2">
        <div class="adsorb-bar">
          <div class="ab-l">客户名称</div>
          <div class="ab-m">
            下单件数
            <span></span>
          </div>
          <div class="ab-r">
            下单金额
            <span></span>
          </div>
        </div>
        <ul class="list">
          <li v-for="item in [1,2,3,4]">
            <div>小李的店铺</div>
            <div class="letter-p1">100件</div>
            <div>¥9478.00</div>
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
        moduleShowIdx: 0,
        userId: '',
        dayNum: 1,
        statisticalData: {},
      }
    },
    computed: {

    },
    components: {

    },

    created() {
      this.userId = '465273'
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
      switchModule(idx) {
        this.moduleShowIdx = idx
      },
      initStatistical(){
        let param = {
          userId: this.userId,
          dayNum: this.dayNum,
        }
        queryStatisticalData(param).then(res => {
          if (res.result === "success" && res.data) {
            this.statisticalData = res.data
          }
        });
      },
    },
    watch: {
      dayNum: function(val) {
          if (val) {
            this.initStatistical()
          }
        }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "./stylus/statistical.styl"
</style>


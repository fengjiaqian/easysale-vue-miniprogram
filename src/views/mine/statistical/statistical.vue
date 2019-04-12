<template>
  <div>
    <section class="top-bar">
      <span :class="{'active': activeIdx == 0}" @click="switchBar(0)">今日</span>
      <span :class="{'active': activeIdx == 1}" @click="switchBar(1)">7天</span>
      <span :class="{'active': activeIdx == 2}" @click="switchBar(2)">30天</span>
      <span :class="{'active': activeIdx == 3}" @click="switchBar(3)">总计</span>
    </section>

    <!--累计下单金额-->
    <section>
      <ul class="quanty-total">
        <li class="qt-money">
          <h5>998.00</h5>
          <p>今日累计下单额(元)</p>
        </li>
        <li class="qt-num">
          <h5>99</h5>
          <p>今日累计下单数(个)</p>
        </li>
      </ul>
      <ul class="classes-column">
        <li>
          <span>下单商品数量</span>
          <span>45<i></i></span>
        </li>
        <li>
          <span>下单客户数量</span>
          <span>45<i></i></span>
        </li>
      </ul>
    </section>

    <!--累计下单商品数据-->
    <section>

    </section>

    <!--累计下单用户数据-->
    <section>

    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIdx: 0,
      }
    },
    computed: {

    },
    components: {

    },
    beforeCreate: function() {

    },
    created: function() {

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
      }
    },
    watch: {

    }
  }
</script>

<style lang="stylus" scoped>
  @import "./stylus/statistical.styl"
</style>


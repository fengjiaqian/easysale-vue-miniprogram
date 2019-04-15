<template>
  <div class="staff-detail-wrap">
    <ul class="sd-info">
      <li class="header-pic">
        <img v-lazy="''">
        <h5>小王的店铺</h5>
      </li>
      <li>
        <span>手机号码</span>
        <div>136 2776 2233</div>
      </li>
      <li>
        <span>店铺名称</span>
        <div>小王的店铺</div>
      </li>
      <li class="special-li">
        <span>店铺地址</span>
        <div>湖北省武汉市洪山区软件新城A3-401</div>
      </li>
      <div class="h20"></div>
      <li>
        <span>销售负责人</span>
        <div>张三</div>
      </li>
      <li>
        <span>累计下单数</span>
        <div>99</div>
      </li>
      <li class="special-li">
        <span>累计下单额</span>
        <div>¥999.00</div>
      </li>
      <div class="h20"></div>
    </ul>
    <ul class="sd-oprate">
      <li class="sd-c-b" @click="skipTo">编辑</li>
      <li class="sd-c-o">停用</li>
    </ul>
  </div>
</template>

<script>

  export default {
    data() {
      return {

      };
    },
    components: {

    },
    computed: {

    },
    created(){

    },
    methods: {
      skipTo(){
        this.$router.push({
          path: "/my/editCustomerInfo"
        });
      },
    }
  };
</script>

<style lang="stylus" scoped>
  @import "./stylus/customer.styl"
</style>


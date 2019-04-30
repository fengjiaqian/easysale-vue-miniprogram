<template>
  <div class="staff-detail-wrap pt90" v-show="domShow">
      <m-header :isFixed="true"></m-header>
    <ul class="sd-info">
      <li class="header-pic">
        <img v-lazy="customerInfo.imageUrl">
        <h5>{{customerInfo.name}}</h5>
      </li>
      <li>
        <span>手机号码</span>
        <div>{{customerInfo.phone}}</div>
      </li>
      <li>
        <span>店铺名称</span>
        <div>{{customerInfo.customerShopName}}</div>
      </li>
      <li class="special-li">
        <span>店铺地址</span>
        <div>{{customerInfo.address}}</div>
      </li>
      <div class="h20"></div>
      <li>
        <span>销售负责人</span>
        <div>{{customerInfo.salesmen}}</div>
      </li>
      <li>
        <span>累计下单数</span>
        <div>{{customerInfo.totalOrders}}</div>
      </li>
      <li class="special-li">
        <span>累计下单额</span>
        <div>¥{{customerInfo.totalOrderPrices}}</div>
      </li>
      <div class="h20"></div>
    </ul>
    <ul class="sd-oprate">
      <li class="sd-c-b" @click="skipTo">编辑</li>
      <li class="sd-c-o" @click="freeze">{{customerInfo.state==1?`停用`:`启用`}}</li>
    </ul>
  </div>
</template>

<script>
  import { queryCustomerDetail,editCustomer } from "api/fetch/mine";
  export default {
    data() {
      return {
        id: '',
        domShow: false,
        customerInfo: {},
      };
    },
    components: {

    },
    computed: {

    },
    created(){
      localStorage.removeItem('customerInfo')
      this.id = this.$route.query.id
      this._queryCustomerDetail()
    },
    methods: {
      _queryCustomerDetail(){
        let param = { id: this.id }
        queryCustomerDetail(param).then(res => {
          if (res.result === "success" ) {
            this.domShow = true
            res.data.totalOrderPrices = res.data.totalOrderPrices ? Number(res.data.totalOrderPrices).toFixed(2) : 0
            this.customerInfo = res.data
          }
        });
      },
      skipTo(){
        localStorage.setItem('customerInfo',JSON.stringify(this.customerInfo))
        this.$router.push({
          path: "/my/editCustomerInfo"
        });
      },
      //启用或者停用
      freeze(){
        //停用
        if(this.customerInfo.state == 1){
          this.$confirm('停用的客户不能再通过小程序下单，且 员工也无法代替下单。')
                  .then(() => {
                    this.editCustomerState('0')
                  })
                  .catch(() => {});
        }else{
          this.editCustomerState('1')
        }
      },
      editCustomerState(type){
        let param = {
          id: this.customerInfo.id,
          state: type
        }
        editCustomer(param).then(res => {
          if (res.result === "success") {
            //商品添加成功后回到商品管理列表页
            this.$toast("修改成功！");
            this.$router.go(-1)
          }
        });
      },
    }
  };
</script>

<style lang="stylus" scoped>
  @import "./stylus/customer.styl"
</style>


<template>
  <div class="staff-edit-wrap">
    <ul class="staff-info-list">
      <li>
        <span>员工姓名：</span>
        <input v-model="customerInfo.name" type="text" placeholder="请输入姓名">
        <i class="close"></i>
      </li>
      <li class="special-li">
        <span>联系电话：</span>
        <input v-model="customerInfo.phone" type="tel" placeholder="请输入手机号码">
      </li>
      <div class="h20"></div>
      <li>
        <span>店铺名称：</span>
        <input v-model="customerInfo.shopName" type="tel" placeholder="请输入店铺名称">
      </li>
      <li class="special-li">
        <span>详细地址：</span>
        <div>{{customerInfo.address}}</div>
        <i class="position"></i>
      </li>
      <div class="h20"></div>
      <li class="special-li">
        <span>销售负责人：</span>
        <div>{{customerInfo.saleDirector}}</div>
        <i class="extension"></i>
      </li>
    </ul>
    <div class="staff-info-btn">保存</div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        customerInfo: {
          name: '',
          phone: '',
          shopName: '',
          address: '',
          saleDirector: '',
        }
      };
    },
    components: {

    },
    computed: {

    },
    created(){

    },
    methods: {

    }
  };
</script>

<style lang="stylus" scoped>
  @import "./stylus/customer.styl"
</style>


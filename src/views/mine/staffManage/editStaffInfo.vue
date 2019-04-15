<template>
  <div class="staff-edit-wrap">
    <ul class="staff-info-list">
      <li>
        <span>员工姓名：</span>
        <input v-model="staffInfo.name" type="text" placeholder="请输入姓名">
        <i class="close"></i>
      </li>
      <li class="special-li">
        <span>联系电话：</span>
        <input v-model="staffInfo.phone" type="tel" placeholder="请输入手机号码">
      </li>
      <div class="h20"></div>
      <li>
        <span>身份证号：</span>
        <input v-model="staffInfo.idCard" type="tel" placeholder="请输入身份证号">
      </li>
      <li class="special-li">
        <span>详细地址：</span>
        <div>{{staffInfo.address}}</div>
        <i class="position"></i>
      </li>
      <div class="h20"></div>
      <li>
        <span>雇佣日期：</span>
        <div>{{staffInfo.date}}</div>
        <i class="extension"></i>
      </li>
      <li>
        <span>角色设置：</span>
        <div>{{staffInfo.role.title}}</div>
        <i class="extension"></i>
      </li>
      <li class="special-li">
        <span>折扣权限：</span>
        <div><input class="discount-int" v-model="staffInfo.discount" type="number" placeholder="请输入折扣"><span>折</span></div>
      </li>
    </ul>
    <div class="staff-info-btn">保存</div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        staffInfo: {
          name: '张三',
          phone: '18622421211',
          idCard: '423432454334124343',
          address: '武汉市洪山区软件新城A3栋-401',
          date: '2019-03-23',
          role: {
            type: 1,
            title: '销售人员'
          },
          discount: 9.88
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
  @import "./stylus/staff.styl"
</style>


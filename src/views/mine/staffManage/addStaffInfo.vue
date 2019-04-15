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
        <div @click="rolePopToggle">{{staffInfo.role.title}}</div>
        <i class="extension"></i>
      </li>
      <li class="special-li">
        <span>折扣权限：</span>
        <div><input class="discount-int" v-model="staffInfo.discount" type="number" placeholder="请输入折扣"><span>折</span></div>
      </li>
    </ul>
    <div class="staff-info-btn">保存</div>

    <!--角色设置弹出层-->
    <div class="popup-wrap" v-if="rolePopShow">
      <div class="pw-content">
        <h5 class="header">
          <span>角色设置</span>
          <i @click="rolePopShow=false"></i>
        </h5>
        <ul class="list">
          <li class="active">销售人员</li>
          <li>行政人员</li>
          <li>财务</li>
          <li>司机</li>
        </ul>
        <div class="btn">确定</div>
      </div>
      <div class="pop-mask"></div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        staffInfo: {
          name: '',
          phone: '',
          idCard: '',
          address: '',
          date: '',
          role: {
            type: 1,
            title: '销售人员'
          },
          discount: ''
        },
        rolePopShow: false
      };
    },
    components: {

    },
    computed: {

    },
    created(){

    },
    methods: {
      rolePopToggle(){
        this.rolePopShow = true
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import "./stylus/staff.styl"
</style>


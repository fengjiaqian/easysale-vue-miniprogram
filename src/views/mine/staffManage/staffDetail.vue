<template>
  <div class="staff-detail-wrap">
    <ul class="sd-info">
      <li class="header-pic">
        <img v-lazy="''">
        <h5>销售员-小王</h5>
      </li>
      <li>
        <span>手机号码</span>
        <div>136 2776 2233</div>
      </li>
      <li>
        <span>身份证号</span>
        <div>42102319341024****</div>
      </li>
      <li class="special-li">
        <span>家庭住址</span>
        <div>湖北省武汉市洪山区软件新城A3-401</div>
      </li>
      <li>
        <span>雇佣日期</span>
        <div>2019-03-23</div>
      </li>
      <li class="special-li">
        <span>折扣权限</span>
        <div>无</div>
      </li>
    </ul>
    <ul class="sd-oprate">
      <li class="sd-c-b">重置账号密码</li>
      <li class="sd-c-b" @click="skipTo">编辑</li>
      <li class="sd-c-o">删除</li>
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
          path: "/my/editStaffInfo"
        });
      },
    }
  };
</script>

<style lang="stylus" scoped>
  @import "./stylus/staff.styl"
</style>


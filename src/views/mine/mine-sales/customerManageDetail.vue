
<template>
  <div class="customer-manage-detail">
    <!-- 销售人员   客户管理详情   customerManageDetail -->
    <ul class="info">
      <li class="header-pic">
        <img v-lazy="''">
        <h5>销售员-小王</h5>
      </li>
      <li class="news">
        <span class="left">手机号码</span>
        <span class="right">136 2776 2233</span>
      </li>
      <li class="news">
        <span class="left">店铺名称</span>
        <span class="right">小王的店铺</span>
      </li>
      <li class="news">
        <span class="left">店铺地址</span>
        <span class="right">湖北省武汉市洪山区软件新城A3-401</span>
      </li>
      <li class="news">
        <span class="left">销售负责人</span>
        <span class="right">小黑</span>
      </li>
    </ul>
    <div class="edit">编辑</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  computed: {},
  created() {},
  methods: {
    skipTo() {
      this.$router.push({
        path: "/my/editStaffInfo"
      });
    },
    freeze() {
      this.$confirm("确定要删除该员工吗？")
        .then(() => {})
        .catch(() => {});
    }
  }
};
</script>

<style lang="stylus" scoped>
.customer-manage-detail {
  background-color: #f6f6f6;
}

.customer-manage-detail .info {
  // width:100%;
  padding: 20px;
  padding-bottom: 0;
  background-color: white;
}

.customer-manage-detail .info .header-pic {
  overflow: hidden;
  height: 150px;
  border-bottom: 1px solid #f6f6f6;
}

.customer-manage-detail .info .header-pic img {
  width: 120px;
  height: 120px;
  float: left;
  margin-right: 30px;
}

.customer-manage-detail .info .header-pic h5 {
  height: 120px;
  float: left;
  line-height: 150px;
  font-size: 30px;
  color: rgba(51, 51, 51, 1);
}

.customer-manage-detail .info .news {
  height: 90px;
  overflow: hidden;
  border-bottom: 1px solid #f6f6f6;
}

.customer-manage-detail .info .news .left {
  float: left;
  line-height: 90px;
  color:rgba(51,51,51,1);
  font-size: 28px;
}

.customer-manage-detail .info .news .right {
  float: right;
  line-height: 90px;
  color: rgba(102, 102, 102, 1);
  font-size: 30px;
}

.customer-manage-detail .edit {
  width: 100%;
  height: 98px;
  line-height: 98px;
  background-color: #fff;
  font-size: 32px;
  color: rgba(71, 122, 172, 1);
  text-align: center;
  margin-top: 30px;
}
</style>


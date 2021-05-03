<template>
  <div id="orderlist" style="margin:0 auto;width:300px;height:100px">
    <H1> {{msg}}</H1>
    <template>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
  let that = null;
  export default {
    name: "orderlist",
    data() {
      return {
        msg:'订单打印',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    mounted() {
      that = this;
    },
    //keepalive组件每次进都会触发的方法
    activated() {
    },
    components: {
    },
    methods: {
    },
    computed: {
    },
    watch: {
    },
  }
</script>
<style scoped>

</style>

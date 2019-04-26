<template>
  <section class="perform-wrap" v-if="domShow">
    <div class="perform-title">
      <div>陈列状态：<span>待审核</span></div>
      <p>该客户已提交3期，有6期未按时提交。</p>
    </div>
    <ul class="et-content">
      <li>
        <h5>陈列商品</h5>
        <div class="product">
          <img v-lazy="''" >
          <p>洋河蓝色经典 梦之蓝M6 52度</p>
        </div>
      </li>
      <li>
        <h5>陈列要求</h5>
        <div class="require">
          <p>自申请当月开始，每月需上传陈列招聘，陈列周期1年，共12期；</p>
          <p class="reward">陈列周期满后，奖励茅台1瓶。</p>
        </div>
      </li>
      <li class="perform-case">
        <div class="pc-title">
          <span>执行情况</span>
          <span class="detail">查看详情</span>
        </div>
        <div class="pc-content">
          <p>执行周期：100天，共20期，当前第15期</p>
          <p>已上传5期，共有<i>6</i>期未按时上传</p>
          <div class="nper-column">
            <span v-for="i in 12">1<i></i></span>
          </div>
          <div class="scale-btn">展开更多</div>
        </div>
      </li>
      <li>
        <h5>客户信息</h5>
        <div class="customer-info">
          <p>客户姓名：老王</p>
          <p>手机号码：134 2348 2334</p>
          <p>申请时间：2019-03-23 15:32</p>
          <p>销售负责人：小李</p>
        </div>
      </li>
      <li class="remark">
        <h5>备注<span>(若拒绝，则必须填写拒绝原因)</span></h5>
        <textarea cols="30" rows="6" placeholder="请输入内容"></textarea>
      </li>
    </ul>
    <div class="et-footer">
      <span class="refuse">删除</span>
      <span class="agree">编辑</span>
    </div>
  </section>
</template>

<script>
  import { queryPerformList } from "api/fetch/exhibit";
  export default {
    data() {
      return {
        performInfo: {},
        domShow: false
      };
    },
    components: {

    },
    created() {
      this.id = this.$route.query.id
      this.queryDetail()
    },
    mounted() {},
    methods: {
      queryDetail(){
        queryPerformList(this.id).then(res => {
          if (res.result === "success") {
            this.exhibitInfo = res.data
            this.domShow = true
          }
        }).catch(err => {
          this.$toast(err.message)
        })
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import "./stylus/exhibit.styl"
</style>


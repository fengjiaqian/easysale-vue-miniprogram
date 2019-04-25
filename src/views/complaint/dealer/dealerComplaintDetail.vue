<!--  经销商 投诉详情 dealerComplaintDetail -->
<template>
  <div id="common">
    <div class="status">
      <div class="nav">
        投诉状态：
        <span v-if="judgeCode==1" style="color:#FF5638;font-weight:bold;">待处理</span>
        <span v-if="judgeCode==2" style="color:#FF5638;font-weight:bold;">已处理</span>
      </div>
      <div class="continue" v-if="judgeCode==2">
        <div class="triangle"></div>
        <div class="report">
          <div class="left">回复：</div>
          <div class="right">2019-03-23 20:40</div>
        </div>
        <div class="tips">亲爱的客户，非常抱歉给您带来的不便，您的反馈问题我们会在下次服务中改进。期待您再次光临</div>
      </div>
    </div>
    <!--  -->
    <div class="content">
      <div class="reason">投诉原因</div>
      <div class="nav" style="border-bottom:1px solid #f6f6f6;padding-bottom:10px;">销售人员态度不好!</div>
      <div class="port">内容描述</div>
      <div class="descrip">销售人员态度不好销售人员态度不好销售人员态度不好销售人员态度不好</div>
    </div>
    <!--  -->
    <div class="remark">
      <div class="title">客户信息</div>
      <div class="detail" style="padding-top:10px;">客户姓名：老王</div>
      <div class="detail">
        手机号码 ：13554745896
        <img src="../../../assets/images/icon-tel.png" alt>
      </div>
      <div class="detail">投诉时间 ：2019-03-23 15:32</div>
      <div class="detail" style="padding-bottom:10px;">销售负责人 : 小李</div>
    </div>
    <!--  -->
    <div class="remark">
      <div class="title">备注</div>
      <div class="descrip">质量不好。货送来的时候好多都是破损的</div>
    </div>
    <!--  -->
    <div class="remark" v-if="judgeCode==1">
      <div class="title">
        回复
        <span style="color:#999;" v-if="transfer==2">(销售人员-小黑已回复)</span>
      </div>
      <textarea class="reply" name id cols="45" rows="5" placeholder="请输入回复内容"></textarea>
    </div>
    <!--  -->
    <div class="support"></div>
    <div class="cancel" v-if="judgeCode==1&&transfer==1">
      <div class="left">移交处理</div>
      <div class="right">处理</div>
    </div>
    <div class="cancel" v-if="judgeCode==1&&transfer==2">
      <div class="left">拒绝</div>
      <div class="right">同意</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      judgeCode: 2, //1是待处理，2是已处理
      transfer: 1 //判断是否移交给销售人员，1是为移交，2是已移交
    };
  },
  computed: {},
  components: {},
  beforeCreate: function() {},
  created: function() {},
  beforeDestory() {},
  destoryed() {},
  mounted() {},
  methods: {},
  watch: {}
};
</script>

<style lang="stylus" scoped>
#common {
  bg(#f6f6f6);
  height: 100%;
  overflow: scroll;
}

#common .status {
  width: 100%;
  padding: 24px 24px 24px 24px;
  bg(white);
}

#common .status .nav {
  c(#333);
  font-size: 32px;
  font-weight: bold;
}

#common .content {
  padding: 24px;
  margin: 24px;
  bg(white);
}

#common .remark {
  padding: 0px 24px 0px 24px;
  margin: 24px;
  bg(white);
}

#common .content .reason, #common .content .port, #common .remark .title {
  c(#333);
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 24px;
}

#common .remark .title {
  border-bottom: 1px solid #f6f6f6;
  margin-bottom: 0;
  lh(90);
}

#common .remark .detail {
  lh(46);
  c(#666);
  ft(30);
}

#common .remark .detail img {
  w(40);
  h(40);
  float: right;
  display: inline-block;
}

#common .content .nav, #common .content .descrip, #common .remark .descrip {
  c(#666);
  font-size: 30px;
  margin-bottom: 24px;
}

#common .remark .descrip {
  lh(90);
}

#common .remark .descrip {
  lh(46);
  margin-top: 24px;
  padding-bottom: 24px;
}

#common .remark .reply {
  // lh(46)
  // margin-top:24px;
  // padding-bottom :24px;
  border: none;
  resize: none;
  outline: none;
}

#common .content .descrip {
  margin-bottom: 0;
}

#common .support {
  h(98);
  width: 100%;
  bg(#f6f6f6);
}

#common .cancel {
  width: 100%;
  h(98);
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  lh(98);
  font-size: 32px;
  border: 0;
  outline: none;
  border-top: #ededed;
}

#common .cancel .left {
  c(#FF5638);
  bg(white);
  width: 50%;
  display: inline-block;
}

#common .cancel .right {
  bg(#FF5638);
  c(white);
  width: 50%;
  display: inline-block;
}

// continue
#common .status .continue {
  bg(#f6f6f6);
  mt(24);
  border-radius: 10px;
  padding: 24px;
  position: relative;
}

.triangle {
  width: 0;
  height: 0;
  border-bottom: 22px solid #f6f6f6;
  border-left: 16px solid transparent;
  border-right: 16px solid transparent;
  position: absolute;
  top: -22px;
  left: 50px;
}

#common .status .continue .report {
  overflow: hidden;
  margin-bottom: 16px;
}

#common .status .continue .report .left {
  float: left;
  c(#FF5638);
  font-size: 26px;
  height: 34px;
}

#common .status .continue .report .right {
  float: right;
  c(#999);
  font-size: 26px;
  height: 34px;
  lh(34);
}

#common .status .continue .tips {
  c(#666);
}
</style>


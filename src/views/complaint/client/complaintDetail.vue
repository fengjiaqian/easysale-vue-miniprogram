

<template>
    <div id="common">
        <!-- 终端客户   投诉详情   complaintDetail  -->
       <div class="status">
           <div class="nav">投诉状态：<span style="color:#FF5638;font-weight:bold;">待处理</span></div>
           <div class="descrip" v-if="judgeCode==1">销售人员-小黑正在处理您的问题，请耐心等待！</div>
           <div class="continue" v-if="judgeCode==2">
               <div class="triangle"></div>
               <div class="report">
                   <div class="left">茅台商贸公司回复：</div>
                   <div class="right">2019-03-23  20:40</div>
               </div>
               <div class="tips">亲爱的客户，非常抱歉给您带来的不便，您的反馈问题我们会在下次服务中改进。期待您再次光临</div>
           </div>
       </div>
       <div class="content">
            <div class="reason">投诉原因</div>
            <div class="nav">销售人员态度不好!</div>
            <div class="port">内容描述</div>
            <div class="descrip">销售人员态度不好销售人员态度不好销售人员态度不好销售人员态度不好</div>
       </div>
       <div class="company">
           <div class="type">商贸公司</div>
           <div class="type-detail">茅台商贸公司</div>
       </div>
       <div class="time">
           <div class="title">投诉时间</div>
           <div class="spec-time">2019-03-23 15:32</div>
       </div>
       <div class="remark">
           <div class="title">备注</div>
           <div class="descrip">质量不好。货送来的时候好多都是破损的</div>
       </div>
       <button class="cancel" v-if="judgeCode==1">撤销投诉</button>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        judgeCode :1,
      }
    },
    computed: {

    },
    components: {

    },
    beforeCreate: function() {

    },
    created: function() {

    },
    beforeDestory(){
    },
    destoryed(){
    },
    mounted() {

    },
    methods: {
   
    },
    watch: {

    }
  }
</script>

<style lang="stylus" scoped>
    #common{
        bg(#f6f6f6);
    }

    #common .status{
        width:100%;
        padding:24px 24px 24px 24px;
        bg(white);
    }

    #common .status .nav{
        c(#333);
        font-size:32px;
        font-weight:bold;
    }

    #common .status .descrip{
        c(#999);
        font-size:26px;
        lh(36);
        mt(8);
    }

    #common .content{
        padding:24px;
        margin:24px;
        bg(white);
    }

      #common .company,
      #common .time,
      #common .remark{
        padding:0px 24px 0px 24px;
        margin:24px;
        bg(white);
    }

    #common .content .reason,
    #common .content .port,
    #common .company .type,
    #common .time .title,
    #common .remark .title{
        c(#333);
        font-size:30px;
        font-weight :bold;
        margin-bottom :24px;
    }

    #common .company .type,
    #common .time .title,
    #common .remark .title{
        border-bottom :1px solid #f6f6f6;
         margin-bottom :0;
        lh(90);
    }

      #common .content .port{
        margin-top :48px;
    }

     #common .content .nav,
     #common .content .descrip,
     #common .company .type-detail,
    #common .time .spec-time,
    #common .remark .descrip{
        c(#666);
        font-size:30px;
        margin-bottom :24px;
    }

     #common .company .type-detail,
     #common .time .spec-time,
     #common .remark .descrip{
        lh(90)
    }

    #common .remark .descrip{
        lh(46)
        margin-top:24px;
        padding-bottom :24px;
    }


      #common .content .descrip{
        margin-bottom :0;
    }

    #common .cancel{
        h(98)
        position :fixed;
        width:100%;
        bottom :0;
        left:0;
        bg(white);
        text-align :center;
        lh(98);
        c(#FF5638);
        font-size:32px;
        border:0;
        outline :none;
    }

    // continue
    #common .status .continue{
        bg(#f6f6f6);
        mt(24);
        border-radius :10px;
        padding:24px;
        position:relative;
    }
   

   .triangle{
        width: 0;
        height: 0;
        border-bottom: 22px solid #f6f6f6;
        border-left: 16px solid transparent;
        border-right: 16px solid transparent;
        position:absolute;
        top:-22px;
        left:50px;
    }

   #common .status .continue .report{
       overflow :hidden;
       margin-bottom :16px;
   } 

   #common .status .continue .report .left{
       float:left;
       c(#FF5638)
       font-size:26px;
       height:34px;
   }

   #common .status .continue .report .right{
       float:right;
       c(#999)
       font-size:26px;
       height:34px;
       lh(34);
   }

   #common .status .continue .tips{
       c(#666);
   }


</style>


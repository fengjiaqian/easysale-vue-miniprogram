 <!-- 经销商  兑奖管理 dealerAwardManage-->

<template>
    <div id="common">
        <section class="top-bar">
            <span :class="{'active': activeIdx == 0}" @click="switchBar(0)">待处理</span>
            <span :class="{'active': activeIdx == 1}" @click="switchBar(1)">已处理</span>
        </section>
        <!-- activeIdx == 0 -->
        <div class="message" v-for="x in [1,1,1,1,1,1]" v-if="activeIdx == 0">
            <div class="title">
                <img class="t-img" src="../../../assets/images/icon-checked.png" alt="">
                <div class="t-name">茅台商贸公司</div>
                <div class="t-type">待处理</div>
            </div>
            <div class="time" style="margin-left:30px;">2019-03-23 20:43</div>
            <div class="apply" style="margin-left:30px;">兑奖申请</div>
            <div class="goods-list" v-for="x in [1,1,1,1,1,1]" style="margin-left:30px;">
                <div class="goods-name">洋河蓝色经典 梦之蓝M6 52度</div>
                <div class="goods-count">X2</div>
            </div>
            <div class="type-2" v-if="typeCode==2" @click="tooMore()" style="margin-left:30px;">展开更多</div>
            <div class="type-2" v-if="typeCode==3" @click="tooLess()" style="margin-left:30px;">收起</div>
            <div class="bottom">
                <span class="to-deal">销售人员-小黑已处理</span>
                <div class="examine">查看详情</div>
            </div>
        </div>
         <!-- activeIdx == 1 -->
        <div class="message" v-for="x in [1,1,1,1,1,1]" v-if="activeIdx == 1">
            <div class="title">
                <div class="t-name">茅台商贸公司</div>
                <div class="t-type">待处理</div>
            </div>
            <div class="time">2019-03-23 20:43</div>
            <div class="apply">兑奖申请</div>
            <div class="goods-list" v-for="x in [1,1,1,1,1,1]">
                <div class="goods-name">洋河蓝色经典 梦之蓝M6 52度</div>
                <div class="goods-count">X2</div>
            </div>
            <div class="type-2" v-if="typeCode==2" @click="tooMore()" >展开更多</div>
            <div class="type-2" v-if="typeCode==3" @click="tooLess()" >收起</div>
            <div class="continue" >
                <div class="triangle"></div>
                <div class="report">
                    <div class="left">经销商回复：</div>
                    <div class="right">2019-03-23  20:40</div>
                </div>
                <div class="tips">亲爱的客户，非常抱歉给您带来的不便，您的反馈问题我们会在下次服务中改进。期待您再次光临</div>
            </div>
            <div class="bottom">
                <div class="examine">查看详情</div>
            </div>
        </div>
        <!--  -->
        <div class="support"></div>
        <div class="below">
            <img class="l-img" src="../../../assets/images/icon-check.png" alt>
            <div class="l-all">全选</div>
            <button class="right" @click="openShadow()">移交处理</button>
        </div>

    </div>
</template>

<script>
export default {
    data() {
      return {
        activeIdx: 0,   //选中的区间
        typeCode:2, //判断是收起，展开更多还是橙色的字
        judgeDeal : 0  //如果待处理，则渲染1   已处理 渲染2
      }
    },
    computed: {

    },
    components: {

    },
    methods:{
        switchBar(idx) {
         this.activeIdx = idx;
         this.judgeDeal = idx
      },
      
      tooMore(){
          //点击获取更多的时候，操作数据，将要渲染的数据全部渲染
      },
      tooLess(){
          //点击收起的时候，操作数据，将要渲染的数据截取两条渲染
      },
    }
    
}
</script>

<style lang="stylus" scoped>
  #common{
      bg(#f6f6f6);
  }

  #common .top-bar{
      display :flex;
      width:100%;
      h(98)
  }

  #common .top-bar span{
      width :50%;
      flex:1;
      c(#666);
      font-size:28px;
      h(98)
      text-align :center;
      lh(98);
      display :inline-block;
      bg(white)
  }

    #common .top-bar .active{
        c(#333)
        font-size :34px;
        font-weight :bold;
        position :relative;
    }
    #common .top-bar .active:before{
        content ""
        position absolute
        left 50%
        bottom 0
        transform translateX(-50%)
        w(40)
        h(6)
        bg(#FF5638)
    }
  
// message
    #common .message{
        margin-top:30px;
        padding:24px 24px 0 24px;
        bg(white);
    }

    #common .message .left{
        float:left
    }

    #common .message .right{
        float:right
    }

    #common .message .title{
        overflow :hidden;
    }

    #common .message .title .t-img{
       float:left;
        w(40)
        h(40)
        margin:10px 24px 0 0;
        display :inline-block;
    }

    #common .message .title .t-name{
       float:left;
       c(#333);
       font-size :28px;
       font-weight :bold;
    }

     #common .message .title .t-type{
       float:right;
       c(#FF5638);
       font-size :26px;
    }

    #common .message .time{
        c(#999);
        font-size:24px;
        lh(34px);
        
    }

    #common .message .apply{
        c(#333)
        font-size:32px;
        margin-top:24px;
        font-weight:bold;
    }

    #common .message .goods-list{
        overflow :hidden;
        c(#666)
        font-size :28px;
        margin-top:8px;
    }

    #common .message .goods-list .goods-name{
        float:left;
    }

    #common .message .goods-list .goods-count{
        float:right;
    }

     #common .message .type-2{
        c(#0096FF);
        font-size :28px;
        padding-top:16px;
        padding-bottom :16px;
        // border-bottom :1px solid #f6f6f6;
        
    }

    #common .message .bottom{
        padding:16px 0 16px 0;
        h(96);
        border-top: 1px solid #f6f6f6;
    }

    #common .message .bottom .to-deal{
        float:left;
        c(#999)
        lh(64)
        font-size:28px;
    }

    #common .message .bottom .examine{
        w(160)
        h(64)
        float:right;
        border:1px solid #f6f6f6;
        c(#333)
        text-align :center;
        lh(64)
        font-size:28px;
    }
    #common .support{
        h(98)
    }

     // continue
    #common .message .continue{
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

   #common .message .continue .report{
       overflow :hidden;
       margin-bottom :16px;
   } 

   #common .message .continue .report .left{
       float:left;
       c(#FF5638)
       font-size:26px;
       height:34px;
   }

   #common .message .continue .report .right{
       float:right;
       c(#999)
       font-size:26px;
       height:34px;
       lh(34);
   }

   #common .message .continue .tips{
       c(#666);
   }

//    
#common .below {
  width: 100%;
  height: 98px;
  background: rgba(255, 255, 255, 1);
  position: fixed;
  bottom: 0;
  font-size: 32px;
  color: rgba(255, 86, 56, 1);
  line-height: 98px;
  text-align: center;
  border-top: 1px solid #ededed;
  overflow: hidden;
}

#common .below .l-img {
  float: left;
  w(40);
  h(40);
  lh(98);
  display: block;
  margin: 28px;
}

#common .below .l-all {
  float: left;
  lh(98);
  c(#666);
  font-size: 30px;
}

#common .below .right {
  w(160);
  h(64);
  float: right;
  border: 1px solid #f6f6f6;
  c(#fff);
  bg(#FF5638);
  text-align: center;
  lh(64);
  font-size: 28px;
  display: inline-block;
  margin: 20px 24px 0 24px;
  border-radius: 8px;
}

#common .support {
  h(98);
}
</style>



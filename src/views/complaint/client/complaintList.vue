
<template>
    <div id="common">
         <!--终端客户  投诉列表  complaintList -->
        <section class="top-bar">
            <span :class="{'active': activeIdx == 0}" @click="switchBar(0)">待处理</span>
            <span :class="{'active': activeIdx == 1}" @click="switchBar(1)">已处理</span>
        </section>
        <div class="opt">
            <ul class="nav">
                <li :class="{'choosed': choosedIdx == 0}" @click="switchLi(0)">五粮液商贸公司</li>
                <li :class="{'choosed': choosedIdx == 1}" @click="switchLi(1)">茅台商贸公司</li>
                <li :class="{'choosed': choosedIdx == 2}" @click="switchLi(2)">郎酒商贸公司</li>
                <li :class="{'choosed': choosedIdx == 3}" @click="switchLi(3)">剑南春商贸公司</li>
                <li :class="{'choosed': choosedIdx == 4}" @click="switchLi(4)">五粮液商贸公司</li>
                <li :class="{'choosed': choosedIdx == 5}" @click="switchLi(5)">五粮液商贸公司</li>
            </ul>
        </div>
        <!-- <div v-if="judgeDeal==0"> -->
            <div class="message" v-for="x in [1,1,1]">
                <div class="title">
                    <div class="t-name">茅台商贸公司</div>
                    <div class="t-type">待处理</div>
                </div>
                <div class="time">2019-03-23 20:43</div>
                <div class="apply">销售人员态度不好</div>
                <div class="descript">我在这里下了一个单，销售人员态度非常不好，很不耐烦，没说几句还发脾气我在这里下了一个单，销售人…</div>
                <div class="type" v-if="activeIdx==0">商贸公司已经把您的退货转交给销售人员-小黑进行处理， 请耐心等待哦！</div>
                <div class="continue" v-if="activeIdx==1">
                    <div class="triangle"></div>
                    <div class="report">
                        <div class="left">茅台商贸公司回复：</div>
                        <div class="right">2019-03-23  20:40</div>
                    </div>
                    <div class="tips">亲爱的客户，非常抱歉给您带来的不便，您的反馈问题我们会在下次服务中改进。期待您再次光临</div>
                </div>
                
                <div class="bottom">
                    <div class="examine">查看详情</div>
                </div>
            </div>
        <!-- </div> -->
        
        <div class="support"></div>
        <div class="addAward">新增兑奖单</div>

    </div>
</template>

<script>
export default {
    data() {
      return {
        activeIdx: 0,   //选中的区间
        choosedIdx:1, //选中的li
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
      switchLi(idx) {
         this.choosedIdx = idx
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
    // opt
    #common .opt{
        overflow:hidden;
        border-top:1px solid #f6f6f6;
    }

    #common .opt .nav{
         padding:16px 24px 16px 24px;
        display: -webkit-box;
        overflow-x: scroll;
        -webkit-overflow-scrolling:touch;
        bg(white);
    }

    #common .opt .nav li{
        w(214)
        h(56)
        text-align :center;
        lh(56)
        bg(#f6f6f6)
        c(#666)
        margin-right:20px;
        border-radius :8px;
    }

    #common .opt .nav li.choosed{
        bg(#FFEEEB)
        c(#FF5638)
    }

    #common .message{
        margin-top:30px;
        padding:24px 24px 0 24px;
        bg(white);
    }

    #common .message .title{
        overflow :hidden;
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

  #common .message .descript{
        c(#666)
        font-size:28px;
        // margin-top:24px;
        // font-weight:bold;
    }

    // #common .message .goods-list{
    //     overflow :hidden;
    //     c(#666)
    //     font-size :28px;
    //     margin-top:8px;
    // }

    // #common .message .goods-list .goods-name{
    //     float:left;
    // }

    // #common .message .goods-list .goods-count{
    //     float:right;
    // }

    #common .message .type{
        c(#FF5638)
        font-size :28px;
        padding-top:16px;
        padding-bottom :16px;
        border-bottom :1px solid #f6f6f6;
    }

    //  #common .message .type-2{
    //     c(#0096FF);
    //     font-size :28px;
    //     padding-top:16px;
    //     padding-bottom :16px;
    //     // border-bottom :1px solid #f6f6f6;
        
    // }

    #common .message .bottom{
        padding:16px 0 16px 0;
        h(96)
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
    #common .addAward{
        width: 100%;
        height: 98px;
        background: rgba(255, 255, 255, 1);
        position: fixed;
        bottom: 0;
        font-size: 32px;
        color: rgba(255, 86, 56, 1);
        line-height: 98px;
        text-align: center;
        border-top:1px solid #ededed;
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
</style>



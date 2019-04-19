<template>
    <div id="common">
        <!--   终端客户 awardList 兑奖列表-->
        <section class="top-bar">
            <span :class="{'active': activeIdx == 0}" @click="switchBar(0)">待处理</span>
            <span :class="{'active': activeIdx == 1}" @click="switchBar(1)">已处理</span>
        </section>
        <div></div>
        <div class="message">
            <div class="">
                <div>茅台商贸公司</div>
                <div>待处理</div>
            </div>
            <div>2019-03-23 20:43</div>
            <div>兑奖申请</div>
            <div>
                <div>洋河蓝色经典 梦之蓝M6 52度</div>
                <div>X2</div>
            </div>
            <div>商贸公司已经把您的退货转交给销售人员-小黑进行处理， 请耐心等待哦！</div>
            <div>查看详情</div>
        </div>
        <button>新增兑奖单</button>

    </div>
</template>

<script>
export default {
    data() {

      return {
        activeIdx: 0,   //选中的区间
        
      }
    },
    computed: {

    },
    components: {

    },
    methods:{
        switchBar(idx) {
         this.activeIdx = idx
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
</style>



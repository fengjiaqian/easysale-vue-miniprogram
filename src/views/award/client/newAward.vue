<template>
    <div id="common">
        <!-- 终端客户  新建兑奖 newAward -->
        <div class="nav">
            <div class="title">兑奖商品</div>
            <div class="list" v-for = "x in [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]">
                <div class="left">
                    <img class="boot" src="../../../assets/images/user_code_icon.png" alt="" >
                </div>
                <div class="right">
                    <div class="r-top">
                        <div class="descrip">洋河蓝色经典 梦之蓝M6 52</div>
                        <div class="delete">删除</div>
                    </div>
                    <div class="r-bot">
                        <span class="amount">兑奖数量 : </span>
                        <img class="minus" src="../../../assets/images/icon-decrease.png" alt="">
                        <span class="count">10</span>
                        <img class="add" src="../../../assets/images/icon-increase.png" alt="">
                    </div>
                </div>
            </div>
            <div class="addGoods">+ 添加兑奖商品</div>
        </div>
        <div class="nav">
            <div class="title">备注</div>
            <textarea  cols="30" rows="10" class="report" placeholder="请输入内容"></textarea>
        </div>
        <div class="bot-surport"></div>
        <button class="sure-btn">提交</button>
    </div>
</template>

<script>
export default {
    
}
</script>


<style lang="stylus" scoped>
#common{
    bg(#f6f6f6);
}

#common .nav{
    padding:24px;
    padding-bottom :0;
}

#common .nav .title{
    height:80px;
    bg(white);
    font-size:30px;
    line-height:80px;
    font-weight :bold;
    c(#333);
    padding-left:24px;
    border-bottom :1px solid #f6f6f6;
}

// list
#common .nav .list{
    padding:24px 24px 0px 24px;
    bg(white);
    // border-bottom :1px solid #f6f6f6;
    overflow :hidden;
}

#common .nav .list .left{
    float:left;
    width:15%;
}

#common .nav .list .left img{
    float:left;
    display :inline-block;
    w(103);
    h(103);
}

#common .nav .list .right{
    float:left;
    margin-left:24px;
     width:81%;
}

#common .nav .list .right .r-top{
    h(103);
}

#common .nav .list .right .r-top .descrip{
    c(#333);
    font-size :30px;
    float:left;
}

#common .nav .list .right .r-top .delete{
    float:right;
    w(70px);
    c(#999);
    font-size :22px;
    border:1px solid #999;
    border-radius :10px;
    text-align :center;
}

#common .nav .list .right .r-bot{
    border-bottom :1px solid #f6f6f6;
    padding-bottom :24px;
    float:right;
    padding-left: 200px;
}

#common .nav .list .right .r-bot .amount{
    c(#333);
    w(100);
    font-size:30px;
    lh(40);
    h(40)
    font-weight :bold;
    margin-right:20px;
}

#common .nav .list .right .r-bot .count{
    w(60)
    h(40)
    lh(40);
    c(#333)
    display :inline-block;
    text-align :center;
    // float:right;
}

#common .nav .list .right .r-bot .add,
#common .nav .list .right .r-bot .minus{
    w(40)
    h(40)
    display :inline-block;
    vertical-align :middle;
}

#common .nav .addGoods{
    h(110);
    width:100%;
    text-align :center;
    lh(110);
    c(#FF5638);
    font-size:28px;
    font-weight :bold;
    bg(white);
    border-top:1px solid #f6f6f6;
}

#common .nav .report{
    width:100%;
    h(300px);
    border:0;
    outline :none;
    padding:24px;
    font-size:30px;
    c(rgba(189,189,189,1))
    lh(42)
    resize:none;
}

#common .bot-surport{
    h(128);
}
#common .sure-btn{
    width: 100%;
  height: 98px;
  background:rgba(255,86,56,1);
  position: fixed;
  bottom: 0;
  font-size: 32px;
  c(white);
  line-height: 98px;
  text-align: center;
  border:0;
  outline :none;
}


</style>
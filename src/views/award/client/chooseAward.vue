<template>
    <div id="choose">
        <!--终端客户   chooseAward   选择兑奖商品 -->
        <div class="box">
            <input type="text" class="search" placeholder="请输入商品名称">
        </div>
        <div class="top-support"></div>
        <div class="list" v-for="x in [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]">
            <img src="../../../assets/images/icon-checked.png" alt="" class="type">
            <!-- <img src="'../../../assets/images/icon-check.png'" alt="" class="type"> -->
            <img src="../../../assets/images/user_code_icon.png" alt="" class="boot"> 
            <div class="descrip">洋河蓝色经典 梦之蓝M6 52</div>
        </div>
        <div class="bot-support"></div>
        <button class="sure-btn">确定</button>
    </div>
</template>

<script>
export default {
    
}
</script>


<style lang="stylus" scoped>
#choose{
    bg(white);
}

#choose .box{
    width:100%;
    height: 110px;
    background-color: #fff;
    display: border-box;
    padding: 24px;
    padding: 24px 24px 10px 24px;
    border-bottom :1PX solid #f6f6f6;
    position: fixed;
    top: 0;
    z-index: 100;

}
#choose .top-support{
    height:110px;
}

#choose .box .search{
  width: 100%;
  height: 72px;
  border-radius: 10px;
  display: inline-block;
  text-align: center;
  margin: auto;
  outline: none;
  font-size: 28px;
  color: rgba(136, 136, 136, 1);
  background: rgba(246, 246, 246, 1) url('../../../assets/images/ic_sousuo@2x.png') no-repeat center;
  background-position: 30% center;
  background-size: 32px 32px;
}

#choose .list{
    overflow:hidden;
    padding:24px;
    // margin-top:110px;
}

#choose .list .type{
    w(40);
    h(40);
    display :inline-block;
    float:left;
    margin-top:40px;
    margin-right:40px;
}

#choose .list .boot{
    w(120);
    h(120);
    display :inline-block;
    float:left;
    margin-right:24px;
}

#choose .list .descrip{
    float:left;
    c(#333);
    font-size:30px;
    display :inline-block;
    float:left;
}

#choose .bot-support{
    h(98);
}

#choose .sure-btn{
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

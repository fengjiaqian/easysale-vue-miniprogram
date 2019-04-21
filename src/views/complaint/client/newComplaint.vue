<template>
  <div id="new">
      <!--终端客户  新建投诉  newComplaint -->
      <div class="reason">
          <div class="title">投诉原因</div>
          <input class="nav" value="商品质量不好" type="text" placeholder="请输入投诉原因">
      </div>
      <div class="descrip">
          <div class="title">内容描述</div>
          <textarea class="nav" name="" id="" cols="30" rows="12" placeholder="输入投诉内容"></textarea>
          <div class="count">0/100</div>
      </div>
      <div class="remark">
          <div class="title">备注</div>
          <textarea class="nav" name="" id="" cols="30" rows="12" placeholder="请输入内容"></textarea>
      </div>
      <button class="submit">提交</button>
   
  </div>
</template>

<script>
  export default {
    data() {
      return {
        
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

    #new{
        width:100%;
        padding:20px;
        background:rgba(246,246,246,1);
    }

    #new .reason{
        width:100%;
        padding-right:24px;
        padding-left:24px;
        h(221);
        bg(white);
        overflow : hidden;
    }

    #new .reason .title,
    #new .descrip .title,
    #new .remark .title{
        h(110)
        border-bottom:1px solid #f6f6f6;
        font-size :30px;
        c(#333);
        font-weight :bold;
        lh(110);
    }

    #new .reason .nav{
        h(110);
        w(700);
         lh(110);
         display :inline-block;
        outline :none;
    }

    #new .descrip,
    #new .remark{
        width:100%;
        margin:24px 0 24px 0;
        padding:0 24px 0 24px;
        bg(white);
        overflow : hidden;
    }

    #new .descrip .count{
        text-align :right;
        c(#999);
        margin-bottom:20px;
    }
    
    #new .descrip .nav,
    #new .remark .nav{
        width:100%;
        display :inline-block;
         padding:24px 0 0 0;
         border:none;
         resize :none;
         outline :none;
         font-size:30px;
         c(#333);
    }

    #new .submit{
        position :fixed;
        bottom :0;
        left:0;
        width:100%;
        h(98);
        bg(rgba(255,86,56,1))
        border:0;
        font-size:32px;
        c(white);
        text-align :center;
        lh(98);
        outline :none;
    }
</style>


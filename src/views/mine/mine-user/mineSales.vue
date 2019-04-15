<template>
  <div id="mine">
      <!-- userType : 2  销售人员   mineSales -->
    <div class="user-info">
      <div class="user-avart" @click="mineSkip('/my/userInfo')">
        <img v-lazy alt>
      </div>
      <div class="user-tel" @click="mineSkip('/my/userInfo')">
        <h5>终端客户的我的页面-小终端</h5>
        <p>电话：13555555555</p>
      </div>
    </div>
    <!--  -->
    <ul class="enter-list">
      <li class="enter-item" :class="item.class" @click="mineSkip(item.path)" v-for="item in mineMenu">
        <div class="enter-item-img">
          <span></span>
        </div>
        <div class="enter-item-txt">
          <span>{{item.title}}</span>
          <em></em>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        mineMenu: [
          {
            'title': '收货人管理',
            'class': 'consignee_manage',
            'path': '/myConsignee'
          },
          {
            'title': '申请经销商',
            'class': 'apply_dealer',
            'path': '/writeApplicationInformation'
          }
        ]
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
      mineSkip(path) {
        this.$router.push(path);
      },
    },
    watch: {

    }
  }
</script>

<style lang="stylus" scoped>
.enter-list {
  mt(20);
}

.enter-item {
  bg(#fff);

  &:nth-last-of-type(1), &:nth-last-of-type(2) {
    .enter-item-txt {
      border: 0;
    }
  }

  .enter-item-img {

    
    block();
    flt();
    w(104);
    h(90);

    img {
      block();
      squ(56);
      margin: 17px auto 0;
    }
    span{
      block();
      squ(56);
      margin: 17px auto 0;
      background-size contain
      background-repeat no-repeat
      background-position center
    }
  }

  .enter-item-txt {
    h(90);
    ml(104);
    c(#333);
    ft(30);
    flex-center();
    justify-content: space-between;


    em {
      block();
      w(16);
      h(26);
      mr(24);
      background: url('../../../assets/images/icon-enter.png') no-repeat center;
      background-size: contain;
    }
  }
}

.consignee_manage{
  .enter-item-img{
    span{
      background-image url(../../../assets/images/staff_icon.png)
    }
  }
  .enter-item-txt{
    border-bottom: 1px solid #ededed;
  }
}
.apply_dealer{
  .enter-item-img{
    span{
      background-image url(../../../assets/images/customer_icon.png)
    }
  }
}
.customer{
  mt(20)
  .enter-item-img{
    span{
      background-image url(../../../assets/images/customer_icon.png)
    }
  }
  .enter-item-txt{
    border-bottom: 1px solid #ededed;
  }
}
.staff{
  .enter-item-img{
    span{
      background-image url(../../../assets/images/staff_icon.png)
    }
  }
}
.setting{
  mt(20)
  .enter-item-img{
    span{
      background-image url(../../../assets/images/setting_icon.png)
    }
  }
}

// icon-order-handler
.user-info {
  padding 32px 24px
  bg(#fff);
}

.user-avart {
  squ(120);
  flt();
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
  }
}

.user-tel {
  ml(24)
  inline()
  h5 {
    ft(33);
    c(#333);
    lh(46);
    pt(12)
  }

  p {
    mt(8);
    lh(36);
    ft(26);
    c(#888);
  }
}
.user-code{
  float right
  flex()
  flex-direction column
  align-items center
  mt(12)
  i{
    inline
    w(48)
    h(48)
    background-image url(../../../assets/images/user_code_icon.png)
    background-size contain
    background-repeat no-repeat
    background-position center
    mb(8)
  }
}
  .mt-20{
    mt(20)
  }

</style>


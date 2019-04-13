<template>
  <div id="mine">
    <router-link to="/my/userInfo">
    <div class="user-info">
      <div class="user-avart">
        <img v-lazy alt>
      </div>
      <div class="user-tel">
        <h5>销售员-小黑</h5>
        <p>电话：13627762233</p>
      </div>
    </div>
    </router-link>
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
            'title': '商品管理',
            'class': 'product_manage',
            'path': '/my/statistical'
          },
          {
            'title': '数据统计',
            'class': 'data_static',
            'path': '/my/statistical'
          },
          {
            'title': '客户管理',
            'class': 'customer',
            'path': '/my/statistical'
          },          {
            'title': '员工管理',
            'class': 'staff',
            'path': '/my/statistical'
          },
          {
            'title': '设置',
            'icon': '../../assets/images/setting_icon.png',
            'class': 'setting',
            'path': '/my/statistical'
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
      background: url('./../../assets/images/icon-enter.png') no-repeat center;
      background-size: contain;
    }
  }
}

.product_manage{
  .enter-item-img{
    span{
      background-image url(../../assets/images/product_manage_icon.png)
    }
  }
  .enter-item-txt{
    border-bottom: 1px solid #ededed;
  }
}
.data_static{
  .enter-item-img{
    span{
      background-image url(../../assets/images/data_static_icon.png)
    }
  }
}
.customer{
  mt(20)
  .enter-item-img{
    span{
      background-image url(../../assets/images/customer_icon.png)
    }
  }
  .enter-item-txt{
    border-bottom: 1px solid #ededed;
  }
}
.staff{
  .enter-item-img{
    span{
      background-image url(../../assets/images/staff_icon.png)
    }
  }
}
.setting{
  mt(20)
  .enter-item-img{
    span{
      background-image url(../../assets/images/setting_icon.png)
    }
  }
}

// icon-order-handler
.user-info {
  pl(24);
  bg(#fff);
  padding: 32px 0;
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
  ml(120 + 24);

  h5 {
    ft(33);
    c(#333);
    lh(46);
  }

  p {
    mt(8);
    lh(36);
    ft(26);
    c(#888);
  }
}
  .mt-20{
    mt(20)
  }

</style>


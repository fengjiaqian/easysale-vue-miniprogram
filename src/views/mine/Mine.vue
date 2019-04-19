<template>
  <div id="mine">
    <div class="user-info">
      <div class="user-avart" @click="mineSkip('/customerInfo')">
        <img v-lazy="avatarUrl" alt>
      </div>
      <div class="user-tel" @click="mineSkip('/customerInfo')">
        <h5>{{nickName || '访客'}}</h5>

        <p>{{isVisitor?'未绑定':mobileNo}}</p>
      </div>
      <div class="user-code" v-if="userType==1" @click="mineSkip('/my/userInviteCode')">
        <i></i>
        <span>邀请码</span>
      </div>
      <a class="bind-tel" href="javascript:;" v-if="isVisitor" @click.stop="_bindPhone">绑定手机号</a>
    </div>
    <!-- 功能模块 -->
    <ul class="enter-list">
      <li
        class="enter-item"
        :class="item.class"
        @click="mineSkip(item.path)"
        v-for="item in mineMenu"
        :key="item.path"
      >
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
//TODO: 终端用户 申请经销商待审核状态显示
import * as mineUtil from "./mineCommon";
import storage from "common/storage";
export default {
  data() {
    return {
      mobileNo: storage.get("mobileNo", ""),
      avatarUrl: storage.get("avatarUrl", ""),
      nickName: storage.get("nickName", ""),
      mineMenu: []
    };
  },
  computed: {},
  components: {},
  beforeCreate: function() {},
  created: function() {
    this.mineMenu = mineUtil.initAccessModule(this.userType);
  },
  beforeDestory() {},
  destoryed() {},
  mounted() {},
  methods: {
    mineSkip(path) {
      if (this.navigateToLogin()) {
        return false;
      }
      this.$router.push(path);
    },
    _bindPhone() {
      this.navigateToLogin();
    }
  },
  watch: {}
};
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

    span {
      block();
      squ(56);
      margin: 17px auto 0;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
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

.product_manage {
  .enter-item-img {
    span {
      background-image: url('../../assets/images/product_manage_icon.png');
    }
  }

  .enter-item-txt {
    border-bottom: 1px solid #ededed;
  }
}

.data_static {
  .enter-item-img {
    span {
      background-image: url('../../assets/images/data_static_icon.png');
    }
  }
}

.customer {
  mt(20);

  .enter-item-img {
    span {
      background-image: url('../../assets/images/customer_icon.png');
    }
  }

  .enter-item-txt {
    border-bottom: 1px solid #ededed;
  }
}

.staff {
  .enter-item-img {
    span {
      background-image: url('../../assets/images/staff_icon.png');
    }
  }
}

.setting {
  mt(20);

  .enter-item-img {
    span {
      background-image: url('../../assets/images/setting_icon.png');
    }
  }
}

// icon-order-handler
.user-info {
  padding: 32px 24px;
  bg(#fff);
}

.user-avart {
  squ(120);
  flt();
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
}

.user-tel {
  h(120);
  ml(24);
  inline();

  h5 {
    h(46);
    ft(33);
    c(#333);
    lh(46);
    pt(20);
  }

  p {
    mt(20);
    lh(36);
    ft(26);
    c(#888);
  }

  span {
    float: right;
  }
}

.bind-tel {
  pos(absolute);
  top: 70px;
  right: 24px;
  block();
  w(154);
  lh(48);
  bg(#FFBD38);
  c(#fff);
  ft(26);
  text-c();
  radius(24);
}

.user-code {
  float: right;
  flex();
  flex-direction: column;
  align-items: center;
  mt(12);

  i {
    inline;
    w(48);
    h(48);
    background-image: url('../../assets/images/user_code_icon.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    mb(8);
  }
}

.mt-20 {
  mt(20);
}
</style>


<template>
    <div id="mine">
        <div class="user-info">
            <div class="user-avart" @click="_jumpUserInfo">
                <img v-lazy="avatarUrl" alt>
            </div>
            <div class="user-tel" @click="_jumpUserInfo">
                <h5>{{nickName || ''}}</h5>
                <a class="bind-tel" href="javascript:;" v-if="isVisitor" @click.stop="_bindPhone">绑定手机号</a>
                <p v-else>{{mobileNo}}</p>
            </div>
            <!-- <div class="user-code" v-if="userType==1" @click="mineSkip('/my/userInviteCode')">
              <i></i>
              <span>邀请码</span>
      </div>-->
      <div class="user-code" @click="shareShop">
        <i></i>
        <span>分享</span>
      </div>
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
          <div>
            <span class="mr-12 c-theme" v-if="item.path=='/my/shopkeeper' && auditState==0">审核中</span>
            <em></em>
          </div>
        </div>
      </li>
    </ul>
    <img :src="imgUrl">
  </div>
</template>

<script>
import { initAccessModule } from "./mineCommon";
import storage from "common/storage";
import { findCustomerOwerInfo } from "api/fetch/endCustomer";
import { queryShopInfo, synthesisroutineimg } from "api/fetch/mine";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      mobileNo: storage.get("mobileNo", ""),
      avatarUrl: storage.get("avatarUrl", ""),
      nickName: storage.get("nickName", ""),
      mineMenu: [],
      auditState: 1,
      imgUrl: ""
    };
  },
  computed: {
    ...mapGetters(["userInSwitching"])
  },
  components: {},
  beforeCreate: function() {},
  created: function() {
    this.mineMenu = initAccessModule(this.userType);
    this._findCustomerOwerInfo();
  },
  beforeDestory() {},
  destoryed() {},
  mounted() {},
  activated() {
    this.mineMenu = initAccessModule(this.userType);
    const refresh = storage.get("mineRefresh", false);
    refresh && this._findCustomerOwerInfo();
    storage.set("mineRefresh", false);
  },
  methods: {
    mineSkip(path) {
      if (this.navigateToLogin()) {
        return false;
      }
      //mobileNo  带过去手机号码
      if (path == "/writeApplicationInformation") {
        return this.$router.push({
          path,
          query: {
            mobileNo: this.mobileNo
          }
        });
      }
      if (path == "/my/shopkeeper" && this.auditState == 0) {
        path = "/my/authentication";
      }
      this.$router.push(path);
    },
    _bindPhone() {
      this.navigateToLogin();
    },
    //分角色跳转个人信息
    _jumpUserInfo() {
      this.navigateToLogin();
      if (this.userType == 3 && !this.userInSwitching) {
        this.mineSkip("/customerInfo");
      } else {
        this.mineSkip("/my/userInfo");
      }
    },
    //TODO 区别角色
    _findCustomerOwerInfo() {
      if (this.isVisitor) return false;
      if (this.userType == 3 && !this.userInSwitching) {
        findCustomerOwerInfo()
          .then(res => {
            this.mobileNo = res.data.phone;
            this.nickName = res.data.wxNickName;
            this.avatarUrl = res.data.iamgeUrl;
          })
          .catch(err => {});
        return false;
      }
      queryShopInfo({})
        .then(res => {
          this.mobileNo = res.data.phone;
          this.nickName = res.data.wxNickName;
          this.avatarUrl = res.data.iamgeUrl;
          this.auditState = res.data.auditState; //经销商进行店主认证（0：认证中，1：已认证  2.未认证）
          this.mineMenu = initAccessModule(this.userType, this.auditState);
        })
        .catch(err => {});
    },
    //分享店铺
    shareShop() {
      const currentDealer = storage.get("currentDealer") || {};
      const shopId = currentDealer.id || "";
      let params = {
        avatarImg: this.avatarUrl,
        userText: `${this.nickName}邀请您访问`,
        shopText: `${"「" + currentDealer.shopName + "」"}`
      };
      if (!this.lock) {
        this.lock = true;
        synthesisroutineimg(params)
          .then(res => {
            if (res.data) {
              let resultData = res.data;
              resultData.shopId = shopId;
              resultData = JSON.stringify(resultData);
              resultData = encodeURIComponent(resultData);
              const jumpUrl = encodeURIComponent(`navi/mine`);
              const path = `/pages/shareShop/shareShop?jumpUrl=${jumpUrl}&resultData=${resultData}`;
              window.wx.miniProgram.navigateTo({
                url: path
              });
            }
          })
          .catch(res => {
            this.$toast("分享失败，请点击重试。");
          });
      }
      setTimeout(() => {
        this.lock = false;
      }, 2000);
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

  &:nth-last-of-type(1) {
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
      inline();
      w(16);
      h(26);
      mr(24);
      background: url('./../../assets/images/icon-enter.png') no-repeat center;
      background-size: contain;
    }

            .mr-12 {
                mr(12);
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
            border-bottom: 1PX solid #ededed;
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
    border-bottom: 1PX solid #ededed;
  }
}

.staff {
  .enter-item-img {
    span {
      background-image: url('../../assets/images/staff_icon.png');
    }
  }
}

.manager {
  .enter-item-img {
    span {
      background-image: url('../../assets/images/manager_icon.png');
    }
  }

  .enter-item-txt {
    border-top: 1PX solid #ededed !important;
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
        mt(32)
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
  c(#666);
  ft(24);

  i {
    inline();
    w(48);
    h(48);
    background-image: url('../../assets/images/ic_share_shop.png');
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

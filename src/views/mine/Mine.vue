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
            <span class="mr-12 c-theme" v-if="item.path=='/my/shopkeeper' && auditState==0">认证中</span>
            <em></em>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { initAccessModule } from "./mineCommon";
import storage from "common/storage";
import { findCustomerOwerInfo} from "api/fetch/endCustomer";
import { changeShop} from "api/fetch/dealer";
import { queryShopInfo, synthesisroutineimg } from "api/fetch/mine";
import { mapGetters,mapActions } from "vuex";
export default {
  data() {
    return {
      mobileNo: storage.get("mobileNo", ""),
      avatarUrl: storage.get("avatarUrl", ""),
      nickName: storage.get("nickName", ""),
      mineMenu: [],
      auditState: 1,
    };
  },
  computed: {
    ...mapGetters(["userInSwitching"])
  },
  components: {},
  beforeCreate: function() {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let passData = to.query.passData ? to.query.passData : null;
      //console.log(passData)
      if (passData) {
        passData = JSON.parse(passData);
        if(passData.orderprintingData.uuid){
            //TODO 弹出是否授权小程序登录PC端订单打印页面  如果用户点击同意授权，则需要调用后台 提供的接口传递 uuid以及shopId验证授权登录
            // passData.orderprintingData.uuid   当这个没有值的时候   判断一下 passData.orderprintingData.code    = "-1" 扫描失败   = "-2" 非法二维码
        }
      }
    });
  },
  created: function() {
    this.mineMenu = initAccessModule(this.userType);
    this._findCustomerOwerInfo();
  },
  beforeDestory() {},
  destoryed() {},
  mounted() {
    this._changShop();
  },
  activated() {
    const refresh = storage.get("mineRefresh", false);
    if (refresh) {
      this._findCustomerOwerInfo();
    }
    storage.set("mineRefresh", false);
  },
  methods: {
    ...mapActions(["setUserType"]),
    _changShop(){
      console.log("--------------------------------");
      console.log("init:"+storage.get("currentDealerId"));
      changeShop(storage.get("currentDealerId"))
              .then(res => {
                this.setUserType(res.data || 3);
                storage.set("currentDealerId", dealer.id);
                storage.set("currentDealer", dealer);
                document.title = dealer.shopName;
                this.$router.push({
                  path: "/navi/home"
                });
              })
              .catch(_ => {
              });
    },
    mineSkip(path) {
      if (path == "/orderprintingclick") {
        let recordData = {
          path: this.$route.path
        };
        let passData = decodeURIComponent(JSON.stringify(recordData))
        let path = `/pages/orderprinting/orderprinting?passData=${passData}`
        window.wx.miniProgram.redirectTo({
          url: path,
        })
      }
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
      //数据统计 权限
      if (path == "/my/statistical" && this.userType != 1) {
        if (this.auditState == 2) {
          const msg =
            "您的店铺尚未认证，认证需要上传营业执照照片，是否立即认证？";
          return this.$confirm(msg)
            .then(() => {
              this.$router.push({ path: "/my/shopkeeper" });
            })
            .catch(() => {});
        } else if (this.auditState == 0) {
          return this.$confirm("您的店铺正在认证中，查看详情？")
            .then(() => {
              this.$router.push({ path: "/my/authentication" });
            })
            .catch(() => {});
        } else {
          path == "/my/statistical";
        }
      }
      //认证控制
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
      const { nickName, avatarUrl } = this;
      //终端客户
      if (this.userType == 3 && !this.userInSwitching) {
        this.mineMenu = initAccessModule(this.userType);
        if (nickName && avatarUrl) return false;
        return findCustomerOwerInfo()
          .then(res => {
            this.mobileNo = res.data.phone;
            this.nickName = res.data.wxNickName;
            this.avatarUrl = res.data.iamgeUrl;
          })
          .catch(err => {});
      }
      //非终端客户
      queryShopInfo({})
        .then(res => {
          this.mobileNo = res.data.phone;
          !nickName && (this.nickName = res.data.wxNickName);
          !avatarUrl && (this.avatarUrl = res.data.iamgeUrl);
          this.auditState = res.data.auditState; //经销商进行店主认证（0：认证中，1：已认证  2.未认证）
          const originUserType = res.data.userType; //返回的是原始状态  userType是当前状态。
          originUserType && storage.set("originUserType", originUserType);
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

.company {
  .enter-item-img {
    span {
      background-image: url('../../assets/images/company_icon.png');
    }
  }

  .enter-item-txt {
   /* border-top: 1PX solid #ededed !important;*/
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
  mt(32);
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

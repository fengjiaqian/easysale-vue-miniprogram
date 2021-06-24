<template>
  <div class="order-submit">
    <m-header :isFixed="true"></m-header>
    <div class="order-detail-area product-Info">
      <h5>商品信息</h5>
      <!--  -->
      <div class="submit-skus">
        <div class="submit-single-sku clearfix" v-for="product in products" :key="product.id">
          <div class="s-s-img">
            <img v-lazy="product.productImageUrl" alt>
          </div>
          <div class="s-s-main">
            <p class="name">{{product.productName}}</p>
            <div class="spec">
              <span>规格：{{product.specification}}</span>
            </div>
            <div class="price">
              <strong v-if="userType==3">{{product.price}}</strong>
              <input
                v-else
                type="text"
                :value="product.price"
                @change="handleProductPrice(product,$event)"
              >
              <span class="unit">元/{{product.priceUnit}}</span>
              <span class="frt fz28">X{{product.buyCount}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="order-detail-amount">
        订单总金额：
        <span class="c-theme">&yen;{{actualAmount | priceToFixed}}</span>
      </div>
    </div>
    <!--  -->
    <div class="order-detail-area">
      <h5>
        收货方式
        <a v-if="isHave==0"
           href="javascript:;"
           class="frt c-theme fz28"
           @click="_selectCustomer"
        >选择收货人</a>
      </h5>
      <div class="info-display pre">
        <ul class="option-list">
          <li>
            <span>自取</span>
            <i @click="switchHave()" :class="{'open':isHave}"></i>
          </li>
        </ul>
        <div class="h20"></div>
        <li class="special-li">
          <p><label v-if="isHave==0">送货时间：</label><label v-if="isHave==1">自取时间：</label>
            <el-date-picker
                class="date-pick-wrap"
                v-model="haveTime"
                type="date"
                placeholder="请选择日期"
            ></el-date-picker>
          </p>
        </li>
      </div>
      <div class="info-display pre">
        <p v-if="currentCustomer.name">客户姓名：{{currentCustomer.name}}</p>
        <p v-if="currentCustomer.name">手机号码：{{currentCustomer.phone}}</p>
        <p v-if="currentCustomer.name">收货地址：{{currentCustomer.address}}</p>
      </div>
    </div>
    <!--  -->
    <div class="select-customer" v-if="userType!=3">
      <strong class="fz30 fb">优惠</strong>
      <input
        ref="reduce"
        type="number"
        placeholder="请输入金额"
        :value="reduce"
        @change="handleChange"
        :class="{'c-theme':!!reduce}"
      >
    </div>
    <!-- 备注 -->
    <div class="order-detail-area">
      <h5>备注</h5>
      <div class="info-display">
        <textarea
          class="remark-txt"
          name="remark"
          id="remark"
          cols="60"
          rows="3"
          placeholder="请输入备注"
          v-model="remark"
        ></textarea>
      </div>
    </div>
    <!--  -->
    <div class="bottom" :class="{'isIphoneX':isIphoneX}" ref="bottomDom">
      <a
        href="javascript:;"
        @click="_OrderSubmit"
        :class="{'active':isHave==0&&currentCustomer.phone||isHave==1, 'isIphoneX':isIphoneX}"
      >提交订单</a>
      &yen;{{actualAmount | priceToFixed}}
    </div>
  </div>
</template>

<script>
function isValueNumber(value) {
  return /(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/.test(value);
}
/**
 * 终端用户下单 3  选择收货人
 * 经销商下单  1 选择客户  同销售人员
 */
import storage from "common/storage";
import { batchRemoveItem } from "common/goodsStorage";
import { OrderSubmit,createPayOrder} from "api/fetch/order";
import { transformOrderItems } from "common/productUtil";
import { evokeWxorderpay } from "common/orderpay";
export default {
  name: "order-submit",
  data() {
    return {
      isIphoneX: this.isIphoneX,
      reduce: 0,
      products: [],
      currentCustomer: {},
      remark: "",
      isHave: 0,
      haveTime: ""
    };
  },
  computed: {
    payableAmount() {
      //应付金额
      return this.products.reduce(
        (ac, cur) => (ac += cur.buyCount * cur.price),
        0
      );
    },
    actualAmount() {
      return this.payableAmount - this.reduce;
    }
  },
  beforeCreate() {},

  created() {
    this._initOrderInfo();
  },

  mounted() {
    this.hanlderBottomDom();
  },

  destroyed() {},

  methods: {
    _initOrderInfo() {
      /**
       * 初始化商品信息，优惠，备注，客户收货人信息。
       */
      this.products = storage.get("orderPrequeryParams", []);
      this.products = this.products.map(item => {
        item.price = Number(item.price).toFixed(2);
        return item;
      });
      const orderExtraParams = storage.get("orderExtraParams", {});
      this.reduce = orderExtraParams.reduce || "";
      this.remark = orderExtraParams.remark || "";
      const customerInfo = this.$route.query.customerInfo || "";
      customerInfo && (this.currentCustomer = this.decodeUrl(customerInfo));
      storage.set("fromOrder", false);
      storage.set("orderExtraParams", {});
    },
    _OrderSubmit() {
      const customerId = this.currentCustomer.id;
      if (!customerId && this.isHave==0) {
        const msg = this.userType == 3 ? "请选择收货人" : "请选择客户";
        return this.$toast(msg);
      }
      if (!this.haveTime) {
        const msg = this.isHave == 1? "请选择自取时间" : "请选择送货时间";
        return this.$toast(msg);
      }
      const orderItem = transformOrderItems(this.products);
      const params = {
        receiverId: customerId,
        orderItem,
        orderAmount: parseFloat(this.actualAmount.toPrecision(12)),
        reduceAmount: this.reduce || 0,
        payableAmount: parseFloat(this.payableAmount.toPrecision(12)),
        orderRemark: this.remark,
        isHave:this.isHave,
        haveTime:this.haveTime
      };
      OrderSubmit(params)
        .then(res => {
          params.id=res.data;
          createPayOrder(params).then(res => {
            batchRemoveItem(this.products);
            evokeWxorderpay(res.data);
          }).catch(err => {
            this.$router.push({
              path: "/orderResult",
              query: {
                err: err.message
              }
            });
          });
        })
        .catch(err => {
          this.$router.push({
            path: "/orderResult",
            query: {
              err: err.message
            }
          });
        });
    },
    _selectCustomer() {
      storage.set("fromOrder", true);
      //记录优惠和备注信息
      const orderExtraParams = {
        reduce: this.reduce,
        remark: this.remark
      };
      storage.set("orderPrequeryParams", this.products);
      storage.set("orderExtraParams", orderExtraParams);
      const path = this.userType == 3 ? "/myConsignee" : "/my/customerList";
      this.$router.push({
        path
      });
    },
    hanlderBottomDom() {
      const el = this.$refs.bottomDom;
      const clientHeight =
        document.body.clientHeight || document.documentElement.clientHeight;
      var resizeFn = function() {
        const thisHeight =
          document.body.clientHeight || document.documentElement.clientHeight;
        if (clientHeight - thisHeight > 140) {
          el.style.position = "static";
        } else {
          el.style.position = "fixed";
        }
      };
      window.addEventListener("resize", resizeFn);
    },
    handleChange(event) {
      var val = event.target.value.trim();
      if (isValueNumber(val)) {
        var max = this.payableAmount;
        val = Number(val).toFixed(2);
        this.reduce = val;
        if (val > max) this.reduce = max;
        if (val < 0) this.reduce = 0;
      } else {
        event.target.value = Number(this.reduce).toFixed(2);
      }
    },
    handleProductPrice(product, event) {
      var val = event.target.value.trim();
      if (isValueNumber(val)) {
        var max = 99999;
        val = Number(val).toFixed(2);
        product.price = val;
        if (val > max) product.price = max.toFixed(2);
        if (val < 0) product.price = 0.0;
      } else {
        event.target.value = product.price;
      }
    },
    //是否自提
    switchHave() {
      this.isHave = this.isHave == 1 ? 0 : 1
      if (this.isHave == 1) {
        this.currentCustomer.name="";
        this.currentCustomer.phone="";
        this.currentCustomer.address="";
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-date-picker{
  width 100% !important
  .el-picker-panel__content{
    width auto !important
  }
}
.option-list {
  padding: 0 0px;
  li {
    border-bottom: 1PX solid #FFFFFF;
    ft(30);
    c-3();
    padding: 0px 0;
    flex();
    align-content: center;
    justify-content: space-between;
    span {
      lh(56);
      color: #666;
    }
    i {
      w(102);
      h(56);
      background-image: url('../../assets/images/set_close_icon.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      &.open {
        background-image: url('../../assets/images/set_open_icon.png');
      }
    }
  }
}
.submit-skus {
  pt(24);
}

.submit-single-sku {
  mb(24);

  .s-s-img {
    flt();
    squ(150);

    img {
      width: 100%;
      height: 100%;
    }
  }

  .s-s-main {
    ml(175);

    .name {
      ft(29);
      c(#333);
    }

    .price {
      mt(22);
      lh(56);

      strong {
        ft(32);
        c($color-theme);
      }

      input {
        w(160);
        h(56);
        lh(56);
        radius(2);
        b1(rgba(221, 221, 221, 1));
        ft(30);
        c($color-theme);
        text-indent: 16px;
      }

      .unit {
        ft(26);
        c(#666);
      }
    }

    .spec {
      mt(21);
      ft(25);
      c(#999);
    }
  }
}

/* * */
.order-submit {
  pt(90);
  pb(92);
}

.remark-txt {
  width: 100%;
  padding: 12px;
  ft(28);
  c(#999);
  line-height: 1.2;
  b1(#ededed);
}

.info-display {
  padding: 20px 0;

  p {
    lh(50);
    c(#666);
    ft(30);
  }
}

.bottom {
  width: 100%;
  pl(24);
  pos(fixed);
  bottom: 0;
  left: 0;
  bg(#fff);
  lh(98);
  ft(48);
  c($color-theme);

  a {
    w(224);
    frt();
    bg(#BDBDBD);
    c(#fff);
    ft(32);
    text-c();

    &.active {
      bg($color-theme);
    }
  }
}

/*
.bottom.isIphoneX{
  padding-bottom 34px;
}*!
*/
.bottom .isIphoneX {
  padding-bottom: 34px;
}

.select-customer {
  margin: 20px 16px;
  padding: 0 24px;
  bg(#fff);
  lh(90);
  flex-center();
  justify-content: space-between;

  a {
    ft(28);
  }

  input {
    w(150);
    h(42);
    text-indent: 5px;
    ft(28);
    c(#333);
    text-align: right;
  }

  .c-theme {
    c($color-theme);
  }
}

.order-detail-area {
  margin: 20px 16px;
  padding: 0 24px;
  bg(#fff);

  h5 {
    lh(90);
    ft(30);
    fb();
    border-bottom: 1PX solid #EDEDED;
  }

  .info-display {
    &:nth-of-type(2) {
      border-top: 1PX solid #EDEDED;
    }
  }
}

.product-Info {
  .order-detail-amount {
    lh(90);
    ft(30);
    c(#333);
    text-align: right;
    border-top: 1PX solid #EDEDED;
  }
}
</style>


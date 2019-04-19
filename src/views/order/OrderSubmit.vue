<template>
  <div class="order-submit">
    <!-- <div class="select-customer">
      <strong class="fz30">收货人信息</strong>
      <a
        class="c-theme"
        href="javascript:;"
        @click="_selectCustomer"
      >{{customers.length?'选择客户':'新增客户'}}</a>
    </div>-->

    <!--  -->
    <div class="order-detail-area" v-if="!userType==3">
      <h5>
        收货人信息
        <a
          href="javascript:;"
          class="frt c-theme fz28"
          @click="_selectCustomer"
        >{{userType==3?'选择收货人':'选择客户'}}</a>
      </h5>
      <div class="info-display pre" v-if="currentCustomer.name">
        <p>客户姓名：{{currentCustomer.name}}</p>
        <p>手机号码：{{currentCustomer.phone}}</p>
      </div>
      <div class="info-display" v-if="currentCustomer.name">
        <p>店铺名称：{{currentCustomer.customerShopName}}</p>
        <p>收货地址：{{currentCustomer.address}}</p>
      </div>
    </div>
    <!--  -->
    <div class="order-detail-area" v-else>
      <h5>
        收货人信息
        <a
          href="javascript:;"
          class="frt c-theme fz28"
          @click="_selectCustomer"
        >{{userType==3?'选择收货人':'选择客户'}}</a>
      </h5>
      <div class="info-display pre" v-if="currentCustomer.name">
        <p>客户姓名：{{currentCustomer.name}}</p>
        <p>手机号码：{{currentCustomer.phone}}</p>
      </div>
      <div class="info-display" v-if="currentCustomer.name">
        <p>店铺名称：{{currentCustomer.customerShopName}}</p>
        <p>收货地址：{{currentCustomer.address}}</p>
      </div>
    </div>
    <!--  -->
    <div class="order-detail-area product-Info">
      <h5>商品信息</h5>
      <!-- 单个产品 -->
      <div class="single-sku clearfix" v-if="products.length===1">
        <div class="s-s-img">
          <img v-lazy="products[0].productImageUrl" alt>
        </div>
        <div class="s-s-main">
          <p class="name">{{products[0].productName}}</p>
          <div class="price">{{products[0].price}}元/{{products[0].priceUnit}}</div>
          <div class="price">
            <span>规格：{{products[0].specification}}</span>
            <span class="frt fz28">X{{products[0].buyCount}}</span>
          </div>
        </div>
      </div>
      <!-- 多个产品 -->
      <div class="multiple-skus" v-else @click="_jumpGoodsList">
        <div class="m-s-amount">共{{amount}}></div>
        <ul class="m-s-skus clearfix">
          <li v-for="item in products" :key="item.id">
            <a href="javascript:;">
              <img v-lazy="item.productImageUrl || ''" alt>
              <span>X{{item.buyCount}}{{item.priceUnit}}</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="order-detail-amount">
        订单总金额：
        <span class="c-theme">&yen;{{totalMoney.toFixed(2)}}</span>
      </div>
    </div>
    <div class="select-customer">
      <strong class="fz30">折扣</strong>
      <input type="number" placeholder="请输入折扣">
    </div>
    <!--  -->
    <div class="bottom">
      <a href="javascript:;" @click="_OrderSubmit">提交订单</a>
      &yen;{{totalMoney.toFixed(2)}}
    </div>
  </div>
</template>

<script>
/**
 * 终端用户下单 3  选择收货人
 * 经销商下单  1 选择客户  同销售人员
 *
 */
const enterFail = function(msg) {
  this.$router.push({
    path: "/orderResult",
    query: {
      err: msg
    }
  });
};
import storage from "common/storage";
import { OrderSubmit } from "api/fetch/order";
import { transformOrderItems } from "common/productUtil";
import { queryAddressList } from "api/fetch/endCustomer";
import { findCustomerList } from "api/fetch/dealer";
export default {
  name: "order-submit",
  data() {
    return {
      products: [],
      amount: 0,
      totalMoney: 0,
      addresList: [], //收货人列表 userType3
      customers: [], //客户列表   userType1 2
      currentCustomer: {} //当前客户
    };
  },
  beforeCreate() {},
  created() {
    //TODO prefix userId
    this.products = storage.get("orderPrequeryParams", []);
    this.amount = this.products.reduce((ac, cur) => (ac += cur.buyCount), 0);
    this.totalMoney = this.products.reduce(
      (ac, cur) => (ac += cur.buyCount * cur.price),
      0
    );
    //
    const customerInfo = this.$route.query.customerInfo || "";
    customerInfo &&
      (this.currentCustomer = JSON.parse(decodeURIComponent(customerInfo)));
    this._initInRole();
  },
  mounted() {},
  methods: {
    _initInRole() {
      if (this.userType == 3) {
        this.listAddress();
      } else {
        this.listCustomers();
      }
    },
    _OrderSubmit() {
      const dealerId = 323232,
        customerId = this.currentCustomer.id,
        orderAmount = 90;
      const orderItem = transformOrderItems(this.products);
      const params = {
        //dealerId,
        customerId,
        orderAmount,
        orderItem
        // createUser: 465273,
        // updateUser: 465273
      };
      OrderSubmit(params)
        .then(res => {
          console.log(res);
          this.$router.push({ path: "/orderResult" });
        })
        .catch(err => {
          enterFail.call(this, err.message);
        });
    },
    _jumpGoodsList() {
      const products = encodeURIComponent(JSON.stringify(this.products));
      this.$router.push({
        path: "/goodsList",
        query: { products }
      });
    },
    //收货人列表
    listAddress() {
      queryAddressList()
        .then(res => {
          this.addresList = res.data || [];
        })
        .catch(err => {
          this.$toast(err.message);
        });
    },
    //客户列表
    listCustomers() {
      findCustomerList()
        .then(res => {
          this.customers = res.data || [];
        })
        .catch(err => {
          this.$toast(err.message);
        });
    },
    _selectCustomer() {
      if (!this.customers.length) {
        //新增客户
        return this.$router.push({
          path: "/my/addCustomerInfo",
          query: {
            fromOrder: true
          }
        });
      }
      //选择客户
      this.$router.push({
        path: "/my/customerList",
        query: {
          fromOrder: true
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './common.styl';

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
  h(98);
  lh(98);
  ft(48);
  c($color-theme);

  a {
    w(224);
    h(98);
    frt();
    bg($color-theme);
    c(#fff);
    ft(32);
    text-c();
  }
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
    border-bottom: 1px solid #EDEDED;
  }

  .info-display {
    &:nth-of-type(2) {
      border-top: 1px solid #EDEDED;
    }
  }
}

.product-Info {
  .order-detail-amount {
    lh(90);
    ft(30);
    c(#333);
    text-align: right;
    border-top: 1px solid #EDEDED;
  }
}
</style>


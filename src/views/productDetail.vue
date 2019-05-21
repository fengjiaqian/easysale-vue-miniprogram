<template>
  <div id="detail">
    <!--  -->
    <float-cart></float-cart>
    <m-header :isFixed="true"></m-header>
    <div v-if="product.productName">
      <div class="D-img">
        <img v-lazy="product.productImageUrl || ''" :alt="product.productName">
      </div>
      <div class="D-name">{{product.productName}}</div>
      <!-- wx 新增加的div  描述规格 -->
      <div class="D-norm">规格 : {{product.specification}}</div>
      <div class="D-price">
        <span class="c-yellow" v-html="$options.filters.price(product.price,product.priceUnit)"></span>
      </div>
      <div class="p-remark">{{product.remark}}</div>
      <div class="fill"></div>
      <div class="D-number">
        <span class="c-3 fz30" style="font-weight:bold">数量</span>
        <number-picker :product="product"></number-picker>
      </div>
      <!--  -->
      <div class="D-info">
        <div class="fill"></div>
        <h3>商品介绍</h3>
        <ul class="D-info-list">
          <li>品牌：{{product.brandName}}</li>
          <li v-if="product.description">简介：{{product.description}}</li>
        </ul>
      </div>
    </div>
    <!-- <div class="D-bottom">
      <div class="D-bottom-left">
        <dl class="D-link">
          <dt class="shouye"></dt>
          <router-link tag="dd" to="/navi/home">首页</router-link>
        </dl>
        <dl class="D-link">
          <dt class="order"></dt>
          <router-link tag="dd" to="/cart">购物车</router-link>
        </dl>
      </div>
      <div class="D-bottom-right">
        <a href="javascript:;" class="normal-btn immediately" @click="_immediatelyBuy(product)">立即下单</a>
        <a href="javascript:;" class="normal-btn" @click="_addToCart(product)">加入购物车</a>
      </div>
    </div>-->
  </div>
</template>

<script>
import storage from "common/storage";
import numberPicker from "components/number-picker.vue";
import floatCart from "components/floatCart.vue";
import { queryProductDetail } from "api/fetch/productDetail";
import { updateItem, getAllGoods } from "common/goodsStorage";
import mHeader from "components/header.vue";
import searchBar from "components/searchBar.vue";
export default {
  name: "detail",
  data() {
    return {
      product: {}
    };
  },
  components: {
    numberPicker,
    floatCart,
    mHeader,
    searchBar
  },
  created() {
    this._queryDetail();
  },
  mounted() {},
  methods: {
    _queryDetail() {
      const skuId = this.$route.params.code;
      queryProductDetail(skuId).then(res => {
        if (res.result === "success" && res.data) {
          this.product = this.initPorduct(res.data);
        }
      });
    },
    //TODO如果缓存中有数据 直接取
    initPorduct(product) {
      const storageGoods = getAllGoods();
      if (storageGoods && storageGoods.length) {
        const itemInStore = storageGoods.find(item => item.id === product.id);
        product.buyCount = itemInStore ? itemInStore.buyCount : 0;
      } else {
        product.buyCount = 0;
      }
      product.minBuyNum = 1;
      product.maxBuyNum = 9999;
      return product;
    },
    _addToCart(product) {
      updateItem(product, product.buyCount, true);
      this.$toast("加入购物车成功");
    },
    // 立即购买
    _immediatelyBuy(product) {
      //TODO  加上userId
      storage.set("orderPrequeryParams", [product]);
      this.$router.push({
        path: "/orderSubmit"
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
#detail {
  pt(90);
  height: 100%;
  background: #fff;
}

.fill {
  width: 100%;
  h(20);
  bg(#F6F6F6);
}

.D-link {
  inline();
  width: 50%;
  h(98);

  dt {
    squ(48);
    margin: 0 auto;
    mt(10);

    &.shouye {
      background: url('../assets/images/icon-shouye.png') no-repeat center;
      background-size: contain;
    }

    &.order {
      background: url('../assets/images/icon-orders.png') no-repeat center;
      background-size: contain;
    }
  }

  dd {
    mt(2);
    lh(30);
    ft(22);
    c(#999);
    text-c();
  }
}

.D-bottom {
  pos(fixed);
  left: 0;
  bottom: 0;
  width: 100%;
  h(98);
  bg(#fff);
  display: none;
}

.D-bottom-left {
  width: 40%;
  flt();
}

.D-bottom-right {
  width: 60%;
  frt();
}

.normal-btn {
  inline();
  width: 50%;
  c(#fff);
  ft(32);
  lh(98);
  bg(#FF5638);
  text-c();
}

.immediately {
  bg(#FFBD38);
}

.D-info {
  mt(20);
  bg(#fff);

  h3 {
    lh(90);
    pl(24);
    c(#333);
    ft(30);
    border-bottom: 1PX solid #EDEDED;
    font-weight: bold;
  }
}

.D-info-list {
  padding: 20px 20px 20px 24px;

  li {
    lh(54);
    c(#666);
    ft(28);
  }
}

.D-img {
  padding: 50px 0;
  bg(#fff);

  img {
    squ(400);
    block();
    margin: 0 auto;
  }
}

.D-name {
  bg(#fff);
  pl(24);
  // lh(94);
  lh(70);
  c(#333);
  ft(34);
  font-weight: bold;
}

.D-norm {
  bg(#fff);
  c(#999);
  ft(30);
  pl(24);
  lh(46);
}

.D-price {
  pt(16);
  bg(#fff);
  pb(24);
  pl(24);
}
.p-remark {
  bg(#fff);
  c(#FF5500);
  ft(30);
  pl(24);
  lh(46);
}

.D-number {
  h(90);
  bg(#fff);
  padding: 0 24px;
  flex-center();
  justify-content: space-between;
}
</style>


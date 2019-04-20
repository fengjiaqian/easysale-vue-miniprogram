<template>
  <div id="cart">
    <empty v-if="!products.length" :txt="'购物车暂无商品'" ></empty>
    <div class="C-header" v-if="products.length">
      <strong>共{{products.length}}商品</strong>
      <a href="javascript:;" class="c-3" @click="_delete">删除</a>
    </div>
    <!--  -->
    <product-cart v-for="item in products" :product="item" :key="item.id" @itemSelect="_itemSelect"></product-cart>
    <!--  -->
    <div class="C-bottom" v-if="products.length">
      <span class="C-check-icon" :class="{'checked': isAllSelected}" @click="_allSelect()"></span>
      <!--  -->
      <a href="javascript:;" class="C-bottom-right" @click="_submitOrder">
        下单
        <span v-show="amount">({{amount}})</span>
      </a>
      <div class="C-bottom-left">
        <span>全选</span>
        <span>合计¥{{totalMoney}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import productCart from "components/product-cart.vue";
import {
  getAllGoods,
  clearGoods,
  removeItem,
  setAllGoods
} from "common/goodsStorage";
import empty from "components/empty.vue";
import storage from "common/storage";
import Bus from "common/Bus";
export default {
  name: "cart",
  data() {
    return {
      isAllSelected: false, //商品全选
      products: []
    };
  },
  components: {
    productCart,
    empty
  },
  computed: {
    amount() {
      let amount = 0;
      const products = this.products.filter(item => item.checked);
      return products.reduce((acc, cur) => (acc += cur.buyCount), amount);
    },
    totalMoney() {
      let totalMoney = 0;
      const products = this.products.filter(item => item.checked);
      for (let product of products) {
        totalMoney += product.buyCount * product.price;
      }
      return totalMoney.toFixed(2);
    }
  },
  created() {
    this.initProducts();
  },
  mounted() {
    Bus.$on("deleteOneInCart", id => {
      this._delete(id);
    });
  },
  //路由离开之前，改变缓存商品cheched的状态
  beforeRouteLeave(to, from, next) {
    setAllGoods(this.products);
    next();
  },
  methods: {
    //初始化购物车商品
    initProducts() {
      const storeProducts = getAllGoods();
      for (let product of storeProducts) {
        if (!product.hasOwnProperty("checked")) {
          product.checked = true;
        }
      }
      this.products = storeProducts;
      this.isAllSelected = !this.products.some(item => !item.checked);
    },
    //处理商品全选
    _allSelect() {
      this.isAllSelected = !this.isAllSelected;
      this.products.forEach(product => {
        product.checked = this.isAllSelected;
        return product;
      });
    },
    //处理商品单选
    _itemSelect(product) {
      product.checked = !product.checked;
      this.isAllSelected = !this.products.some(item => !item.checked);
    },
    //删除单个或者多个商品
    _delete(id) {
      let selectedProducts = [];
      if (typeof id === "object") {
        //此时id为$event
        selectedProducts = this.products.filter(item => !!item.checked);
      } else {
        selectedProducts = this.products.filter(item => item.id == id);
      }
      if (!selectedProducts.length) {
        return this.$toast("请选择需要删除的商品");
      }
      if (selectedProducts.length === this.products.length) {
        return this.$confirm("确定删除所有商品？")
          .then(() => {
            clearGoods();
            this.products = [];
          })
          .catch(() => {});
      }
      this.$confirm("确定删除已选中的商品？")
        .then(() => {
          for (let item of selectedProducts) {
            const Idx = this.products.findIndex(
              product => product.id === item.id
            );
            if (Idx != -1) {
              removeItem(this.products[Idx]);
              this.products.splice(Idx, 1);
            }
          }
        })
        .catch(() => {});
    },
    //提交订单
    _submitOrder() {
      if (this.navigateToLogin()) return false;
      const selectedProducts = this.products.filter(item => item.checked);
      if (!selectedProducts.length) {
        return this.$toast("请选择商品");
      }
      //TODO  加上userId
      storage.set("orderPrequeryParams", selectedProducts);
      this.$router.push({
        path: "/orderSubmit"
      });
    }
  }
};
</script>

<style lang="stylus">
#cart {
  pt(92);
  pb(98);
}

.C-header {
  width: 100%;
  pos(fixed);
  top: 0;
  left: 0;
  z-index: 10;
  h(92);
  bg(#fff);
  padding: 0 24px;
  ft(30);
  c(#333);
  flex-center();
  justify-content: space-between;
  border-bottom: 1px solid #EDEDED;

  strong {
    ft(34);
  }
}

.C-bottom {
  bg(#fff);
  width: 100%;
  h(98);
  pl(88);
  pos(fixed);
  left: 0;
  bottom: 0;
  z-index: 10;

  .C-check-icon {
    top: 29px;
  }
}

.C-bottom-left {
  mr(224);
  pr(16);
  h(98);
  ft(30);
  flex-center();
  justify-content: space-between;
}

.C-bottom-right {
  w(224);
  lh(98);
  frt();
  bg(#FF5638);
  ft(32);
  c(#fff);
  text-c();
}
</style>


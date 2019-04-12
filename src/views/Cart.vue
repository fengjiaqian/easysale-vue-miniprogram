<template>
  <div id="orders">
    <product-cart v-for="item in products" :product="item" :key="item.id" @itemSelect="_itemSelect"></product-cart>
    <!--  -->
    <div class="O-bottom">
      <span class="O-check-icon" :class="{'checked': isAllSelected}" @click="_allSelect()"></span>
      <!--  -->
      <a href="javascript:;" class="O-bottom-right">
        下单
        <span v-show="amount">({{amount}})</span>
      </a>
      <div class="O-bottom-left">
        <span>全选</span>
        <span>合计¥{{totalMoney}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import productCart from "components/product-cart.vue";
import { getAllGoods } from "common/goodsStorage";
export default {
  name: "orders",
  data() {
    return {
      isAllSelected: false, //商品全选
      products: []
    };
  },
  components: {
    productCart
  },
  computed: {
    amount() {
      let amount = 0;
      const products = this.products.filter(item => item.checked);
      for (let product of products) {
        amount += product.buyCount;
      }
      return amount;
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
  methods: {
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
    }
  }
};
</script>

<style lang="stylus">
#orders {
  pb(98 + 98);
}

.O-bottom {
  bg(#fff);
  width: 100%;
  h(98);
  pos(fixed);
  left: 0;
  bottom: 0;
  pl(88);

  .O-check-icon {
    top: 29px;
  }
}

.O-bottom-left {
  mr(224);
  pr(16);
  h(98);
  ft(30);
  flex-center();
  justify-content: space-between;
}

.O-bottom-right {
  w(224);
  lh(98);
  frt();
  bg(#FF5638);
  ft(32);
  c(#fff);
  text-c();
}
</style>


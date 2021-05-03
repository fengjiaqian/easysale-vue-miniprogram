<template>
  <div class="order-products-wrap">
    <div class="O-item-skus" v-if="products.length<=3">
      <!-- 单个产品 -->
      <div class="single-sku clearfix" v-for="product in products" :key="product.id">
        <div class="s-s-img">
          <img v-lazy="product.productImageUrl" alt>
        </div>
        <div class="s-s-main">
          <p class="name">{{product.productName}}</p>
          <div class="price">{{product.price}}元/{{product.priceUnit}}</div>
          <div class="price">
            <span>规格：{{product.specification}}</span>
            <span class="frt fz28">X{{product.buyCount}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="O-item-skus" v-else>
      <!-- 多个产品 -->
      <div class="multiple-skus" @click.stop="_jumpGoodsList">
        <div class="m-s-amount">共{{amount}}></div>
        <ul class="m-s-skus clearfix">
          <li v-for="product in products" :key="product.id">
            <a href="javascript:;">
              <img v-lazy=" product.productImageUrl || ''" alt>
              <span>X{{product.buyCount}}{{product.priceUnit}}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "order-products",
  props: {
    products: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  created() {
    this.amount = this.products.reduce((ac, cur) => (ac += cur.buyCount), 0);
  },
  mounted() {},
  methods: {
    _jumpGoodsList() {
      const products = this.encodeUrl(this.products);
      this.$router.push({
        path: "/goodsList",
        query: { products }
      });
    }
  }
};
</script>

<style lang="stylus">
.O-item-skus {
  pb(16);
}

.single-sku {
  mt(16);

  .s-s-img {
    flt();
    squ(150);
    b1(#ededed);

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
      mt(21);
      ft(25);
      c(#333);
    }
  }
}

.multiple-skus {
  mt(16);

  .m-s-amount {
    lh(150);
    ft(29);
    c(#333);
    padding: 0 5px 0 19px;
    frt();
  }
}

.m-s-skus {
  h(150);
  mr(100);
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;

  li {
    inline();

    &:nth-last-of-type(1) {
      a {
        mr(0);
      }
    }

    a {
      block();
      mr(21);
      pos(relative);
      squ(150);

      img {
        width: 100%;
        height: 100%;
      }

      span {
        pos(absolute);
        bottom: 0;
        left: 0;
        lh(30);
        h(30);
        width: 100%;
        bg(rgba(0, 0, 0, 0.5));
        ft(23);
        c(#fff);
        text-c();
      }
    }
  }
}
</style>


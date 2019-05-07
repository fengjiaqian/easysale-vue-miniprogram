<template>
  <div id="detail" class="pt90" v-show="domShow">
    <m-header :isFixed="true"></m-header>
    <div class="D-img">
      <img v-lazy="product.productImageUrl || ''" :alt="product.productName">
    </div>
    <div class="D-name">{{product.productName}}</div>
    <div class="D-grama">
      <span class="brand">品牌：{{product.brandName}}</span>
    </div>
    <div class="D-spec">
      规格：
      <span>{{product.specification}}</span>
    </div>
    <div class="D-price">
      <span class="c-yellow" v-html="$options.filters.price(product.price,product.priceUnit)"></span>
    </div>
    <!-- 退换，兑奖，陈列 标签 -->
    <div class="D-options" v-if="product.returnState || product.awardState || product.displayState">
      <div class="tags">
        <span v-if="product.returnState">可退货</span>
        <span v-if="product.awardState">可兑奖</span>
        <span v-if="product.displayState">可陈列</span>
      </div>
      <div class="reward" v-if="product.displayState&&product.displayAward">陈列奖励：{{product.displayAward}}</div>
    </div>
    <div class="D-info">
      <h3>商品介绍</h3>
      <ul class="D-info-list">
        <li>{{product.description}}</li>
      </ul>
    </div>
    <div class="bottom-btn" v-if="sourceType=='display'" @click="apply">申请陈列</div>
    <div class="D-bottom" v-else>
      <span @click="deleteProduct">删除</span>
      <span class="edit" @click="editProduct">编辑</span>
    </div>
  </div>
</template>

<script>
import { productDetail, oprateManageProduct } from "api/fetch/mine";
import { displayApply } from "api/fetch/display";
export default {
  data() {
    return {
      domShow: false,
      id: "", //商品id
      product: {}, //商品对象
      oprateParam: {
        idList: [],
        state: 0 //状态 0:删除 1：已上架  2：已下架
      }, //商品操作查询参数
      sourceType: '',//来源页面
    };
  },
  components: {},
  created() {
    localStorage.removeItem("productInfo");
    this.sourceType = this.$route.query.source;
    this.id = this.$route.query.id;
    this.oprateParam.idList = [this.id];
    this._queryDetail();
  },
  mounted() {},
  methods: {
    _queryDetail() {
      let param = {
        id: this.id
      };
      productDetail(param).then(res => {
        if (res.result === "success" && res.data) {
          this.domShow = true;
          this.product = res.data;
        }
      });
    },
    deleteProduct() {
      this.$confirm("确定要删除该商品吗？")
              .then(() => {
                oprateManageProduct(this.oprateParam).then(res => {
                  if (res.result === "success") {
                    this.$toast("操作成功");
                    //操作成功后返回商品管理列表
                    this.$router.push({ path: "/my/productList" });
                  }
                });
              })
              .catch(() => {});
    },
    editProduct() {
      localStorage.setItem("productInfo", JSON.stringify(this.product));
      this.$router.push({ path: "/my/editProduct" });
    },
    //底部申请操作
    apply(){
      let param = {
        remark: '',
        items: [{
          productId: this.id
        }]
      }
      displayApply(param)
          .then(res => {
            if (res.result === "success") {
              this.$toast("申请提交成功！");
              this.$router.go(-1);
            }
          })
          .catch(err => {
            this.$toast(err.message);
          });
    },
  }
};
</script>

<style lang="stylus" scoped>
.D-link {
  inline();
  width: 50%;
  h(98);

  dt {
    squ(48);
    margin: 0 auto;
    mt(10);

    &.shouye {
      background: url('../../../assets/images/icon-shouye.png') no-repeat center;
      background-size: contain;
    }

    &.order {
      background: url('../../../assets/images/icon-orders.png') no-repeat center;
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
  }
}

.D-info-list {
  min-height: 200px;
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
  flex();
  align-items: center;
  bg(#fff);
  pl(24);
  lh(80);
  c(#333);
  ft(34);
}

.D-grama {
  padding: 24px;
  ft(30);
  c-9();
  mt(8);
  flex-center();
  bg(#fff);

  .brand {
    flex-1();
  }

  .state {
    flex-center();

    i {
      padding: 0 3PX;
      border-radius: 4px;
      c(#fff);
      ft(28);
      ml(8);

      &.s-success {
        bg(#FF5638);
      }

      &.s-fail {
        bg(#BDBDBD);
      }
    }
  }
}

.D-spec {
  bg(#fff);
  pl(24);
  c(#999);
  ft(30);
  pb(16);
}

.D-price {
  bg(#fff);
  pb(16);
  pl(24);
  h(66);
}

.D-number {
  h(90);
  mt(20);
  bg(#fff);
  padding: 0 24px;
  flex-center();
  justify-content: space-between;
}

.D-bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  lh(98);
  bg(#fff);
  ft(30);
  c-6();
  flex-center();

  span {
    width: 50%;
    text-c();
  }

  .edit {
    c(#FF5638);
  }
}

.s-success {
  background: #FF5638 !important;
}

.s-fail {
  background: #BDBDBD !important;
}
.D-options{
  padding 0 24px 24px
  bg(#fff)
  .tags{
    border-top 1PX solid #EDEDED
    pt(24)
    flex()
    align-content center
    span{
      background rgba(100,102,116,0.1)
      border-radius 4px
      ft(24)
      c(#646674)
      mr(16)
      padding 2px 12px
    }
  }
  .reward{
    mt(24)
    ft(28)
    c-6()
  }
}
.bottom-btn{
  position fixed
  left 0
  bottom 0
  z-index 2
  width 100%
  lh(98)
  bg(#FF5638)
  ft(32)
  c(#fff)
  text-c()
}
</style>


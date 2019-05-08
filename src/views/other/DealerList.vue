<template>
  <div class="dealer-list">
    <m-header :isSearch="true" placeholder="请输入店铺名称" @emitEvt="_searchKeyChange"></m-header>
    <div class="current-dealer" v-if="currentDealer.phone">
      <div class="title">当前商贸公司</div>
      <div class="dealer-item">
        <!-- <div class="pic">
          <img v-lazy="currentDealer.logoIamgeUrl || ''" alt>
        </div>-->
        <div class="content" style="border: 0;">
          <p>{{currentDealer.shopName}}</p>
          <p>电话：{{currentDealer.phone}}</p>
        </div>
        <span class="checked"></span>
      </div>
    </div>
    <!--  -->
    <empty
      class="dealer-scroll-list"
      :class="{'pt90-i':!currentDealer.phone}"
      :txt="'当前没有可选经销商店铺'"
      v-if="empty"
    ></empty>
    <!--  -->
    <div
      class="dealer-scroll-list"
      v-if="dealerList.length"
      :class="{'pt90-i':!currentDealer.phone}"
    >
      <scroll
        class="scroll-dom"
        :data="dealerList"
        :probeType="3"
        :pullup="true"
        @scrollToEnd="loadMore"
      >
        <section>
          <div
            class="dealer-item"
            v-for="item in dealerList"
            :key="item.id"
            @click="_chooseDealer(item)"
          >
            <!-- <div class="pic">
              <img v-lazy="item.logoIamgeUrl || ''" alt>
            </div>-->
            <div class="content">
              <p>{{item.shopName}}</p>
              <p>电话：{{item.phone}}</p>
            </div>
          </div>
        </section>
      </scroll>
    </div>
  </div>
</template>

<script>
/**
 * 首次选择和切换2种状态
 */
import scroll from "components/scroll.vue";
import empty from "components/empty.vue";
import { ListAllDealer } from "api/fetch/home";
import { addShopHistory, changeShop } from "api/fetch/dealer";
import storage from "common/storage";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "dealer-list",
  data() {
    return {
      currentDealer: storage.get("currentDealer", {}),
      dealerList: [],
      empty: false
    };
  },
  components: {
    scroll,
    empty
  },
  created() {
    this.params = {
      pageNum: 1,
      pageSize: 20,
      shopName: ""
    };
    this.currentId = this.$route.query.id || "";
    this._ListCurrentDealer();
    this._ListAllDealer(this.params);
  },
  computed: {
    ...mapGetters(["userInSwitching"])
  },
  methods: {
    ...mapActions(["setUserType"]),
    _ListCurrentDealer() {
      if (!this.currentId) return false;
      const storeDealer = storage.get("currentDealer", {});
      if (storeDealer.id == this.currentId) {
        return (this.currentDealer = storeDealer);
      }
      ListAllDealer({ id: this.currentId }).then(res => {
        const { dataList = [] } = res.data;
        dataList.length && (this.currentDealer = dataList[0]);
      });
    },
    _ListAllDealer(params) {
      this.loading = true;
      ListAllDealer(params)
        .then(res => {
          if (res.data) {
            const { dataList, pager } = res.data;
            const { currentPage, totalPage } = pager;
            if (currentPage === 1) {
              this.dealerList = dataList.filter(
                item => item.id != this.currentId
              );
              this.totalPage = totalPage;
              this.empty = !this.dealerList.length;
            } else {
              this.dealerList = this.dealerList.concat(
                dataList.filter(item => item.id != this.currentId)
              );
            }
            this.params.pageNum++;
            this.loading = false;
          }
        })
        .catch(err => {
          this.loading = false;
        });
    },
    /***
     *todo 经销商切换店铺 变为终端用户，购物车、订单、我的都是用户的界面。
     *  切回自己店铺  变为经销商。
     *  (经销商 && 没有切换 ) || 切换中 可以切换店铺。
     */
    _chooseDealer(dealer) {
      if (this.changing) return false;
      if (
        (this.userType != 3 && !this.userInSwitching) ||
        this.userInSwitching
      ) {
        this.changing = true;
        changeShop(dealer.id)
          .then(res => {
            this.changing = false;
            this.setUserType(res.data || 3);
            storage.set("currentDealerId", dealer.id);
            storage.set("currentDealer", dealer);
            storage.set("homeRefresh", true);
            storage.set("mineRefresh", true);
            storage.set("orderRefresh", true);
            this.$router.push({
              path: "/navi/home"
            });
          })
          .catch(_ => {
            this.changing = false;
          });
        return false;
      }
      if (storage.get("token", "")) {
        addShopHistory(dealer.id).then(res => {});
      }
      storage.set("currentDealerId", dealer.id);
      storage.set("currentDealer", dealer);
      this.$router.push({
        path: "/navi/home"
      });
    },
    _searchKeyChange(searchKey) {
      this.params.pageNum = 1;
      this.params.shopName = searchKey.trim();
      this._ListAllDealer(this.params);
    },
    loadMore() {
      if (this.loading || this.params.pageNum > this.totalPage) return false;
      this._ListAllDealer(this.params);
    }
  }
};
</script>

<style lang="stylus">
.dealer-list {
  pos(relative);
  width: 100%;
  height: 100%;

  .m-header {
    width: 100%;
    pos(absolute);
    top: 0;
    left: 0;
  }
}

.current-dealer {
  pos(absolute);
  top: 90px;
  left: 0;
  width: 100%;

  .title {
    lh(84);
    bg(#fff);
    pl(24);
    ft(26);
    c(#333);
    border-bottom: 1PX solid #F2F2F2;
  }
}

.dealer-scroll-list {
  pt(340);
  height: 100%;

  .scroll-dom {
    height: 100%;
    overflow: hidden;
  }
}

.pt90-i {
  padding-top: 90px;
}

.dealer-item {
  pos(relative);
  width: 100%;
  h(148);
  bg(#fff);

  &:nth-last-of-type(1) {
    .content {
      border: 0;
    }
  }

  .checked {
    block();
    squ(40);
    pos(absolute);
    top: 54px;
    right: 24px;
    background: url('../../assets/images/icon-duigou.png') no-repeat center;
    background-size: cover;
  }

  .pic {
    flt();
    squ(148);

    img {
      block();
      squ(100);
      radius(5);
      b1(#ededed);
      margin: 24px auto 0;
    }
  }

  .content {
    ml(48);
    h(148);
    border-bottom: 1PX solid #F2F2F2;

    p {
      &:nth-of-type(1) {
        pt(31);
        c(#333);
        ft(30);
        fb();
        lh(42);
      }

      &:nth-of-type(2) {
        mt(8);
        c(#666);
        ft(26);
        lh(36);
      }
    }
  }
}
</style>

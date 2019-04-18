<template>
  <div class="dealer-list">
    <search-bar></search-bar>
    <div class="current-dealer">
      <div class="title">当前商贸公司</div>
      <div class="dealer-item">
        <div class="pic">
          <img v-lazy="currentDealer.logoIamgeUrl" alt>
        </div>
        <div class="content" style="border: 0;">
          <p>{{currentDealer.shopName}}</p>
          <p>电话：{{currentDealer.phone}}</p>
        </div>
        <span class="checked"></span>
      </div>
    </div>
    <!--  -->
    <empty class="scroll-list" :txt="'当前没有可选经销商店铺'" v-if="empty"></empty>
    <!--  -->
    <div class="scroll-list">
      <scroll class="scroll-dom">
        <section>
          <div
            class="dealer-item"
            v-for="item in dealerList"
            :key="item.id"
            @click="_chooseDealer(item)"
          >
            <div class="pic">
              <img v-lazy="item.logoIamgeUrl" alt>
            </div>
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
import searchBar from "components/searchBar.vue";
import scroll from "components/scroll.vue";
import empty from "components/empty.vue";
import { ListAllDealer } from "api/fetch/home";
import storage from "common/storage";
export default {
  name: "dealer-list",
  data() {
    return {
      currentDealer: {},
      dealerList: [],
      empty: false
    };
  },
  components: {
    searchBar,
    scroll,
    empty
  },
  created() {
    this.currentId = this.$route.params.id || "";
    this._ListAllDealer();
  },
  methods: {
    _ListAllDealer() {
      ListAllDealer().then(res => {
        if (res.data) {
          const { dataList, pager } = res.data;
          this.currentDealer = dataList.find(item => item.id == this.currentId);
          this.dealerList = dataList.filter(item => item.id != this.currentId);
          this.empty = !this.dealerList.length;
        }
      });
    },
    _chooseDealer(dealer) {
      storage.set("currentDealerId", dealer.id);
      storage.set("currentDealer", dealer);
      location.href = location.origin + "/#/navi/home";
      location.reload();
    }
  }
};
</script>

<style lang="stylus" scoped>
.dealer-list {
  width: 100%;
  height: 100%;
  pt(92);
}

.current-dealer {
  width: 100%;
  pos(fixed);
  top: 92;
  left: 0;
  z-index: 100;
}

.scroll-list {
  pt(233 + 20);
  height: 100%;
}

.scroll-dom {
  overflow: hidden;
  height: 100%;
}

.title {
  lh(84);
  bg(#fff);
  pl(24);
  ft(26);
  c(#333);
  border-bottom: 1px solid #F2F2F2;
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
    ml(124);
    h(148);
    border-bottom: 1px solid #F2F2F2;

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

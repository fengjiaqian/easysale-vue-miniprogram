<template>
  <div class="dealer-list">
    <m-header :isSearch="true" placeholder="请输入店铺名称" @emitEvt="_searchKeyChange"></m-header>
    <div class="current-dealer">
      <div class="title">当前商贸公司</div>
      <div class="dealer-item" v-if="currentDealer.phone">
        <div class="pic">
          <img v-lazy="currentDealer.logoIamgeUrl || ''" alt>
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
    <div class="scroll-list" v-if="dealerList.length">
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
            <div class="pic">
              <img v-lazy="item.logoIamgeUrl || ''" alt>
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
/**
 * 首次选择和切换2种状态
 */
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
  methods: {
    _ListCurrentDealer() {
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
    _chooseDealer(dealer) {
      storage.set("currentDealerId", dealer.id);
      storage.set("currentDealer", dealer);
      this.$router.push({
        path: "/navi/home"
      });
    },
    _searchKeyChange(searchKey) {
      this.params.pageNum = 1;
      this._ListAllDealer(searchKey.trim());
    },
    loadMore() {
      if (this.loading || this.params.pageNum > this.totalPage) return false;
      this._ListAllDealer(this.params);
    }
  }
};
</script>

<style lang="stylus" scoped>
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
}

.scroll-list {
  pt(340);
  height: 100%;
}

.scroll-dom {
  height: 100%;
  overflow: hidden;
}

.title {
  lh(84);
  bg(#fff);
  pl(24);
  ft(26);
  c(#333);
  border-bottom: 1PX solid #F2F2F2;
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

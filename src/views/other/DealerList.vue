<template>
  <div class="dealer-list">
    <search-bar></search-bar>
    <div class="current-dealer">
      <div class="title">当前商贸公司</div>
      <div class="dealer-item">
        <div class="pic">
          <img v-lazy="''" alt>
        </div>
        <div class="content" style="border: 0;">
          <p>茅台商贸公司</p>
          <p>电话：13876542333</p>
        </div>
        <span class="checked"></span>
      </div>
    </div>
    <!--  -->
    <div class="scroll-list">
      <scroll class="scroll-dom">
        <section>
          <div class="dealer-item" v-for="i in 10">
            <div class="pic">
              <img v-lazy="''" alt>
            </div>
            <div class="content">
              <p>茅台商贸公司</p>
              <p>电话：13876542333</p>
            </div>
            <span class="checked"></span>
          </div>
        </section>
      </scroll>
    </div>
  </div>
</template>

<script>
import searchBar from "components/searchBar.vue";
import scroll from "components/scroll.vue";
export default {
  name: "dealer-list",
  data() {
    return {};
  },
  components: {
    searchBar,
    scroll
  },
  methods: {}
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
    bg($color-theme);
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

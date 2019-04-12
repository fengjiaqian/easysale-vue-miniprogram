<template>
  <div id="mine">
    <div class="user-info">
      <div class="user-avart">
        <img v-lazy alt>
      </div>
      <div class="user-tel">
        <h5>销售员-小黑</h5>
        <p>电话：13627762233</p>
      </div>
    </div>
    <!--  -->
    <div class="enter-list">
      <div class="enter-item" v-for="i in 4">
        <div class="enter-item-img">
          <img src="../assets/images/icon-order-handler.png" alt>
        </div>
        <div class="enter-item-txt">
          <span>业绩报表</span>
          <em></em>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped>
.enter-list {
  mt(20);
}

.enter-item {
  bg(#fff);

  &:nth-last-of-type(1), &:nth-last-of-type(2) {
    .enter-item-txt {
      border: 0;
    }
  }

  &:nth-last-of-type(1) {
    mt(20);
  }

  .enter-item-img {
    block();
    flt();
    w(104);
    h(90);

    img {
      block();
      squ(56);
      margin: 17px auto 0;
    }
  }

  .enter-item-txt {
    h(90);
    ml(104);
    c(#333);
    ft(30);
    flex-center();
    justify-content: space-between;
    border-bottom: 1px solid #ededed;

    em {
      block();
      w(16);
      h(26);
      mr(24);
      background: url('./../assets/images/icon-enter.png') no-repeat center;
      background-size: contain;
    }
  }
}

// icon-order-handler
.user-info {
  pl(24);
  bg(#fff);
  padding: 32px 0;
}

.user-avart {
  squ(120);
  flt();
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
  }
}

.user-tel {
  ml(120 + 24);

  h5 {
    ft(33);
    c(#333);
    lh(46);
  }

  p {
    mt(8);
    lh(36);
    ft(26);
    c(#888);
  }
}
</style>


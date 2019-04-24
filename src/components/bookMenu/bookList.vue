<template>
  <div class="list" ref="wrapper">
    <!-- 员工列表 -->
    <section v-if="bookMenuType == 1">
      <div
        class="area"
        v-for="(item,key) in bookMenu"
        :key="key"
        :ref="key"
        v-show="bookMenu[key].length"
      >
        <div class="title border-topbottom">{{key}}</div>
        <div class="item-list" @click="skipTo(list)" v-for="list in bookMenu[key]" :key="list.id">
          <div class="il-l">
            <img v-lazy="''">
          </div>
          <div class="il-r">
            <h5>{{list.name}}</h5>
            <span>{{list.phone}}</span>
          </div>
        </div>
      </div>
    </section>
    <!-- 客户列表 -->
    <section v-if="bookMenuType == 2">
      <div
        class="area"
        v-for="(item,key) in bookMenu"
        :key="key"
        :ref="key"
        v-show="bookMenu[key].length"
      >
        <div class="title border-topbottom">{{key}}</div>
        <div
          class="ct-item-list"
          @click="skipTo(list)"
          v-for="list in bookMenu[key]"
          :key="list.id"
        >
          <div class="ct-l-s">
            <span>{{list.name}}</span>
            <span>{{list.phone}}</span>
          </div>
          <div>{{list.customerShopName}}</div>
          <div>{{list.address}}</div>
        </div>
      </div>
    </section>
    <!-- 弹出层 -->
    <transition name="fade">
      <div class="toast" v-show="showToast">
        <span class="letter">{{this.letter}}</span>
      </div>
    </transition>
  </div>
</template>
<script>
import Bscroll from "better-scroll";
import bus from "common/Bus";
import storage from "common/storage";
export default {
  name: "bookList",
  props: {
    bookMenu: Object,
    bookMenuType: Number
  },
  data() {
    return {
      letter: "",
      showToast: false
    };
  },
  watch: {
    letter() {
      if (this.letter) {
        const elment = this.$refs[this.letter][0];
        this.scroll.scrollToElement(elment);
        this.changeToast();
      }
    }
  },
  methods: {
    changeToast() {
      this.showToast = true;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.showToast = false;
      }, 500);
    },
    skipTo(item) {
      if (this.bookMenuType == 1) {
        this.$router.push({
          path: "/my/staffDetail",
          query: { userId: item.userId }
        });
      } else if (this.bookMenuType == 2) {
        //如果是从订单界面过来的  返回订单 带入信息
        const fromOrder = storage.get("fromOrder", false);
        if (fromOrder) {
          const customerInfo = this.encodeUrl(item);
          return this.$router.push({
            path: "/orderSubmit",
            query: {
              customerInfo
            }
          });
        }
        this.$router.push({
          path: "/my/customerDetail",
          query: { id: item.id }
        });
      }
    }
  },
  mounted() {
    bus.$on("change", letter => {
      this.letter = letter;
    });
    this.scroll = new Bscroll(this.$refs.wrapper, {
      click: true
    });
  }
};
</script>
<style lang="stylus" scoped>
.list {
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .title {
    line-height: 78px;
    background: #eee;
    pl(32);
  }

  .button-list {
    padding: 5px 30px 5px 5px;
    overflow: hidden;

    .button-wrapper {
      float: left;
      width: 25%;

      .button {
        margin: 5px;
        padding: 5px;
        font-size: 12px;
        border: 1PX solid #ccc;
        border-radius: 3px;
        text-align: center;
      }
    }
  }

  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    width: 50px;
    height: 50px;
    background: #ed4e5e;
    border-radius: 50%;
    text-align: center;
    transition: all 0.5s;

    &.fade-enter {
      opacity: 0;
    }

    &.fade-leave, &.fade-enter-active {
      opacity: 1;
    }

    &.fade-leave-active {
      opacity: 0;
    }

    .letter {
      line-height: 50px;
      font-size: 16px;
      font-weight: 700;
      color: #eee;
    }
  }
}

.item-list {
  padding: 16px 24px;
  flex-center();

  .il-l {
    w(100);
    h(100);
    mr(24);

    img {
      w(100);
      h(100);
      border-radius: 10px;
    }
  }

  .il-r {
    flex-1();

    h5 {
      ft(30);
      c-3();
      mb(8);
    }

    span {
      ft(26);
      c-9();
    }
  }
}

.ct-item-list {
  padding: 24px;
  bg(#fff);
  border-bottom: 1PX solid #EDEDED;
  ft(28);
  c-6();

  .ct-l-s {
    ft(32);
    c-3();

    span {
      mr(40);
    }
  }

  div:nth-of-type(2) {
    mt(16);
    mb(8);
  }

  &:last-child {
    border-bottom: none;
  }
}
</style>



<template>
  <div class="search-bar-wrap">
    <div class="search-bar">
      <span class="s-b-l"></span>
      <input
        ref="inputDom"
        type="search"
        :value="searchKey"
        @click="_searchBarJump"
        placeholder="茅台 五粮液"
        @change="handleChange($event)"
      >
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "search-bar",
  data() {
    return {
      searchKey: ""
    };
  },
  props: {
    emit: {
      //是否发射事件
      type: Boolean,
      default: false
    },
    jump: {
      //是否点击跳转 首页
      type: Boolean,
      default: false
    }
  },
  mounted() {},
  methods: {
    _searchBarJump() {
      if (this.jump) {
        this.$router.push({
          path: "/search"
        });
      }
    },
    handleChange($event) {
      if (this.emit) {
        this.searchKey = $event.target.value;
        this.$emit("emitEvt", this.searchKey);
      }
    }
  }
};
</script>

<style lang="stylus">
.search-bar-wrap {
  height: 92px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 900;
  background: #fff;
  padding: 14px 24px;
  display: flex;
  align-items: center;

  .search-bar {
    flex-1();
    height: 100%;
    display: flex;
    align-items: center;
    border: 1PX solid #ededed;
    border-radius: 8px;
    background: #f2f2f2;

    .s-b-l {
      display: inline-block;
      squ(33);
      margin: 0 16px;
      background: url('../assets/images/ic_sousuo@2x.png') no-repeat center;
      background-size: contain;
    }

    input {
      flex-1();
      border: 0;
      height: 56px;
      line-height: 56px;
      font-size: 26px;
      color: #333;
      background: #f2f2f2;
    }
  }
}
</style>
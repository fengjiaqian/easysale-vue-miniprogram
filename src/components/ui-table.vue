<template>
  <ul class="O-tab clearfix">
    <li v-for="item in orderTab" :key="item.state">
      <a
        href="javascript:;"
        :class="{'active': item.state == initialState }"
        @click.stop="_switchOrderType(item.state)"
      >{{item.text}}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ui-table",
  data() {
    return {};
  },
  props: {
    orderTab: {
      type: Array,
      default: () => [] //{text,state}[]
    },
    initialState: [String, Number]
  },
  created() {},
  mounted() {},
  methods: {
    _switchOrderType(state) {
      this.$emit("swithTab", state);
    }
  }
};
</script>

<style lang='stylus'>
.O-tab {
  width: 100%;
  h(80);
  bg(#fff);
  pos(absolute);
  top: 0;
  left: 0;

  li {
    width: 25%;
    flt();
    text-c();

    a {
      inline();
      lh(80);
      padding: 0 28px;
      ft(30);
      c(#333);

      &.active {
        c($color-theme);
        border-bottom: 2PX solid $color-theme;
      }
    }
  }
}
</style>
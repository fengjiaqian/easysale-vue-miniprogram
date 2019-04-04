<template>
  <div class="number-picker">
    <span class="decrease"></span>
    <input type="number" value="1">
    <span class="increase"></span>
  </div>
</template>

<script>
export default {
  name: "number-picker",
  data() {
    return {};
  },
  props: [],
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="stylus">
.number-picker {
  span {
    inline();
    squ(40);
    vm();
  }

  .decrease {
    background: url('../assets/images/icon-decrease.png') no-repeat center;
    background-size: contain;
  }

  .increase {
    background: url('../assets/images/icon-increase.png') no-repeat center;
    background-size: contain;
  }

  input {
    h(40);
    w(72);
    vm();
    border: 0;
    c(#333333);
    ft(30);
    text-c();
  }
}
</style>

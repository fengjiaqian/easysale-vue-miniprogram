<template>
  <section class="exhibit-record-wrap">
    <ul class="record-list">
      <li v-for="i in 5">
        <img v-lazy="''" >
        <div class="info">
          <h5>2019-03，第1期</h5>
          <p>上传时间：2019-03-23 09:23</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    components: {

    },
    created() {

    },
    mounted() {},
    methods: {

    }
  };
</script>

<style lang="stylus" scoped>
  @import "./stylus/exhibit.styl"
</style>


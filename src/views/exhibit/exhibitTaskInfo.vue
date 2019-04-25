<template>
  <section class="exhibit-task-info">
    <ul class="et-content">
      <li>
        <h5>陈列商品</h5>
        <div class="product">
          <img v-lazy="''" >
          <p>洋河蓝色经典 梦之蓝M6 52度</p>
        </div>
      </li>
      <li>
        <h5>陈列要求</h5>
        <div class="require">
          <p>自申请当月开始，每月需上传陈列招聘，陈列周期1年，共12期；</p>
          <p class="reward">陈列周期满后，奖励茅台1瓶。</p>
        </div>
      </li>
      <li>
        <h5>陈列周期</h5>
        <p class="t-content">100天</p>
      </li>
      <li>
        <h5>上传周期</h5>
        <p class="t-content">5天上传一次陈列照片</p>
      </li>
      <li>
        <h5>奖励</h5>
        <p class="t-content">完成陈列任务，可得茅台一瓶</p>
      </li>
      <li>
        <h5>容申请截止日期</h5>
        <p class="t-content">2019-03-22</p>
      </li>
    </ul>
    <div class="et-footer">
      <span>删除</span>
      <span class="edit">编辑</span>
    </div>
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


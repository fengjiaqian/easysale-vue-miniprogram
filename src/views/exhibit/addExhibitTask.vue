<template>
  <section class="add-exhibit-task">
    <ul class="et-content">
      <li>
        <h5>陈列商品</h5>
        <div class="add-product" v-if="!alreadyAdd">+ 添加陈列商品</div>
        <div class="product" v-if="alreadyAdd">
          <img v-lazy="''" >
          <p>洋河蓝色经典 梦之蓝M6 52度</p>
        </div>
      </li>
      <li class="cycle">
        <div class="cycle-column">
          <span class="title">陈列周期</span>
          <input type="number" placeholder="请选择天数">
          <span>天</span>
        </div>
        <div class="cycle-column">
          <span class="title">上传周期</span>
          <input type="number" placeholder="请选择天数">
          <span>天</span>
        </div>
      </li>
      <li class="apply-date">
        <span class="title">申请截止日期</span>
        <el-date-picker
                class="date-pick-wrap"
                v-model="hireDate"
                type="date"
                clearable="false"
                placeholder="请选择雇佣日期">
        </el-date-picker>
        <i class="extension"></i>
      </li>
      <li>
        <h5>要求</h5>
        <textarea cols="30" rows="6" placeholder="请输入要求"></textarea>
      </li>
      <li>
        <h5>奖励</h5>
        <textarea cols="30" rows="6" placeholder="请填写奖励信息"></textarea>
      </li>
    </ul>
    <div class="et-footer achieve">
      <span>发布</span>
    </div>
  </section>
</template>

<script>
  import { AddExhibitActivity } from "api/fetch/exhibit";
  export default {
    data() {
      return {
        alreadyAdd: false,//已经添加了陈列产品
        hireDate: '',
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


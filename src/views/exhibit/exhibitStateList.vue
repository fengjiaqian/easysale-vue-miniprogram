<template>
  <div class="exhibit-state-wrap">
    <section class="top-bar">
      <span v-for="(item,index) in stateList" :class="{'active': activeIdx == index}" @click="switchBar(index)">{{item.title}}</span>
    </section>

    <section class="exhibit-state-content">
      <!--陈列状态-->
      <!--待审核-->
      <ul>
        <li class="state-audit">
          <div class="sa-t">
            <i class="select"></i>
            <div class="st-content">
              <div class="stc-t">
                <span class="shop-name">小丽的店铺</span>
                <span>2019-03-23 20:43</span>
              </div>
              <div class="stc-b">
                <span class="task">小李的店铺申请该商品的陈列任务。</span>
                <span>店铺地址：湖北省洪山区软件新城A3栋-401</span>
              </div>
            </div>
          </div>
          <div class="sa-b">
            <span>查看详情</span>
          </div>
          <div class="state-tag">待审核</div>
        </li>
      </ul>
      <!--执行中-->
      <ul>
        <li class="state-audit">
          <div class="sa-t">
            <div class="st-content">
              <div class="stc-t">
                <span class="shop-name">小丽的店铺</span>
                <span>2019-03-23 20:43</span>
              </div>
              <div class="stc-b">
                <span class="task">执行时间：2019-03-23至2019-06-23</span>
                <span>陈列周期为100天，共20期，已上传5期。</span>
                <span class="warn-tips">该客户目前有2期未上传。</span>
                <!--期数信息-->
                <span class="nper">
                  <i v-for="i in 10">第一期</i>
                </span>
              </div>
            </div>
          </div>
          <div class="sa-b">
            <span>查看详情</span>
          </div>
          <div class="state-tag">待审核</div>
        </li>
      </ul>
      <!--已到期-->
      <ul>
        <li class="state-audit">
          <div class="sa-t">
            <div class="st-content">
              <div class="stc-t">
                <span class="shop-name">小丽的店铺</span>
                <span>2019-03-23 20:43</span>
              </div>
              <div class="stc-b">
                <span class="task">执行时间：2019-03-23至2019-06-23</span>
                <span>此客户未在规定时间完成陈列任务，共有15期陈列照片未 上传。</span>
              </div>
            </div>
          </div>
          <div class="sa-b">
            <span>查看详情</span>
            <span class="red">发放奖励</span>
          </div>
          <div class="state-tag">待审核</div>
        </li>
      </ul>
      <!--已完成-->
      <ul>
        <li class="state-audit">
          <div class="sa-t">
            <div class="st-content">
              <div class="stc-t">
                <span class="shop-name">小丽的店铺</span>
                <span>2019-03-23 20:43</span>
              </div>
              <div class="stc-b">
                <span class="task">执行时间：2019-03-23至2019-06-23</span>
                <span>此客户未在规定时间完成陈列任务，共有15期陈列照片未 上传。</span>
              </div>
            </div>
          </div>
          <div class="sa-b">
            <span>查看详情</span>
          </div>
          <div class="state-tag">待审核</div>
        </li>
      </ul>
    </section>

    <section class="footer">
      <div class="oprate">
        <div class="all-select">
          <i class="select"></i>
          <span>全选</span>
        </div>
        <div class="agree">同意</div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIdx: 0,//选中的状态
        stateList: [{
          title: `待审核`,
          idx: 0
        },{
          title: `执行中`,
          idx: 1
        },{
          title: `已到期`,
          idx: 2
        },{
          title: `已完成`,
          idx: 3
        }],//陈列情况状态
      };
    },
    components: {

    },
    created() {

    },
    mounted() {},
    methods: {
      switchBar(idx){
        this.activeIdx = idx
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import "./stylus/exhibit.styl"
</style>


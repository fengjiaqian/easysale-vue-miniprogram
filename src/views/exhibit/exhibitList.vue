<template>
  <section>
    <scroll
            class="product-list-scroll"
            :data="exhibitList"
            :probeType="3"
            :pullup="true"
            @scrollToEnd="loadMoreData"
            ref="productScrollDom">
      <ul class="exhibit-list">
        <li>
          <div class="el-t">
            <div class="title">
              <h5>茅台放在首位</h5>
              <span>2019-03-23 20:43</span>
            </div>
            <div class="tag">2019-03-23截止</div>
          </div>
          <div class="el-m">
            <p>陈列周期100天，共20期，每期需上传陈列照片，满20期 后，奖励茅台1瓶。</p>
            <div class="apply-info">共有8位客户申请了此陈列任务</div>
          </div>
          <div class="el-b">
            <span>任务详情</span>
            <span>陈列情况<i>8</i></span>
          </div>
        </li>
        <li>
          <div class="el-t">
            <div class="title">
              <h5>茅台放在首位</h5>
              <span>2019-03-23 20:43</span>
            </div>
            <div class="tag end">陈列已完成</div>
          </div>
          <div class="el-m">
            <p>陈列周期100天，共20期，每期需上传陈列照片，满20期 后，奖励茅台1瓶。</p>
          </div>
          <div class="el-b">
            <span>删除</span>
          </div>
        </li>
      </ul>
    </scroll>
    <div class="exhibit-footer" @click="addExhibit">新建陈列</div>
  </section>
</template>

<script>
  import { queryDisplayList } from "api/fetch/exhibit";
  import scroll from "components/scroll.vue";
  export default {
    data() {
      return {
        exhibitList: [],//陈列列表数据
        domShow: false,
        loading: false,
        requestDone: false,
        isEmpty: false,
        filterParam:{
          pageNum: 1,
          pageSize: 10
        },
        totalPage: 0,//总页数
      };
    },
    components: {
      scroll
    },
    created() {
      this.queryExhibitList()
    },
    mounted() {},
    methods: {
      queryExhibitList(){
        this.loading = true
        this.requestDone = false
        queryDisplayList(this.filterParam).then(res => {
          if (res.result === "success" && res.data) {
            this.domShow = true
            const { dataList = [], pager } = res.data;
            const { currentPage, totalPage } = pager;
            if(currentPage==1){
              this.totalPage = totalPage
            }
            this.exhibitList = this.exhibitList.concat(dataList)
            this.loading = false
            this.requestDone = true
          }
        }).catch(err => {
          this.loading = false
          this.requestDone = true
        })
      },
      loadMoreData() {
        if (this.loading || this.filterParam.pageNum >= this.totalPage) return false;
        this.filterParam.pageNum += 1
      },
      //新建陈列任务
      addExhibit(){
        this.$router.push({ path: "/addExhibitTask" });
      },
    },
    watch: {
      filterParam: {
        handler(newVal, oldVal) {
          this.queryExhibitList()
        },
        deep: true
      },
      exhibitList(val) {
        if (this.requestDone) {
          if(!val.length){
            this.isEmpty = true
          }else{
            this.isEmpty = false
          }
        }
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import "./stylus/exhibit.styl"
</style>


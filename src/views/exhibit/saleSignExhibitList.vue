<template>
  <section class="exhibit-record-wrap pt90">
    <m-header :isFixed="true"></m-header>
    <div v-if="domShow">
      <scroll
              class="exhibit-state-scroll"
              :data="performList"
              :probeType="3"
              :pullup="true"
              @scrollToEnd="loadMoreData"
              ref="productScrollDom">
        <perform-column
                v-for="exhibit in performList"
                :key="exhibit.id"
                :exhibit="exhibit"
                class="perform-column">
          <i></i>
        </perform-column>
      </scroll>
    </div>
    <!--空页面友好提示-->
    <section class="empty-exhibit" v-if="isEmpty">
      <i></i>
      <span>暂无陈列执行数据~</span>
    </section>
  </section>
</template>

<script>
  import { querySaleSignList } from "api/fetch/exhibit";
  import performColumn from "components/exhibit/perform-column.vue";
  import scroll from "components/scroll.vue";
  export default {
    data() {
      return {
        domShow: false,
        loading: false,
        requestDone: false,
        totalPage: 0,//总页数
        filterParam: {
          pageNum: 1,
          pageSize: 10
        },
        performList: [],//执行情况列表
        isEmpty: false,
      };
    },
    components: {
      performColumn,
      scroll
    },
    created() {
      this.quertList()
    },
    mounted() {},
    methods: {
      quertList(){
        querySaleSignList(this.filterParam).then(res => {
          if (res.result === "success") {
            this.domShow = true
            const { dataList = [], pager } = res.data;
            const { currentPage, totalPage } = pager;
            if(currentPage==1){
              this.totalPage = totalPage
            }
            this.performList = this.performList.concat(dataList)
            this.loading = false
            this.requestDone = true
          }
        }).catch(err => {
          this.loading = false
          this.requestDone = true
          this.$toast(err.message)
        })
      },
      loadMoreData() {
        if (this.loading || this.filterParam.pageNum >= this.totalPage) return false;
        this.filterParam.pageNum += 1
      },
    },
    watch: {
      filterParam: {
        handler(newVal, oldVal) {
          this.queryPerforms()
        },
        deep: true
      },
      performList(val) {
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


<template>
  <div class="exhibit-state-wrap">
    <m-header :isFixed="true"></m-header>
    <section class="top-bar">
      <span v-for="(item,index) in stateList" :class="{'active': activeIdx == index}" @click="switchBar(index)">{{item.title}}</span>
    </section>

    <section class="exhibit-state-content">

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
        ></perform-column>
      </scroll>
    </section>

    <section class="footer" v-if="activeIdx==0">
      <div class="oprate">
        <div class="all-select">
          <i class="select"></i>
          <span>全选</span>
        </div>
        <div class="agree">同意</div>
      </div>
    </section>

    <!--空页面友好提示-->
    <section class="empty-exhibit" v-if="isEmpty">
      <i></i>
      <span>暂无陈列执行数据~</span>
    </section>
  </div>
</template>

<script>
  import { queryPerformList } from "api/fetch/exhibit";
  import performColumn from "components/exhibit/perform-column.vue";
  import scroll from "components/scroll.vue";
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
        domShow: false,
        loading: false,
        requestDone: false,
        totalPage: 0,//总页数
        filterParam: {
          pageNum: 1,
          pageSize: 10,
          display_Id: '',//活动id
          lists_tates: [0],//可选查询状态
        },
        performList: [],//执行情况列表
        isEmpty: false,
      };
    },
    components: {
      scroll,
      performColumn
    },
    created() {
      this.filterParam.display_Id = this.$route.query.id
      //this.queryPerforms()
    },
    mounted() {},
    methods: {
      switchBar(idx){
        if(idx == this.activeIdx) return false
        this.activeIdx = idx
        switch (idx) {
          case 0:
          this.filterParam.lists_tates = [0]
          break;
          case 1:
            this.filterParam.lists_tates = [2]
            break;
          case 2:
            this.filterParam.lists_tates = [3]
            break;
          case 3:
            this.filterParam.lists_tates = [4,5]
            break;
          default:
            break;
        }
        this.filterParam.pageNum = 1
        this.performList = []
      },
      queryPerforms(){
        this.loading = true
        this.requestDone = false
        queryPerformList(this.filterParam).then(res => {
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


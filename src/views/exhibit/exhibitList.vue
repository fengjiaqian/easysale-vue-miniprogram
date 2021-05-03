<template>
  <section class="exhibit-wrap">
    <m-header :isFixed="true"></m-header>
    <div class="exhibit-content">
      <scroll
              class="exhibit-list-scroll"
              :data="exhibitList"
              :probeType="3"
              :pullup="true"
              @scrollToEnd="loadMoreData"
              ref="productScrollDom">
        <div class="exhibit-list">
          <exhibit-column
                  v-for="exhibit in exhibitList"
                  :key="exhibit.id"
                  :exhibit="exhibit"
          ></exhibit-column>
        </div>
      </scroll>
    </div>
    <div class="exhibit-footer" @click="addExhibit">新建陈列</div>
    <empty v-if="isEmpty" txt="暂无陈列数据~" :iconUrl="avatarUrl"></empty>
  </section>
</template>

<script>
  import avatarUrl from "@/assets/images/empty_icon_1.png";
  import exhibitColumn from "components/exhibit/exhibit-column.vue";
  import { queryDisplayList } from "api/fetch/exhibit";
  import scroll from "components/scroll.vue";
  import bus from "common/Bus";
  import empty from "components/empty.vue";
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
        avatarUrl,
      };
    },
    components: {
      scroll,
      exhibitColumn,
      empty
    },
    created() {
      this.queryExhibitList()
    },
    mounted() {
      bus.$off("refreshList")
      bus.$on("refreshList", (data) => {
        this.exhibitList = this.exhibitList.filter((item)=>{
          return item.id != data.id
        })
      });
    },
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


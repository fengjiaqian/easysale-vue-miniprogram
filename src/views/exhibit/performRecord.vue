<template>
  <section class="exhibit-record-wrap pt90">
    <m-header :isFixed="true"></m-header>
    <ul class="record-list">
      <li v-for="(item,idx) in recordList">
        <img v-lazy="item.path" >
        <div class="info">
          <h5>{{item.create_time}}，第{{idx+1}}期</h5>
          <p v-if="item.state==1">上传时间：{{item.update_time}}</p>
          <p class="red" v-else>未上传</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
  import { queryPerformRecordList } from "api/fetch/exhibit";
  export default {
    data() {
      return {
        domShow: false,
        totalPage: 0,
        param: {
          sign_id: '',
          pageNum: 1,
          pageSize: 60,
        },
        recordList: [],
      };
    },
    components: {

    },
    created() {
      this.param.sign_id = this.$route.query.id
      this.quertList()
    },
    mounted() {},
    methods: {
      quertList(){
        queryPerformRecordList(this.param).then(res => {
          if (res.result === "success") {
            const { dataList = [], pager } = res.data;
            const { currentPage, totalPage } = pager;
            if(currentPage==1){
              this.totalPage = totalPage
            }
            dataList.forEach((item)=>{
              item.create_time = item.create_time.substring(0,10)
            })
            this.recordList = this.recordList.concat(dataList)
            this.domShow = true
          }
        }).catch(err => {
          this.$toast(err.message)
        })
      },
    }
  };
</script>

<style lang="stylus" scoped>
  @import "./stylus/exhibit.styl"
</style>


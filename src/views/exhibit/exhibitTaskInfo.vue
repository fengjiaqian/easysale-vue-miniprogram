<template>
  <section class="exhibit-task-info" v-if="domShow">
    <m-header :isFixed="true"></m-header>
    <ul class="et-content">
      <li>
        <h5>陈列商品</h5>
        <div class="product">
          <img v-lazy="exhibitInfo.dealerProductDTO.productImageUrl" >
          <p>{{exhibitInfo.dealerProductDTO.productName}}</p>
        </div>
      </li>
      <li>
        <h5>陈列要求</h5>
        <div class="require">
          <p>{{exhibitInfo.display_rule}}</p>
        </div>
      </li>
      <li>
        <h5>陈列周期</h5>
        <p class="t-content">{{exhibitInfo.display_days}}天</p>
      </li>
      <li>
        <h5>上传周期</h5>
        <p class="t-content">{{exhibitInfo.photo_space_day}}天上传一次陈列照片</p>
      </li>
      <li>
        <h5>奖励</h5>
        <p class="t-content">{{exhibitInfo.display_reward}}</p>
      </li>
      <li>
        <h5>申请截止日期</h5>
        <p class="t-content">{{exhibitInfo.end_time}}</p>
      </li>
    </ul>
    <div class="et-footer">
      <span @click="_deleteExhibit">删除</span>
      <span class="edit" @click="editExhibit">编辑</span>
    </div>
  </section>
</template>

<script>
  import { queryExhibitDetail,deleteExhibit } from "api/fetch/exhibit";
  import storage from 'common/storage'
  export default {
    data() {
      return {
        id: '',//活动id
        exhibitInfo: {},
        domShow: false,
      };
    },
    components: {

    },
    created() {
      this.id = this.$route.query.id
      this.queryDetail()
    },
    mounted() {},
    methods: {
      //查询陈列详情
      queryDetail(){
        queryExhibitDetail(this.id).then(res => {
          if (res.result === "success") {
            this.exhibitInfo = res.data
            this.domShow = true
          }
        }).catch(err => {
          this.$toast(err.message)
        })
      },
      //编辑陈列详情
      editExhibit(){
        storage.set("initExhibitInfo", this.exhibitInfo);
        this.$router.push({path: "/addExhibitTask"});
      },
      //删除陈列
      _deleteExhibit(){
        this.$confirm("确定删除改陈列活动？")
                .then(() => {
                  this.deleteReq()
                })
                .catch(() => {})
      },
      deleteReq(){
        let param = {
          id: this.id
        }
        deleteExhibit(param).then(res => {
          if (res.result === "success") {
            this.$toast(`删除成功！`)
            this.$router.push({ path: "/exhibitList" })
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


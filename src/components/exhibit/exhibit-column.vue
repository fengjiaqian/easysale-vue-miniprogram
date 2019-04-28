<template>
  <div class="exhibit-column">
    <div class="el-t">
      <div class="title">
        <h5>{{exhibit.display_rule}}</h5>
        <span>{{exhibit.create_time}}</span>
      </div>
      <div class="tag">{{exhibit.end_time}}截止</div>
    </div>
    <div class="el-m">
      <p>{{taskPaper}}</p>
      <div class="apply-info" v-if="exhibit.applySignNum">共有{{exhibit.applySignNum}}位客户申请了此陈列任务</div>
    </div>
    <div class="el-b">
      <span @click="goDetail">任务详情</span>
      <span v-if="!exhibit.canDel" @click="goPerform">陈列情况<i>{{exhibit.applySignNum}}</i></span>
      <span v-if="exhibit.canDel" @click="_deleteExhibit">删除</span>
    </div>
  </div>
</template>

<script>
  import bus from "common/Bus";
  import { deleteExhibit } from "api/fetch/exhibit";
  export default {
    props: {
      exhibit: {
        type: Object,
        default: {}
      },
    },
    data() {
      return {
        taskPaper: '',//陈列任务要求及奖励简述
      };
    },
    components: {

    },
    created() {
      const { display_days,total_periods,display_reward } = this.exhibit
      this.taskPaper = `陈列周期${display_days}天，共${total_periods}期，每期需上传陈列照片，满${total_periods}期 后，${display_reward}。`
    },
    mounted() {},
    methods: {
      //去陈列任务详情
      goDetail(){
        this.$router.push({
          path: "/exhibitTaskInfo",
          query: {id: this.exhibit.id,applyNum:this.exhibit.applySignNum}
        });
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
          id: this.exhibit.id
        }
        deleteExhibit(param).then(res => {
          if (res.result === "success") {
            this.$toast(`删除成功！`)
            //刷新列表页
            bus.$emit("refreshList", this.exhibit)
          }
        }).catch(err => {
          this.$toast(err.message)
        })
      },
      //查看陈列情况详情
      goPerform(){
        this.$router.push({
          path: "/exhibitStateList",
          query: {id: this.exhibit.id}
        });
      },
    },
  };
</script>

<style lang="stylus" scoped>
  @import "./exhibit.styl"
</style>


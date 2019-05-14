<template>
  <div class="staff-detail-wrap pt90" v-show="domShow">
    <m-header :isFixed="true"></m-header>
    <ul class="sd-info">
      <li class="header-pic">
        <img v-lazy="staffInfo.logoIamgeUrl || ''">
        <h5>{{staffInfo.name}}</h5>
      </li>
      <li>
        <span>手机号码</span>
        <div>{{staffInfo.phone}}</div>
      </li>
      <li>
        <span>身份证号</span>
        <div>{{staffInfo.cardId}}</div>
      </li>
      <li class="special-li">
        <span>家庭住址</span>
        <div>{{staffInfo.address}}</div>
      </li>
      <li>
        <span>入职日期</span>
        <div>{{staffInfo.hireDateStr}}</div>
      </li>
<!--      <li class="special-li">
        <span>折扣权限</span>
        <div>{{staffInfo.discount || '无'}}</div>
      </li>-->
    </ul>
<!--    <ul class="sd-oprate">
      <li class="sd-c-b">重置账号密码</li>
      <li class="sd-c-b" @click="skipTo">编辑</li>
      <li class="sd-c-o" @click="freeze">删除</li>
    </ul>-->
    <div class="b-oprate" v-if="staffInfo.auditState===0">
      <span @click="audit('2')" class="refuse">审核拒绝</span>
      <span @click="audit('1')">审核同意</span>
    </div>
    <div class="b-oprate" @click="skipTo" v-else>
      <span>编辑</span>
    </div>
  </div>
</template>

<script>
import { queryStaffDetail, deleteStaff, auditStaff } from "api/fetch/mine";
export default {
  data() {
    return {
      userId: "", //员工id
      staffInfo: {}, //员工详细信息
      domShow: false
    };
  },
  components: {},
  computed: {},
  created() {
    localStorage.removeItem("staffInfo");
    this.userId = this.$route.query.userId;
    this._queryStaffDetail();
  },
  methods: {
    _queryStaffDetail() {
      let param = { userId: this.userId };
      queryStaffDetail(param).then(res => {
        if (res.result === "success") {
          this.domShow = true;
          this.staffInfo = res.data;
        }
      });
    },
    skipTo() {
      localStorage.setItem("staffInfo", JSON.stringify(this.staffInfo));
      this.$router.push({
        path: "/my/editStaffInfo"
      });
    },
    freeze() {
      this.$confirm("确定要删除该员工吗？")
        .then(() => {
          let param = {
            id: this.staffInfo.id
          };
          deleteStaff(param).then(res => {
            if (res.result === "success") {
              //删除成功返回员工列表页
              this.$toast("删除成功！");
              this.$router.push({
                path: "/my/staffList"
              });
            }
          });
        })
        .catch(() => {});
    },
    //审核员工
    audit(type){
      let param = {
        id: this.staffInfo.id,
        type
      }
      auditStaff(param).then(res => {
        if (res.result === "success") {
          this.$toast("审核成功！");
          this.$router.push({
            path: "/my/staffList"
          });
        }
      });
    },
  }
};
</script>

<style lang="stylus" scoped>
@import './stylus/staff.styl';
</style>


<template>
  <div class="staff-edit-wrap pt90">
    <m-header :isFixed="true"></m-header>
    <ul class="staff-info-list">
      <li>
        <span>员工姓名：</span>
        <input
          @input="limitName"
          v-model="staffInfo.name"
          maxlength="20"
          type="text"
          placeholder="请输入姓名"
        >
        <!--<i class="close"></i>-->
      </li>
      <li class="special-li">
        <span>联系电话：</span>
        <input v-model="staffInfo.phone" @input="limitPhone" type="number" placeholder="请输入手机号码">
      </li>
      <div class="h20"></div>
      <!--<li>
        <span>身份证号：</span>
        <input v-model="staffInfo.cardId" @input="limitCardId" type="number" placeholder="请输入身份证号">
      </li>
      <li class="special-li">
        <span>家庭地址：</span>
        <div class="locate-address">
          <textarea v-model="staffInfo.address" maxlength="50" cols="30" rows="2" placeholder="请输入员工地址"></textarea>
        </div>
        <i @click="obtainAddress" class="position"></i>
      </li>
      <div class="h20"></div>
      <li>
        <span>入职日期：</span>
        <el-date-picker
                class="date-pick-wrap"
                v-model="staffInfo.hireDate"
                type="date"
                placeholder="请选择入职日期">
        </el-date-picker>
        <i class="extension"></i>
      </li>-->
      <!--      <li>
        <span>角色设置：</span>
        <div @click="rolePopToggle">{{activeRoleName}}</div>
        <i class="extension"></i>
      </li>-->
      <!--      <li class="special-li">
        <span>折扣权限：</span>
        <div><input class="discount-int" v-model="staffInfo.discount" type="number" placeholder="请输入折扣"><span>折</span></div>
      </li>-->
    </ul>
    <div class="set-property">
      <ul class="option-list">
        <li>
          <span>管理员设置开关</span>
          <i @click="switchOption()" :class="{'open':staffInfo.permissionState}"></i>
        </li>
      </ul>
    </div>
    <div
      class="staff-info-btn"
      :class="{'achieve':achieve,'isIphoneX':isIphoneX}"
      @click="verify"
    >保存</div>

    <!--角色设置弹出层-->
    <!--<div class="popup-wrap" v-if="rolePopShow">
      <div class="pw-content">
        <h5 class="header">
          <span>角色设置</span>
          <i @click="rolePopShow=false"></i>
        </h5>
        <ul class="list">
          <li :class="{'active':staffInfo.roleId == item.id}"
              v-for="item in roleList" :key="item.id"
          @click="selectRole(item)">{{item.roleName}}</li>
        </ul>
        <div class="btn" @click="rolePopShow=false">确定</div>
      </div>
      <div class="pop-mask"></div>
    </div>-->
  </div>
</template>

<script>
import { addStaff, queryRole } from "api/fetch/mine";
import { evokeWxLocation } from "common/location";
import { verifyPhone, verifyIdCard } from "common/validate";
export default {
  data() {
    return {
      isIphoneX: this.isIphoneX,
      staffInfo: {
        name: "",
        phone: "",
        cardId: "",
        address: "",
        hireDate: "",
        roleId: "", //选中的员工角色id
        discount: "",
        type: 2, //用户类型（1：经销商 2：员工）
        permissionState:0//是否是管理员
      },
      roleList: {},
      rolePopShow: false,
      activeRoleName: "",
      roleId: "", //角色id
      achieve: false, //能否保存
      canSave: true
    };
  },
  components: {},
  computed: {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let passData = to.query.passData ? to.query.passData : null;
      if (passData) {
        passData = JSON.parse(passData);
        Object.assign(vm.staffInfo, passData.pageData);
        vm.staffInfo.address = passData.addressData.address;
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    next();
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  created() {
    //this._queryRole()
  },
  methods: {
    limitName(e) {
      let value = e.target.value;
      value = value.replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g, "");
      this.staffInfo.name = value;
    },
    limitPhone(e) {
      this.staffInfo.phone = e.target.value.slice(0, 11);
    },
    limitCardId(e) {
      this.staffInfo.cardId = e.target.value.slice(0, 18);
    },
    //验证添加商品所需字段
    verify() {
      if (!this.achieve) return;
      const { name, phone } = this.staffInfo;
      if (!name) {
        this.$alert(`请输入员工姓名！`);
        return;
      } else if (!verifyPhone(phone)) {
        this.$alert(`请输入正确的员工手机号！`);
        return;
      }
      if (this.canSave) {
        this.saveAdd();
      }
    },
    saveAdd() {
      this.canSave = false;
      this.staffInfo.hireDate = new Date(this.staffInfo.hireDate).getTime();
      addStaff(this.staffInfo)
        .then(res => {
          if (res.result === "success") {
            //商品添加成功后回到商品管理列表页
            this.$toast("添加成功！");
            this.canSave = true;
            this.$router.push({ path: "/my/staffList" });
          }
        })
        .catch(err => {
          this.canSave = true;
          this.$toast(err.message);
        });
    },
    //查询所有角色
    _queryRole() {
      queryRole({}).then(res => {
        if (res.result === "success") {
          this.roleList = res.data;
          this.staffInfo.roleId = res.data.length ? res.data[0].id : "";
          this.activeRoleName = res.data.length ? res.data[0].roleName : "";
        }
      });
    },
    //选择角色
    selectRole(item) {
      this.staffInfo.roleId = item.id;
      this.activeRoleName = item.roleName;
      this.rolePopShow = false;
    },
    rolePopToggle() {
      this.rolePopShow = true;
    },
    obtainAddress() {
      let recordData = {
        path: this.$route.path,
        pageData: this.staffInfo
      };
      evokeWxLocation(recordData);
    },

    //切换管理员按钮
    switchOption() {
      if (this.staffInfo.permissionState == 0) {
        this.staffInfo.permissionState = 1;
      } else {
        this.staffInfo.permissionState = 0;
      }
    }
  },
  watch: {
    staffInfo: {
      handler(newVal, oldVal) {
        const { name, phone } = newVal;
        if (name && phone) {
          this.achieve = true;
        } else {
          this.achieve = false;
        }
      },
      deep: true
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './stylus/staff.styl';
</style>


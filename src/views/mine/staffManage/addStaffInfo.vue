<template>
  <div class="staff-edit-wrap">
    <ul class="staff-info-list">
      <li>
        <span>员工姓名：</span>
        <input v-model="staffInfo.name" maxlength="20" type="text" placeholder="请输入姓名">
        <i class="close"></i>
      </li>
      <li class="special-li">
        <span>联系电话：</span>
        <input v-model="staffInfo.phone" maxlength="11" minlength="11" type="tel" placeholder="请输入手机号码">
      </li>
      <div class="h20"></div>
      <li>
        <span>身份证号：</span>
        <input v-model="staffInfo.cardId" maxlength="18" type="tel" placeholder="请输入身份证号">
      </li>
      <li class="special-li">
        <span>详细地址：</span>
        <div>{{staffInfo.address}}</div>
        <i class="position"></i>
      </li>
      <div class="h20"></div>
      <li>
        <span>雇佣日期：</span>
        <input v-model="staffInfo.hireDate" type="date" placeholder="请输入身份证号">
        <i class="extension"></i>
      </li>
      <li>
        <span>角色设置：</span>
        <div @click="rolePopToggle">{{activeRoleName}}</div>
        <i class="extension"></i>
      </li>
      <li class="special-li">
        <span>折扣权限：</span>
        <div><input class="discount-int" v-model="staffInfo.discount" type="number" placeholder="请输入折扣"><span>折</span></div>
      </li>
    </ul>
    <div class="staff-info-btn" @click="verify">保存</div>

    <!--角色设置弹出层-->
    <div class="popup-wrap" v-if="rolePopShow">
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
    </div>
  </div>
</template>

<script>
  import { addStaff,queryRole } from "api/fetch/mine";
  export default {
    data() {
      return {
        staffInfo: {
          name: '',
          phone: '',
          cardId: '',
          address: '测试地址',
          hireDate: '',
          roleId: '',//选中的员工角色id
          discount: '',
          parentId: '19990530',//父id（对应所属经销商id）
          type: 2,//用户类型（1：经销商 2：员工）
        },
        roleList:{},
        rolePopShow: false,
        activeRoleName: '',
        roleId: '',//角色id
      };
    },
    components: {

    },
    computed: {

    },
    created(){
      this._queryRole()
    },
    methods: {
      //验证添加商品所需字段
      verify(){
        const { name,phone,address,hireDate,cardId } = this.staffInfo
        if(!name){
          this.$alert(`请输入员工姓名！`)
          return
        }else if(!phone){
          this.$alert(`请输入员工手机号！`)
          return
        }else if(!cardId){
          this.$alert(`请输入员工身份证号！`)
          return
        }else if(!hireDate){
          this.$alert(`请选择雇佣日期！`)
          return
        }
        this.saveAdd()
      },
      saveAdd(){
        addStaff(this.staffInfo).then(res => {
          if (res.result === "success") {
            //商品添加成功后回到商品管理列表页
            this.$toast("添加成功！");
            this.$router.push({ path: "/my/staffList" });
          }
        });
      },
      //查询所有角色
      _queryRole(){
        let param = {
          roleId: '5057183016061585359'
        }
        queryRole(param).then(res => {
          if (res.result === "success") {
            this.roleList = res.data
            this.staffInfo.roleId = res.data[0].id
            this.activeRoleName = res.data[0].roleName
          }
        });
      },
      //选择角色
      selectRole(item){
        this.staffInfo.roleId = item.id
        this.activeRoleName = item.roleName
        this.rolePopShow = false
      },
      rolePopToggle(){
        this.rolePopShow = true
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import "./stylus/staff.styl"
</style>


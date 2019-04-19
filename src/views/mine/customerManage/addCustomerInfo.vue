<template>
  <div class="staff-edit-wrap">
    <ul class="staff-info-list">
      <li>
        <span>客户姓名：</span>
        <input v-model="customerInfo.name" maxlength="20" type="text" placeholder="请输入姓名">
        <!--<i class="close"></i>-->
      </li>
      <li class="special-li">
        <span>联系电话：</span>
        <input v-model="customerInfo.phone" @input="limitPhone" type="number" placeholder="请输入手机号码">
      </li>
      <div class="h20"></div>
      <li>
        <span>店铺名称：</span>
        <input v-model="customerInfo.customerShopName" maxlength="30" type="text" placeholder="请输入店铺名称">
      </li>
      <li class="special-li">
        <span>详细地址：</span>
        <div @click="obtainAddress">{{customerInfo.address}}</div>
        <i class="position"></i>
      </li>
      <div class="h20"></div>
      <li class="special-li">
        <span>销售负责人：</span>
        <div @click="rolePopToggle">{{activeName}}</div>
        <i class="extension"></i>
      </li>
    </ul>
    <div class="staff-info-btn" :class="{'':achieve}" @click="verify">保存</div>
    <!--角色设置弹出层-->
    <div class="popup-wrap" v-if="rolePopShow">
      <div class="pw-content">
        <h5 class="header">
          <span>选择销售负责人</span>
          <i @click="rolePopShow=false"></i>
        </h5>
        <ul class="list">
          <li :class="{'active':activeIdx == index}"
              v-for="(item,index) in saleList" :key="item.id"
              @click="selectItem(item,index)">{{item.name}}</li>
        </ul>
        <div class="btn" @click="confirmSale">确定</div>
      </div>
      <div class="pop-mask"></div>
    </div>
  </div>
</template>

<script>
  import { addCustomer,queryStaffList } from "api/fetch/mine";
  import { verifyPhone,checkChinese } from "common/validate";
  import { evokeWxLocation } from "common/location";
  export default {
    data() {
      return {
        customerInfo: {
          name: '',
          phone: '',
          customerShopName: '',
          address: '地址',
          salesPersonUserId: '',
          label:''
        },
        saleList: [],//销售人员列表
        rolePopShow: false,
        filterParam: {
          parentId: 19990530,
          keyword: ''
        },
        activeIdx: null,
        activeName: '',
        achieve: false,
      };
    },
    components: {

    },
    computed: {

    },
    beforeRouteEnter (to, from, next) {
      next(vm=>{
          let passData = to.query.passData ? to.query.passData : null
          if(passData){
              passData = JSON.parse(passData)
              Object.assign(vm.customerInfo,passData.pageData)
              vm.customerInfo.address = passData.addressData.address
          }
      })
    },
    created(){
      this.queryStaffs()
    },
    methods: {
        limitPhone(e){
            this.customerInfo.phone = e.target.value.slice(0,11);
        },
      //查询员工列表
      queryStaffs(){
        queryStaffList(this.filterParam).then(res => {
          if (res.result === "success") {
            this.saleList = res.data || []
          }
        });
      },
      selectItem(item,idx){
        this.activeIdx = idx
      },
      confirmSale(){
        let activeItem = this.saleList[this.activeIdx]
        this.activeName = activeItem.name
        this.customerInfo.salesPersonUserId = activeItem.userId
        this.rolePopShow = false
      },
      rolePopToggle(){
        this.rolePopShow = true
      },
      //验证添加商品所需字段
      verify(){
        if(!this.achieve) return;
        const { name,phone,customerShopName,address,salesPersonUserId } = this.customerInfo
        if(!checkChinese(name)){
          this.$alert(`请输正确的客户姓名，需包含中文！`)
          return
        }else if(!verifyPhone(phone)){
          this.$alert(`请输入正确的客户手机号！`)
          return
        }else if(!customerShopName){
          this.$alert(`请输入客户的店铺名称！`)
          return
        }else if(!address){
          this.$alert(`请输入客户的店铺地址！`)
          return
        }else if(!salesPersonUserId){
          this.$alert(`请选择客户的销售负责人！`)
          return
        }
        this.saveAdd()
      },
      saveAdd(){
        addCustomer(this.customerInfo).then(res => {
          if (res.result === "success") {
            this.$toast("添加成功！");
            this.$router.push({ path: "/my/customerList" });
          }
        });
      },
        //去定位地址
        obtainAddress(){
            let recordData = {
                path: this.$route.path,
                pageData: this.customerInfo
            }
            evokeWxLocation(recordData)
        },
    },
    watch: {
        customerInfo: {
          handler(newVal, oldVal) {
              const { name,phone,customerShopName,address,salesPersonUserId } = newVal
              if(name && phone && customerShopName && address && salesPersonUserId){
                    this.achieve = true
              }
          },
          deep: true
      },
    }
  };
</script>

<style lang="stylus" scoped>
  @import "./stylus/customer.styl"
</style>


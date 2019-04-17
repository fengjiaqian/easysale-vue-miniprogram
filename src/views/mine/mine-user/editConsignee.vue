<template>
  <div class="common">
    <!-- wx  编辑收货人的页面  editConsignee -->
    <div class="name">
      <div class="left">姓名 :</div>
      <input class="right" v-model="editName" value="张栋" type="text">
    </div>
    <div class="judgeinfo" v-if="judgeName">姓名不可以为空</div>
    <div class="tele">
      <div class="left">联系电话 :</div>
      <input class="right" v-model="editPhone" value="13555555555" type="text">
    </div>
     <div class="judgeinfo" v-if="judgePhone">请填入正确的联系电话</div>
    <div class="shopname">
      <div class="left">店铺名称 :</div>
      <input class="right" v-model="editShop" value="老王的店铺" type="text">
    </div>
     <div class="judgeinfo" v-if="judgeShop">店铺名字不能为空</div>
    <div class="address">
      <div class="left">收货地址 :</div>
      <textarea rows="2" cols="20" v-model="editArea" class="right">湖北省 武汉市 洪山区 花城大道软件新城A3-401</textarea>
    </div>
    <div class="judgeinfo" v-if="judgeaddArea">收货地址不可以为空</div>
    <div class="edit" @click="keepData()">保存</div>
  </div>
</template>

<script>
import { modifyConsignee } from "api/fetch/endCustomer";
import bus from 'common/Bus'    //这是自定义事件，刷新页面

export default {
  data() {
    return {
      editName:"", //名字
      editPhone:"", //电话
       editShop:"", //店铺名字
      editArea:"", //收货人地址
      editId:"", //被修改的id
      judgeName:false,
      judgePhone:false,
      judgeShop:false,
      judgeaddArea:false,
    };
  },
  created() {
    this.replicateData()
  },
  methods:{
    replicateData(){      //刚进页面的时候，把数据带过来
      let query = this.$route.query
      this.editName = query.name
      this.editPhone = query.phone
      this.editShop = query.shop
      this.editArea = query.address
      this.editId = query.id
    },
    keepData(){       //点击保存的时候
      if(this.editName ==''){
        console.log('名字不可以为空！');
         this.judgeName = true;
        return false;
      }
       this.judgeName = false;
      if(!(/^1[34578]\d{9}$/.test(this.editPhone))){ 
          console.log("请输入正确的手机号码");  
           this.judgePhone = true;
          return false; 
      } 
      this.judgePhone = false;
       if(this.editShop ==''){
        console.log('店铺名字不可以为空！');
         this.judgeShop = true;
        return false;
      }
      this.judgeShop = false;
       if(this.editArea ==''){
        console.log('收货人地址不可以为空！');
        this.judgeaddArea = true;
        return false;
      }
      this.judgeaddArea = false;
       let param = {
        id:    this.editId,
        name:  this.editName,
        phone: this.editPhone,
        address:this.editArea,
        shopName:this.editShop,
      }
      console.log(param);
      modifyConsignee(param).then(res => {
        if (res.result === "success") {
           bus.$emit('update','');
          console.log("修改成功");
        }
      }); 
      this.$router.push({
        path: "/myConsignee",
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.common {
  background-color: #F6F6F6;
  position: relative;
  height: 100%;
}

.common .name, .common .tele,
 .common .name, .common .shopname{
  height: 90px;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
  border-bottom: 1px solid #f6f6f6;
}

.common .tele {
  margin-bottom: 20px;
}

.common .name .left, .common .tele .left,
.common .name .left, .common .shopname .left {
  float: left;
  width: 150px;
  height: 42px;
  font-size: 30px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 42px;
  margin: 24px 12px 24px 24px;
}

.common .name .right, .common .tele .right,
 .common .name .right, .common .shopname .right{
  float: left;
  // width: 600px;
  height: 42px;
  font-size: 30px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 42px;
  margin-top: 24px;
  outline: none;
}

.common .address {
  height: 132px;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
}

.common .address .left {
  float: left;
  width: 150px;
  height: 42px;
  font-size: 30px;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 42px;
  margin: 24px 12px 66px 24px;
}

.common .address .right {
  width: 540px;
  height: 84px;
  font-size: 30px;
  color: rgba(51, 51, 51, 1);
  line-height: 42px;
  margin-top: 24px;
  outline: none;
  resize: none;
  border: 0;
}

.common .edit {
  width: 100%;
  height: 98px;
  background: rgba(255, 86, 56, 1);
  position:fixed;
  bottom: 0;
  font-size: 32px;
  color: rgba(255, 255, 255, 1);
  line-height: 98px;
  text-align: center;
}

.judgeinfo{
    text-align: right;
    color: #f00;
    height: 45px;
    line-height: 45px;
    margin-right: 80px;
}
</style>
<template>
  <div class="common">
    <div class="name">
      <div class="left">您的姓名 :</div>
      <input class="right" value type="text" v-model="name" placeholder="请输入姓名" ref="nameInput">
    </div>
    <div class="tele">
      <div class="left">联系电话 :</div>
      <input class="right" value type="text" v-model="phone" placeholder="请输入联系电话">
    </div>
    <div class="address">
      <div class="left">收货地址 :</div>
      <textarea rows="2" cols="20" class="right" v-model="address" placeholder="请填写收货地址"></textarea>
    </div>
    <div class="edit" @click="_operate">{{isEdit?'保存':'编辑'}}</div>
  </div>
</template>

<script>
import {
  findCustomerOwerInfo,
  updateOwerCustomer
} from "api/fetch/endCustomer";

export default {
  data() {
    return {
      name: "",
      phone: "",
      address: "",
      isEdit: false
    };
  },
  components: {},
  mounted() {},
  computed: {},
  created() {
    this._findCustomerOwerInfo();
  },
  methods: {
    _findCustomerOwerInfo() {
      findCustomerOwerInfo()
        .then(res => {
          if (res.result === "success" && res.data) {
            this.originInfo = res.data;
            const { name, phone, address } = this.originInfo;
            this.name = name;
            this.phone = phone;
            this.address = address;
          }
        })
        .catch(err => {
          this.$toast(err.message);
        });
    },
    checkData(){   // wx 检验数据是否都存在
      // /都是空的
      if(this.name&&this.phone&&this.address){
          return true;
        }else{
          return false;
        }
      
    },
    _operate() {
      if (!this.isEdit) {
        document.title = "编辑个人信息";
        this.isEdit = true;
        this.$refs.nameInput.focus();
        return false;
      }
      //todo 判断空
      if(!this.checkData){
       return  this.$toast('信息不能为空');

      }
      //保存 如果没有更改项直接返回
      if (this.isMutated()) {
        const { name, phone, address } = this;
        updateOwerCustomer({ name, phone, address })
          .then(res => {
            if (res.result === "success") {
              this.$toast("个人信息修改成功");
              this.$router.go(-1);
            }
          })
          .catch(err => {
            this.$toast(err.message);
          });
      }
      //
      this.$router.go(-1);
    },
    //是否变更
    isMutated() {
      for (let preperty in this.originInfo) {
        if (this.originInfo[preperty] != this[preperty]) {
          return true;
        }
      }
      return false;
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

.common .name, .common .tele {
  height: 90px;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
  border-bottom: 1PX solid #f6f6f6;
}

.common .tele {
  margin-bottom: 20px;
}

.common .name .left, .common .tele .left {
  float: left;
  width: 150px;
  height: 42px;
  font-size: 30px;
  color: rgba(102, 102, 102, 1);
  line-height: 42px;
  margin: 24px 12px 24px 24px;
}

.common .name .right, .common .tele .right {
  float: left;
  width: 600px;
  height: 42px;
  font-size: 30px;
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
  background: rgba(255, 255, 255, 1);
  position: fixed;
  bottom: 0;
  font-size: 32px;
  color: rgba(255, 86, 56, 1);
  line-height: 98px;
  text-align: center;
}
</style>
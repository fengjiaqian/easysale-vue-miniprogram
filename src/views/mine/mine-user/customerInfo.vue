<template>
  <div class="common pt90">
    <m-header :isFixed="true"></m-header>
    <div class="mc-item">
      <div class="left">您的姓名 :</div>
      <input class="right" value type="text" v-model="name" placeholder="请输入姓名" ref="nameInput">
    </div>
    <div class="mc-item">
      <div class="left">联系电话 :</div>
      <input class="right" value type="text" v-model="phone" placeholder="请输入联系电话">
    </div>
    <div class="mc-item">
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
    _operate() {
      if (!this.isEdit) {
        document.title = "编辑个人信息";
        this.isEdit = true;
        this.$refs.nameInput.focus();
        return false;
      }
      const checkState =
        this.name.trim() && this.phone.trim() && this.address.trim();
      //todo 判断空
      if (!this.checkState) {
        return this.$toast("信息不能为空");
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
.mc-item {
  padding: 0 24px;
  bg(#fff);
  flex();
  align-items: center;
  justify-content: flex-start;
  lh(90);
  ft(30);
  c-3();

  .left {
    c-6();
    mr(12);
    min-width: 150px;
  }

  .right {
    lh(90);
    h(90);
    flex-1();
    outline: none;
    border: none;
  }
}

.edit {
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
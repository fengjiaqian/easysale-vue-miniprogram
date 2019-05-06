<template>
  <div class="common pt90">
    <m-header :isFixed="true"></m-header>
    <div class="mc-item">
      <div class="left">您的姓名 :</div>
      <input
        class="right"
        value
        type="text"
        v-model="name"
        placeholder="请输入姓名"
        ref="nameInput"
        readonly
      >
    </div>
    <div class="mc-item">
      <div class="left">联系电话 :</div>
      <input class="right" value type="text" v-model="phone" placeholder="请输入联系电话" readonly>
    </div>
    <div class="mc-item">
      <div class="left">收货地址 :</div>
      <textarea rows="2" cols="20" class="right" v-model="address" placeholder="请填写收货地址" readonly></textarea>
    </div>
    <div class="edit" @click="_jump">编辑</div>
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
      address: ""
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

    _jump() {
      const params = {
        name: this.name,
        phone: this.phone,
        address: this.address
      };
      this.$router.push({
        path: "/editUserInfo",
        query: {
          info: this.encodeUrl(params)
        }
      });
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

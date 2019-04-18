
<template>
  <div class="common">
    <div class="search">
      <input
        class="case"
        type="text"
        value
        @change="_queryCustomerConsigneeList"
        v-model="keyword"
        placeholder="请输入姓名或者电话"
      >
    </div>
    <address-list :addressList="addressList" @deletItem="_deletItem"></address-list>
    <div class="edit" @click="_addAddress()">新增收货人</div>
  </div>
</template>

<script>
import AddressList from "./address-list.vue";
import { queryCustomerConsigneeList } from "api/fetch/endCustomer";

export default {
  data() {
    return {
      keyword: "",
      addressList: []
    };
  },
  components: {
    AddressList
  },
  mounted() {},
  computed: {},
  created() {
    this._queryCustomerConsigneeList();
  },
  methods: {
    _queryCustomerConsigneeList() {
      queryCustomerConsigneeList(this.keyword).then(res => {
        if (res.result === "success" && res.data) {
          this.addressList = res.data;
        }
      });
    },
    _deletItem(id) {
      const Idx = this.addressList.findIndex(item => item.id == id);
      if (Idx != -1) {
        this.addressList.splice(Idx, 1);
      }
    },
    _addAddress() {
      this.$router.push({
        name: "updateConsignee",
        params: {
          code: 1
        }
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
  overflow: hidden;
}

.common .search {
  width: 100%;
  height: 110px;
  background-color: white;
  display: border-box;
  padding: 24px;
  padding: 24px 24px 10px 24px;
  position: fixed;
  top: 0;
  z-index: 100;
}

.common .search .case {
  width: 100%;
  height: 72px;
  border-radius: 10px;
  display: inline-block;
  text-align: center;
  margin: auto;
  outline: none;
  font-size: 28px;
  font-weight: 400;
  color: rgba(136, 136, 136, 1);
  background: rgba(246, 246, 246, 1) url('../../../assets/images/ic_sousuo@2x.png') no-repeat center;
  background-position: 30% center;
  background-size: 32px 32px;
}

// list
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
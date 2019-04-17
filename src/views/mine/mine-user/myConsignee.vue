
<template>
  <div class="common">
    <!-- wx  我的收货人的页面 myConsignee -->
    <div class="search">
      <input class="case" type="text" value="" @change="chooseData()" v-model="chooseCode" placeholder="请输入姓名或者电话">
    </div>
    <address-list></address-list>
    
    <div class="edit" @click="addPerson()">新增收货人</div>
  </div>
</template>

<script>
import AddressList from "./address-list.vue";
import { queryCustomerConsigneeList } from "api/fetch/endCustomer";

export default {
  data() {
    return {
      chooseCode:"", //input框绑定的事件
      listDetail:"", //我的收货人的数据
      
    };
  },
  components: {
    AddressList
  },
  computed: {
    
  },
  created() {
   this.queryList()
  },
  methods: {
    queryList(){   //获取收货人的数据
      let param = {
        userId: 222,
        keyword: this.chooseCode,
      }
      queryCustomerConsigneeList(param).then(res => {
        if (res.result === "success" && res.data) {
          this.listDetail  = res.data;
          console.log(this.listDetail);
          debugger
        }
      });  
    },
    chooseData(){   //当输入条件查询的时候
      let that = this;
      that.queryList();
      console.log(4444);

    },
    addPerson(){

    },
    stop(){}

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
  height:110px;
  background-color: white;
  display: border-box;
  padding: 24px;
  padding:24px 24px 10px 24px;
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
  background-position:30% center;
  background-size: 32px 32px;

//   block()
//   inline()
//   w(702)
//   h(72)
//   bg()
//   c()
//   ft()
//   text-c()
//   radius(10)
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
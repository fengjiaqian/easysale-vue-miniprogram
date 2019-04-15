
<template>
  <div class="common">
    <!-- wx  我的收货人的页面 myConsignee -->
    <div class="search">
      <input class="case" type="text" value="" placeholder="请输入姓名或者电话">
    </div>
    <address-list></address-list>
    
    <div class="edit">新增收货人</div>
  </div>
</template>

<script>
import AddressList from "./address-list.vue";
export default {
  data() {
    return {
      
    };
  },
  components: {
    AddressList
  },
  computed: {
    
  },
  created() {
   
  },
  methods: {
    
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
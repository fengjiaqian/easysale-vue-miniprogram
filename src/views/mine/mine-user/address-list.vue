
<template>
  <div class="common">
    <!-- wx  收货信息的组件 addressList -->
    <ul class="list">
      <li class="part" v-for="item in addressCode">
        <div class="info">
          <div class="name">{{item.name}}</div>
          <div class="tel">{{item.phone}}</div>
        </div>
        <div class="operate">
          <div class="shopname">{{item.shopName}}</div>
          <div class="edit" @click="modifyData(item)">编辑</div>
          <div class="del" @click="DeletData(item)">删除</div>
        </div>
        <div class="address">{{item.address}}</div>
      </li>
    </ul>
    <div class="support"></div>
  </div>
</template>

<script>
import { deleteConsignee } from "api/fetch/endCustomer";
import bus from 'common/Bus'    //这是自定义事件，刷新页面

export default {
  name:"address-list",
  props:{
    addressCode: Array
  },
  methods:{
    modifyData(item){   //点击编辑的时候
      this.$router.push({
        path: "/editConsignee",
        query:{name:item.name,
               phone:item.phone,
               shop:item.shopName,
               address:item.address,
               id:item.id}
      });
    },
    DeletData(item){  //点击删除的时候
      console.log(222);
      let param={
        id: item.id,
      }
      deleteConsignee(param).then(res=>{
         if (res.result === "success") {
          bus.$emit('update','')
        }
      })
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

.common .list {
  width: 100%;
  height: 90%;
  padding: 0 24px 0 24px;
  overflow: scroll;
  display: border-box;
  background-color: #fff;
}

.common .list .part {
  width: 100%;
  // height: 192px;
  padding-top:24px;
  overflow :hidden;
  display: border-box;
  background-color: #fff;
  border-bottom: 1px solid #f6f6f6;
}

// .common .list .part:last-child{
//   padding-bottom :192px;
// }

.common .list .part:first-child{
  margin-top :110px;
}
.common .list .part .info {
  width: 100%;
  height: 64px;
}

.common .list .part .info .name {
  float: left;
  height: 44px;
  font-size: 32px;
  font-weight: 500;
  line-height: 44px;
  margin-right: 48px;
  color: #333;
  font-weight: bold;
}

.common .list .part .info .tel {
  float: left;
  height: 44px;
  font-size: 32px;
  color: #333;
  line-height: 44px;
  font-weight: bold;
}

.common .list .part .operate {
  height: 56px;
  overflow: hidden;
}

.common .list .part .operate .shopname {
  // width: 112px;
  height: 56px;
  font-size: 28px;
  color: rgba(102, 102, 102, 1);
  line-height: 56px;
  float: left;
}

.common .list .part .operate .del {
  float: right;
  width: 88px;
  height: 56px;
  border-radius: 8px;
  border: 1px solid rgba(221, 221, 221, 1);
  font-size: 28px;
  color: rgba(102, 102, 102, 1);
  line-height: 56px;
  margin-right: 24px;
  text-align: center;
}

.common .list .part .operate .edit {
  float: right;
  width: 88px;
  height: 56px;
  border-radius: 8px;
  border: 1px solid rgba(221, 221, 221, 1);
  font-size: 28px;
  color: rgba(102, 102, 102, 1);
  line-height: 56px;
  text-align: center;
}

.common .list .part .address {
  width: 100%;
  // height: 38px;
  font-size: 28px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 38px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.common .support{
  width :100%;
  height:192px;
  background-color #f6f6f6;

}
</style>
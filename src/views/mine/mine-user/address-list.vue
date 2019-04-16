
<template>
  <div class="common">
    <!-- wx  收货信息的组件 addressList -->
    <ul class="list">
      <li class="part" v-for="item in [1,2,3,4,5,6,7,8,9,10,11,12]">
        <div class="info">
          <div class="name">张栋</div>
          <div class="tel">13555555555</div>
        </div>
        <div class="operate">
          <div class="shopname">小王店铺</div>
          <div class="edit">编辑</div>
          <div class="del">删除</div>
        </div>
        <div class="address">湖北省武汉市洪山区软件新城1期</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name:"address-list",
  props:{
    
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
  height: 192px;
  padding-top:24px;
  overflow :hidden;
  display: border-box;
  background-color: #fff;
  border-bottom: 1px solid #f6f6f6;
}

.common .list .part:last-child{
  margin-bottom :192px;
}

.common .list .part:first-child{
  margin-top :110px;
}
.common .list .part .info {
  width: 100%;
  height: 64px;
}

.common .list .part .info .name {
  float: left;
  width: 64px;
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
  width: 112px;
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
  height: 38px;
  font-size: 28px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 38px;
}
</style>
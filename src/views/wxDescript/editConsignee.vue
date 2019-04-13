<template>
  <div class="common">
    <!-- wx  编辑收货人的页面  editConsignee -->
    <div class="name">
      <div class="left">姓名 :</div>
      <input class="right" value="张栋" type="text">
    </div>
    <div class="tele">
      <div class="left">联系电话 :</div>
      <input class="right" value="13555555555" type="text">
    </div>
    <div class="shopname">
      <div class="left">店铺名称 :</div>
      <input class="right" value="老王的店铺" type="text">
    </div>
    <div class="address">
      <div class="left">收货地址 :</div>
      <textarea rows="2" cols="20" class="right">湖北省 武汉市 洪山区 花城大道软件新城A3-401</textarea>
    </div>
    <div class="edit">保存</div>
  </div>
</template>

<script>
export default {};
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
  width: 600px;
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
  position: absolute;
  bottom: 0;
  font-size: 32px;
  color: rgba(255, 255, 255, 1);
  line-height: 98px;
  text-align: center;
}
</style>
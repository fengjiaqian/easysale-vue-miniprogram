<template>
  <div class="common">
    <div class="name">
      <div class="left">您的姓名 :</div>
      <input class="right" value="张栋" type="text" placeholder="请输入姓名">
    </div>
    <div class="tele">
      <div class="left">联系电话 :</div>
      <input class="right" value="13555555555" type="text" placeholder="请输入联系电话">
    </div>
    <div class="address">
      <div class="left">收货地址 :</div>
      <textarea rows="2" cols="20" placeholder="请填写收货地址" class="right">湖北省 武汉市 洪山区 花城大道软件新城A3-401</textarea>
    </div>
    <div class="edit">编辑</div>
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

.common .name, .common .tele {
  height: 90px;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
  border-bottom: 1px solid #f6f6f6;
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
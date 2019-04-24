 <!--  经销商 投诉管理 complaintManagement -->

<template>
  <div id="common" ref="common">
    <section class="top-bar">
      <span :class="{'active': activeIdx == 0}" @click="switchBar(0)">待处理</span>
      <span :class="{'active': activeIdx == 1}" @click="switchBar(1)">已处理</span>
    </section>
    <!-- 待处理 -->
    <div v-if="judgeDeal==0">
      <div class="message" v-for="x in 5">
        <div class="title">
          <img class="t-img" src="../../../assets/images/icon-checked.png" alt>
          <div class="t-name">小丽</div>
          <div class="t-type">待处理</div>
        </div>
        <div class="time">2019-03-23 20:43</div>
        <div class="apply">销售人员态度不好</div>
        <div class="descript">我在这里下了一个单，销售人员态度非常不好，很不耐烦，没说几句还发脾气我在这里下了一个单，销售人哈哈哈哈哈哈哈哈</div>
        <!-- <div class="continue" v-if="activeIdx==1">
                    <div class="triangle"></div>
                    <div class="report">
                        <div class="left">经销商回复：</div>
                        <div class="right">2019-03-23  20:40</div>
                    </div>
                    <div class="tips">亲爱的客户，非常抱歉给您带来的不便，您的反馈问题我们会在下次服务中改进。期待您再次光临</div>
        </div>-->
        <div class="bottom">
          <span class="to-deal">销售人员-小黑已处理</span>
          <div class="examine">查看详情</div>
        </div>
      </div>
      <!--  -->
      <div class="support"></div>
      <div class="below">
        <img class="l-img" src="../../../assets/images/icon-check.png" alt>
        <div class="l-all">全选</div>
        <button class="right" @click="openShadow()">移交处理</button>
      </div>
    </div>
    <!-- 已处理 -->
    <div v-if="judgeDeal==1">
      <div class="message" v-for="x in 2">
        <div class="title">
          <!-- <img class="t-img" src="../../../assets/images/icon-checked.png" alt=""> -->
          <div class="t-name" style="margin-left:0;">小丽</div>
          <div class="t-type">待处理</div>
        </div>
        <div class="time" style="margin-left:0;">2019-03-23 20:43</div>
        <div class="apply" style="margin-left:0;">销售人员态度不好</div>
        <div
          class="descript"
          style="margin-left:0;"
        >我在这里下了一个单，销售人员态度非常不好，很不耐烦，没说几句还发脾气我在这里下了一个单，销售人哈哈哈哈哈哈哈哈</div>
        <div class="continue" v-if="activeIdx==1">
          <div class="triangle"></div>
          <div class="report">
            <div class="left">经销商回复：</div>
            <div class="right">2019-03-23 20:40</div>
          </div>
          <div class="tips">亲爱的客户，非常抱歉给您带来的不便，您的反馈问题我们会在下次服务中改进。期待您再次光临</div>
        </div>
        <div class="bottom">
          <!-- <span class="to-deal">销售人员-小黑已处理</span> -->
          <div class="examine">查看详情</div>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <div class="bg-color" ref="shadow">
      <div class="shadow">
        <div class="title">
          <span class="left">移交给</span>
          <img
            class="right"
            @click="closeShadow()"
            src="../../../assets/images/role_icon_2.png"
            alt
          >
        </div>
        <ul class="staff-list">
          <li :class="{'choosed': choosedIdx == 0}" @click="choosedLi(0)">
            <span>小黑</span>
            <img v-if="choosedIdx == 0" src="../../../assets/images/icon-duigou.png" alt>
          </li>
          <li :class="{'choosed': choosedIdx == 1}" @click="choosedLi(1)">
            <span>小黑</span>
            <img v-if="choosedIdx == 1" src="../../../assets/images/icon-duigou.png" alt>
          </li>
          <li :class="{'choosed': choosedIdx == 2}" @click="choosedLi(2)">
            <span>小黑</span>
            <img v-if="choosedIdx == 2" src="../../../assets/images/icon-duigou.png" alt>
          </li>
          <li :class="{'choosed': choosedIdx == 3}" @click="choosedLi(3)">
            <span>小黑</span>
            <img v-if="choosedIdx == 3" src="../../../assets/images/icon-duigou.png" alt>
          </li>
          <li :class="{'choosed': choosedIdx == 4}" @click="choosedLi(4)">
            <span>小黑</span>
            <img v-if="choosedIdx == 4" src="../../../assets/images/icon-duigou.png" alt>
          </li>
          <li :class="{'choosed': choosedIdx == 5}" @click="choosedLi(5)">
            <span>小黑</span>
            <img v-if="choosedIdx == 5" src="../../../assets/images/icon-duigou.png" alt>
          </li>
          <li :class="{'choosed': choosedIdx == 6}" @click="choosedLi(6)">
            <span>小黑</span>
            <img v-if="choosedIdx == 6" src="../../../assets/images/icon-duigou.png" alt>
          </li>
        </ul>
        <div class="certain">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIdx: 0, //选中的区间
      choosedIdx: 1, //选中的li
      typeCode: 2, //判断是收起，展开更多还是橙色的字
      judgeDeal: 0, //如果待处理，则渲染1   已处理 渲染2
      hideCode: true //如果遮罩层出来的话，背景色变色
    };
  },
  computed: {},
  components: {},
  methods: {
    switchBar(idx) {
      this.activeIdx = idx;
      this.judgeDeal = idx;
    },
    choosedLi(idx) {
      this.choosedIdx = idx;
    },
    openShadow() {
      var shadow = this.$refs.shadow;
      shadow.style.display = "block";
      //   this.$refs.common.style.background ="black"
    },
    closeShadow() {
      var shadow = this.$refs.shadow;
      shadow.style.display = "none";
      console.log(shadow.style.display);
    },
    tooMore() {
      //点击获取更多的时候，操作数据，将要渲染的数据全部渲染
    },
    tooLess() {
      //点击收起的时候，操作数据，将要渲染的数据截取两条渲染
    }
  }
};
</script>

<style lang="stylus" scoped>
#common {
  bg(#f6f6f6);
  position: relative;
}

#common .top-bar {
  display: flex;
  width: 100%;
  h(98);
}

#common .top-bar span {
  width: 50%;
  flex: 1;
  c(#666);
  font-size: 28px;
  h(98);
  text-align: center;
  lh(98);
  display: inline-block;
  bg(white);
}

#common .top-bar .active {
  c(#333);
  font-size: 34px;
  font-weight: bold;
  position: relative;
}

#common .top-bar .active:before {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  w(40);
  h(6);
  bg(#FF5638);
}

#common .message {
  margin-top: 30px;
  padding: 24px 24px 0 24px;
  bg(white);
}

#common .message .title {
  overflow: hidden;
}

#common .message .title .t-img {
  float: left;
  w(40);
  h(40);
  display: inline-block;
  margin-right: 24px;
  margin-top: 10px;
}

#common .message .title .t-name {
  float: left;
  c(#333);
  font-size: 28px;
  font-weight: bold;
}

#common .message .title .t-type {
  float: right;
  c(#FF5638);
  font-size: 26px;
}

#common .message .time {
  c(#999);
  font-size: 24px;
  lh(34px);
  margin-left: 60px;
}

#common .message .apply {
  c(#333);
  font-size: 32px;
  // margin-top:15px;
  font-weight: bold;
  // margin-left: 60px;
  margin: 15px 0 0 60px;
}

#common .message .descript {
  c(#666);
  font-size: 28px;
  height: 75px;
  margin: 15px 0 15px 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

#common .message .type {
  c(#FF5638);
  font-size: 28px;
  padding-top: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f6f6f6;
  margin-left: 60px;
}

// #common .message .type-2{
// c(#0096FF);
// font-size :28px;
// padding-top:16px;
// padding-bottom :16px;
// // border-bottom :1px solid #f6f6f6;

// }
#common .message .bottom {
  padding: 16px 0 16px 0;
  h(96);
  border-top: 1px solid #f6f6f6;
}

#common .message .bottom .to-deal {
  h(64);
  float: left;
  lh(64);
  c(#99);
  text-align: center;
  font-size: 28px;
  margin-left: 20px;
}

#common .message .bottom .examine {
  w(160);
  h(64);
  float: right;
  border: 1px solid #f6f6f6;
  c(#333);
  text-align: center;
  lh(64);
  font-size: 28px;
}

#common .below {
  width: 100%;
  height: 98px;
  background: rgba(255, 255, 255, 1);
  position: fixed;
  bottom: 0;
  font-size: 32px;
  color: rgba(255, 86, 56, 1);
  line-height: 98px;
  text-align: center;
  border-top: 1px solid #ededed;
  overflow: hidden;
}

#common .below .l-img {
  float: left;
  w(40);
  h(40);
  lh(98);
  display: block;
  margin: 28px;
}

#common .below .l-all {
  float: left;
  lh(98);
  c(#666);
  font-size: 30px;
}

#common .below .right {
  w(160);
  h(64);
  float: right;
  border: 1px solid #f6f6f6;
  c(#fff);
  bg(#FF5638);
  text-align: center;
  lh(64);
  font-size: 28px;
  display: inline-block;
  margin: 20px 24px 0 24px;
  border-radius: 8px;
}

#common .support {
  h(98);
}

#common .message .continue {
  bg(#f6f6f6);
  mt(24);
  border-radius: 10px;
  padding: 24px;
  position: relative;
}

.triangle {
  width: 0;
  height: 0;
  border-bottom: 22px solid #f6f6f6;
  border-left: 16px solid transparent;
  border-right: 16px solid transparent;
  position: absolute;
  top: -22px;
  left: 50px;
}

#common .message .continue .report {
  overflow: hidden;
  margin-bottom: 16px;
}

#common .message .continue .report .left {
  float: left;
  c(#FF5638);
  font-size: 26px;
  height: 34px;
}

#common .message .continue .report .right {
  float: right;
  c(#999);
  font-size: 26px;
  height: 34px;
  lh(34);
}

#common .message .continue .tips {
  c(#666);
}

#common .bg-color {
  width: 100%;
  height: 100%;
  bg(gray);
  position: fixed;
  left: 0;
  bottom: 0;
  display: none;
}

#common .shadow {
  bg(#f6f6f6);
  width: 100%;
  height: 60%;
  position: fixed;
  left: 0;
  bottom: 0;
}

#common .shadow .title {
  padding: 0px 24px 0 24px;
  overflow: hidden;
  h(96);
}

#common .shadow .title .left {
  ft(36);
  c(#333);
  lh(96);
  // bg(pink)
  // h(96)
  float: left;
  font-weight: bold;
}

#common .shadow .title .right {
  float: right;
  display: inline-block;
  w(40);
  h(40);
  margin: 23px 0 0 0;
}

#common .shadow .staff-list {
  padding: 0 24px 0 24px;
  overflow :scroll;
  height:calc(100% - 200px);
}

#common .shadow .staff-list li {
  h(96);
  overflow: hidden;
}

#common .shadow .staff-list li span {
  lh(96);
  c(333);
  ft(30);
  float: left;
}

#common .shadow .staff-list li img {
  display: inline-block;
  w(40);
  h(40);
  margin-top: 28px;
  float: right;
}

#common .shadow .staff-list li.choosed {
  border-bottom: 1px solid #FF5638;
}

#common .shadow .certain {
  position: fixed;
  left: 0;
  bottom: 0;
  bg(#FF5638);
  c(white);
  ft(32);
  width: 100%;
  h(98);
  lh(98);
  text-align: center;
}
</style>




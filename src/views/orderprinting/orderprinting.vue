<template>
  <div id="orderprinting" style="margin:0 auto;width:300px;height:100px">
    <H1> {{uuid}}</H1>
    <div id="qrCode" ref="qrCodeDiv"></div>
  </div>
</template>

<script>

import QRCode from 'qrcodejs2';
let that = null;
export default {
  name: "orderprinting",
  data() {
    return {
      resultNum:0,
      uuid:null,
      msg:'test'
    }
  },
  mounted() {
    that = this;
    this.resultNum = 0;
    this.uuid = this.get_uuid();
    this.bindQRCode();
  },
  //keepalive组件每次进都会触发的方法
  activated() {

  },
  components: {
    QRCode
  },
  methods: {
    initWebSocket: function () {
      if(this.uuid == null){
        this.uuid = that.get_uuid();
      }
      // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
      this.websock = new WebSocket("ws://197.168.14.224:5201/websocket/"+this.uuid);
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen: function () {
      console.log("WebSocket连接成功");
    },
    websocketonerror: function (e) {
      console.log("WebSocket连接发生错误");
    },
    websocketonmessage: function (e) {
      if(e && e.isTrusted){
        this.resultNum++;
        if(this.resultNum > 1){
          let objs =  JSON.parse(e.data);
          console.log(objs);
          console.log(objs.result);
          if(objs.result == "success"){
            this.$message({
              type: 'info',
              message: '授权成功'
            });
            //TODO 需要把后台websocket 传递过来的参数解析出来 传递到以下跳转的页面，该页面调用后台接口 所需参数 在 objs里面
            this.$router.push({name:`orderlist`})
          }else{
            alert("授权失败");
          }
        }
      }
    },
    websocketclose: function (e) {
      console.log("connection closed (" + e.code + ")");
    },
    bindQRCode: function () {
      new QRCode(this.$refs.qrCodeDiv, {
        text: "ORDER_"+this.uuid,
        width: 200,
        height: 200,
        colorDark: "#333333", //二维码颜色
        colorLight: "#ffffff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L//容错率，L/M/H
      })
      //初始化  websocket
      that.initWebSocket();
    },
    get_uuid:function(){
      var s = [];
      var hexDigits = "0123456789abcdefghijklmnopqrstvuwsyz";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4";
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
      s[8] = s[13] = s[18] = s[23];
      var uuid = s.join("");
      return uuid;
    }

  },
  computed: {
  },
  watch: {
  },
}
</script>
<style scoped>

</style>
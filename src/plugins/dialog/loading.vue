<template>
  <div class="loading-message">
    <div class="loading-state">加载中...</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus">
.loading-message {
  position: fixed;
  left: 50%;
  top: 50%;
  z-index 100
  transform: translate(-50%, -50%);
  width: 106px;
  height: 106px;
  background: url('./../../assets/images/loading-logo.png') no-repeat;
  background-size: 106px 106px;
}

.loading-state {
  border-radius: 50%;
  width: 106px;
  height: 106px;
  font-size: 20px;
  margin: 0;
  position: relative;
  text-indent: -9999em;
  border-top: 6px solid rgba(170, 170, 170, 0.4);
  border-right: 6px solid rgba(170, 170, 170, 0.4);
  border-bottom: 6px solid rgba(170, 170, 170, 0.4);
  border-left: 6px solid #aaa;
  -webkit-animation: rotate1 1.1s infinite linear;
  animation: rotate1 1.1s infinite linear;
}

.loading-state:after {
  border-radius: 50%;
  width: 106px;
  height: 106px;
}

@keyframes rotate1 {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
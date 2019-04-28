<style scoped lang="stylus">
.wc-toast {
    position: fixed;
    z-index: 99999;
    line-height: 1.2;
}

.wc-toast--default {
    left: 50%;
    transform: translate(-50%, 0);
    bottom: 160px;	
}
.wc-toast--center {
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
.wc-toast-message {
    font-size: 30px;
    padding: 24px 32px;
    text-align: center;
    color: #fff;
    border-radius: 6px;
    background: #323232;
    opacity: .6;

    display: flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    img {
    	margin-bottom: 8px;
    }
    .wc-toast__text {
    	
    }
}
.wc-fade-enter {
  opacity: 0
}
.wc-fade-enter-active, .wc-fade-leave-active {
  transition: opacity .4s
}
.wc-fade-leave-active {
	opacity: 0;
}

</style>
<template>
	<transition name="wc-fade">
		<div class="wc-toast" v-if="show" :class="{'wc-toast--center': location == 'center', 'wc-toast--default': location == 'bottom'}">
			<div class="wc-toast-message" :style="toastStyle">
				<img :src="path" alt="" :style="imgStyle" v-if="path">
				<div class="wc-toast__text" :style="textStyle">{{content}}</div>
			</div>
		</div>
	</transition>
</template>
<script>
	export default {
		data () {
			return {
				show: false,
				content: '',
				duration: 2000,
				location: 'center',
				toastStyle: {},
				imgStyle: {},
				textStyle: {},
				path: '',
			}
		}
	}
</script>
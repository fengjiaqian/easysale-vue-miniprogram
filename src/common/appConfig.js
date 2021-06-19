import Vue from 'vue'
Vue.filter('price', function (val, unit = "") {
	if (!val) {
		return `<em class="fz28">&yen;</em><span class="fz38">?<span><span class="fz28">元/${unit}</span>`
	}
	let value = '0.00';
	if (val) {
		value = val.toFixed(2);
	}
	let nums = value.split('.');
	return `<em class="fz28">&yen;</em><span class="fz38">${nums[0]}<span><span class="fz28">.${nums[1]}<span class="fz28">元/${unit}</span></span>`
})

Vue.filter('orderState', function (state) {
	const orderTab = [
		{ text: "待处理", state: 1 },
		{ text: "已处理", state: 2 },
		{ text: "已拒绝", state: 3 },
		{ text: "已取消", state: 5 }
	];
	const matchItem = orderTab.find(item => item.state === state);
	return matchItem ? matchItem.text : '';
});

Vue.filter('priceToFixed', function (val) {
	let value = '0.00';
	if (val && !isNaN(val)) {
		value = val.toFixed(2);
	} else {
		value = val
	}
	return value;
})

Vue.filter('normalPrice', function (val, unit = "") {
	if (!val) {
		return `&yen;<span class="fz38">?<span><span class="fz28">元/${unit}</span>`
	}
	let value = '0.00';
	if (val) {
		value = val.toFixed(2);
	}
	let nums = value.split('.');
	return `<span class="fz32">${nums[0]}<span><span class="fz24">.${nums[1]}<span class="fz26 ml8">元/${unit}</span></span>`
})

Vue.directive('img-aspect-fit', {
	bind: function (el) {
		el.addEventListener('load', function () {
			var clientW = document.documentElement.clientWidth || document.body.clientWidth;
			this.style.height = Math.round(clientW * this.height / this.width) + 'px'
			this.parentNode.style = this.style.height
		}, false)
	}
})

/**
 * route query 转义
 */
Vue.prototype.encodeUrl = function (obj) {
	return encodeURIComponent(JSON.stringify(obj))
}
Vue.prototype.decodeUrl = function (str) {
	return JSON.parse(decodeURIComponent(str))
}
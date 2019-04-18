import Vue from 'vue'

Vue.filter('price', function (val, unit = "") {
	if (!val) {
		return `&yen;<span class="fz38">?<span><span class="fz28">${unit}</span>`
	}
	let value = '0.00';
	if (val) {
		value = val.toFixed(2);
	}
	let nums = value.split('.');
	return `&yen;<span class="fz38">${nums[0]}<span><span class="fz28">.${nums[1]}<span class="fz28">${unit}</span></span>`
})

Vue.filter('orderState', function (state) {
	const orderTab = [
		{ text: "待处理", state: 1 },
		{ text: "已处理", state: 2 },
		{ text: "已拒绝", state: 3 },
		{ text: "已完成", state: 4 }
	];
	return orderTab.find(item => item.state === state).text || "";
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

Vue.directive('auth-interceptors',  {
	bind(el, binding){
		console.log(el) 
		console.log(binding)
		el.addEventListener('click',function(){
			console.log('directive evt')
		})
	},
	inserted(){
		console.log('inserted') 
	},
	unbind(){

	}
})
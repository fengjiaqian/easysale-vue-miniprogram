import Vue from 'vue'

Vue.filter('price', function (val, unit="") {
	if (!val) {
		return `&yen;<span class="fz38">?<span><span class="fz25">${unit}</span>`
	}
	let value = '0.00';
	if (val) {
		value = val.toFixed(2);
	}
	let nums = value.split('.');
	return `&yen;<span class="fz38">${nums[0]}<span><span class="fz25">.${nums[1]}<span class="fz25">${unit}</span></span>`
})

/*
 * format：'yyyy-MM-dd h:m:s'
 */
Date.prototype.format = function (format) {
	var date = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		"S+": this.getMilliseconds()
	};
	if (/(y+)/i.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	for (var k in date) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
		}
	}
	return format;
}
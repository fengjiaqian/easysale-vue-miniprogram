import Vue from 'vue'
import alertComponent from './alert.vue'

let initAlert = Vue.extend(alertComponent)
let instance;

let initInstance = () => {
    instance = new initAlert({
        el: document.createElement('div')
    });
    document.body.appendChild(instance.$el);
}
/**
 *
 * @param {*} options {}
 */

let Alert = (options) => {

    initInstance();
    if (typeof options === 'string') {
        options = {
            content: options,
            noText: null
        }
    } else {
        options.noText = null;
    }
    Object.assign(instance.$data, options);

    return new Promise((resolve, reject) => {
        /*fix 弹窗出来之后依旧键盘没有回收*/
        let inputs = Array.prototype.slice.call(document.querySelectorAll('input'));
        inputs.forEach((input) => {
            input.blur();
        });
        instance.show = true;
        let success = instance.success;
        instance.success = () => {
            success();
            resolve('success');
        }
    });
}

export default {
    install() {
        Vue.prototype.$alert = Alert
    }
}

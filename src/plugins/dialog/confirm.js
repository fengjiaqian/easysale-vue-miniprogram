import Vue from 'vue'
import ConfirmContainer from './confirm.vue'

let instance;
let ConfirmConstructor = Vue.extend(ConfirmContainer);

let initInstance = ()=>{
    instance = new ConfirmConstructor({
        el: document.createElement('div')
    });
    document.body.appendChild(instance.$el);
}
let Confirm = (options) => {
	
    initInstance();  
    if (typeof options === 'string') {
        options = {
            content: options
        }
    }
    // 将单个 Confirm instance 的配置合并到默认值中
    Object.assign(instance.$data, options);

    return new Promise((resolve, reject)=>{

        instance.show = true;

        /*fix 弹窗出来之后依旧键盘没有回收*/
        let inputs = Array.prototype.slice.call(document.querySelectorAll('input'));
        inputs.forEach((input)=>{
            input.blur();
        });

        /* 对 success 函数包裹一层 */
        let success = instance.success;
        let fail    = instance.fail;
        
        instance.success = () => {
            success();
            resolve('success');
        }

        instance.fail = () => {
            fail();
            reject('fail');
        }

    });
}
export default {
    install () {
        Vue.prototype.$confirm = Confirm;
    }
};
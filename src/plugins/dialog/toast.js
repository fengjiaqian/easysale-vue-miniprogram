import Vue from 'vue'
import ToastComponent from './toast.vue'

let instance;
let showing = false;
const ToastConstructor = Vue.extend(ToastComponent);

/* 初始化 instance, 并且 append 到页面里面 */
let initInstance = () => {
    instance = new ToastConstructor({
        el: document.createElement('div')
    });
    document.body.appendChild(instance.$el);
}

let Toast = (content, options = {}) => {
    /* 如果当前已经在显示的话, 不响应*/
    if (!showing) {
        showing = true;
        initInstance();
        /* 设置显示内容 */
        instance.content = content;
        Object.assign(instance.$data, options);
        /* 显示 */
        instance.show = true;
        setTimeout(() => {
            showing = false;
            instance.show = false;
        }, instance.duration );
    }
}

let Confirm = (options) => {

    initInstance();
    if (typeof options === 'string') {
        options = {
            content: options
        }
    }
    Object.assign(instance.$data, options);
    return new Promise((resolve, reject) => {

        instance.show = true;
        let success = instance.success;
        let fail = instance.fail;

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
    install() {
        Vue.prototype.$toast = Toast;
        Vue.prototype.$confirm = Confirm;
    }
};
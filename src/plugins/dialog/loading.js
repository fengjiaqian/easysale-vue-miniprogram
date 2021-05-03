import Vue from 'vue'
import loadingComponent from './loading.vue'

let loadingConstructor = Vue.extend(loadingComponent);

var $Loading = (function () {
    var instance = null;

    const close = function () {
        let $el = document.getElementsByClassName('loading-message')[0];
        $el && $el.parentNode.removeChild($el);
    }

    const init = (timeout) => {
        instance = new loadingConstructor({
            el: document.createElement('div')
        });
        document.body.appendChild(instance.$el);
        if (timeout) {
            setTimeout(close, timeout)
        }
        return instance;
    }

    return {
        getInstance: function (timeout) {
            if (!instance) {
                init(timeout)
            }
            document.body.appendChild(instance.$el);
        },
        close: close
    }
})()

export default $Loading;

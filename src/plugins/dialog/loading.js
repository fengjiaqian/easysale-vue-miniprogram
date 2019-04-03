import Vue from 'vue'
import loadingComponent from './loading.vue'

let loadingConstructor = Vue.extend(loadingComponent);

var $Loading = (function () {
    var instance = null;
    const init = () => {
        instance = new loadingConstructor({
            el: document.createElement('div')
        });
        document.body.appendChild(instance.$el);
        return instance;
    }
    return {
        getInstance: function () {
            if (!instance) {
                init()
            }
            document.body.appendChild(instance.$el);
        },
        close: function () {
            let $el = document.getElementsByClassName('loading-message')[0];
            $el && $el.parentNode.removeChild($el);
        }
    }
})()

export default $Loading;

import Vue from 'vue'
import dateformat from "dateformat";
const beauty = {
    install(Vue, options) {
        Vue.prototype.beautySum = (num) => {
            let number = parseInt(num)
                .toString()
                .replace(/(?!^)(?=(?:\d{3})+(?:\.|$))/gm, ' ')
            return number
        }

        Vue.prototype.dateBeauty = (date) => {
            let date1 = dateformat(date, "isoDate");
            date1 = date1.split("-").reverse();
            date1 = date1.join(".");
            return date1;
        }
    },
}

Vue.directive('click-out', {
    bind: function(el, binding, vnode) {
        el.clickOutsideEvent = function(event) {
            if (!(el === event.target || el.contains(event.target))) {
                vnode.context[binding.expression](event)
            }
        }
        document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unbind: function(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
    },
})
Vue.use(beauty)
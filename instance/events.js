export function eventsMixin(Vue) {
    Vue.prototype.$on = function() {}
    Vue.prototype.$once = function() {}
    Vue.prototype.$emit = function() {}
    Vue.prototype.$off = function() {}
}

export function initMixin(Vue) {
    // 初始化vm实例
    Vue.prototype._init = function(options) {
        const vm = this
        // options添加到当前vm实例上，执行Vue原型方法或者传递vm实例就可以访问组件对象的选项式配置（options）
        vm.$options = options

        
    }
}
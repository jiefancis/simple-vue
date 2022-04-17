import { createElement } from '../vdom/create-element'
import { mergeOptions } from '../utils/options'
export function initMixin(Vue) {
    // 初始化vm实例
    Vue.prototype._init = function(options) {
        const vm = this
        // options添加到当前vm实例上，执行Vue原型方法或者传递vm实例就可以访问组件对象的选项式配置（options）
        // 组件
        if(options?._isComponent) {

        } else {
            // 选项合并
            vm.$options = mergeOptions(
                resolveConstructorOptions(vm.constructor), // Vue.options
                options || {},
                vm
            )
        }
        
        // render函数的 ( h ) 参数
        vm.$createElement = createElement.bind(vm)

        if(options.el) {
            // 挂载的容器
            vm.$mount(options.el)
        }
    }
}

function resolveConstructorOptions(Ctor) {
    const options = Ctor.options
    
    return options
}
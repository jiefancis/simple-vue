import { createElement } from '../vdom/create-element'
import { mergeOptions } from '../utils/options'
import { initLifecycle } from './lifecycle'

export function initMixin(Vue) {
    // 初始化vm实例
    Vue.prototype._init = function(options) {
        const vm = this
        // options添加到当前vm实例上，执行Vue原型方法或者传递vm实例就可以访问组件对象的选项式配置（options）
        
        if(options?._isComponent) {
            // 组件initInternalComponent 只是做了简单一层对象赋值，并不涉及到递归、合并策略等复杂逻辑。
            initInternalComponent(vm, options)
        } else {
            // 选项合并
            vm.$options = mergeOptions(
                resolveConstructorOptions(vm.constructor), // Vue.options
                options || {},
                vm
            )
        }
        
        initLifecycle(vm)
        // render函数的 ( h ) 参数
        vm.$createElement = createElement.bind(vm)

        if(options.el) {
            // 挂载的容器
            vm.$mount(options.el)
        }
    }
}

function initInternalComponent(vm, options) {
    // vm.constructor.options是Sub.options，Sub.options的定义在Vue.extend函数
    // vm.$options上属性的访问具有了原型链的特性
    let opts = vm.$options = Object.create(vm.constructor.options)

    const parentVnode = options._parentVnpde
    opts.parent = options.parent
    opts._parentVnode = parentVnode
    
    // 组件vnode.componentOptions定义在createComponent.js函数
    const vnodeComponentOptions = parentVnode.componentOptions
    opts.propsData = vnodeComponentOptions.propsData

    // initEvents中将父组件的事件，在子组件的vm._events
    opts._parentListeners = vnodeComponentOptions.listeners
    opts._renderChildren = vnodeComponentOptions.children
    opts._componentTag = vnodeComponentOptions.tag
}

function resolveConstructorOptions(Ctor) {
    const options = Ctor.options
    
    return options
}
import { query } from '../utils'
import { Watcher } from '../observer/watcher'
import { patch } from '../vdom/patch'

export let activeInstance = null
function setActiveInstance(vm) {
    activeInstance = vm
}

export function initLifecycle(vm) {
    const options = vm.$options
    const parent = options.parent
    // 在组件中this.$parent访问父组件
    vm.$parent = parent
    // 在组件中this.$parent访问根组件
    vm.$root = parent ? parent.$root : vm
}
export function lifecycleMixin(Vue) {
    Vue.prototype._update = function(vnode) {
        const vm = this
        setActiveInstance(vm)
        const prevVnode = vm._vnode;
        // 挂载
        if(!prevVNode) {
            vm.$el = patch(vm.$el, vnode)
        } else {
            // 更新
            vm.$el = patch(prevVnode, vnode)
        }
        
        // 保存当前vnode tree，用于比较。
        vm._vnode = vnode
        setActiveInstance(null)
    }

    // new Vue.$mount(options.el)
    Vue.prototype.$mount = function(el) {
        el = query(el)
        return mountComponent(this, el)
    }
}

export function mountComponent(vm, el) {
    // this.$el,组件的根元素
    vm.$el = el
    // 执行组件的beforeMount钩子
    // 实际上是从vm中读取beforeMount钩子函数，执行时做好是数组还是函数的处理
    callHook(vm, 'beforeMount')
    function updateComponent(vm, el) {
        // watcher中使用call实现this指向vm实例
        vm._update(vm._render())
    }
    // 执行update，挂载（更新）组件，数据的响应式触发时，此时的watcher是render watcher。
    // 页面中的数据都收集了render watcher，当数据变化时，触发render watcher实现页面更新。
    new Watcher(vm, updateComponent)
    callHook(vm, 'mounted')
}

export function callHook(vm, hook) {
    let handlers = vm.$options[hook]
    if(Array.isArray(handlers)) {
        handlers.forEach(handler => {
            handler.call(vm)
        })
    } else {
        handlers.call(vm)
    }
}
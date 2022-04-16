import { query } from '../utils'
import { Watcher } from '../observer/watcher'

export function lifecycleMixin(Vue) {
    Vue.prototype._update = function(vnode) {
        const vm = this
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
    }

    // new Vue.$mount(options.el)
    Vue.prototype.$mount = function(el) {
        el = query(el)
        return mountComponent(this, el)
    }
}

export function mountComponent(vm, el) {
    // this.$el组件的根元素
    vm.$el = el
    function updateComponent(vm, el) {
        // watcher中使用call实现this指向vm实例
        this._update(this._render())
    }

    new Watcher(vm, updateComponent)
}
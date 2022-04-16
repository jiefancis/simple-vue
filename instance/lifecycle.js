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
    }
}
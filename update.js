
// 挂载还是更新
Vue.prototype._update = function(vnode) {
    // 当前实例
    const vm = this
    // 当前实例对应的真实dom元素
    const prevEl = vm.$el;
    // 当前视图所对应的久的vnode tree
    const prevVnode = vm._vnode

    // 更新为最新的vnode tree
    vm._vnode = vnode

    if(!prevVnode) {
        // 挂载
        vm.$el = vm.__patch__(vm.$el, vnode)
    } else {
        // 更新
        vm.$el = vm.__patch__(prevVnode, vnode)
    }
}
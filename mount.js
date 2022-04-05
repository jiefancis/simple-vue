


Vue.prototype.$mount = function(el) {
    el = query(el)
    // new Vue().$mount()，这里this表示当前vm实例
    return mountComponent(this, el)
}


function mountComponent(vm, el) {
    // 当前vm实例上$el是真实dom元素
    vm.$el = el

    callHook(vm, 'beforeMount')
    let updateComponent = () => {
        vm._update(vm._render())
    }
    // 更新effect，触发updateComponent渲染视图时，视图中使用到的数据都会收集当前updateComponent，以此实现视图中使用到的数据发生改变后
    // 触发视图更新
    new Watcher(vm, updateComponent)

    callHook(vm, 'mounted')
}
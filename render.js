
// 执行组件中的render函数，返回vnode tree
Vue.prototype._render = function() {
    // 每个实例都可以通过 vm._render的方式调用_render
    const vm = this

    // 每个组件在编译后或者本身自己都会写render方法（export default options）
    let { render } = vm.$options

    // vm._init中调用initRender，给当前Vue实例注册$createElement
    let vnode = render.call(vm, vm.$createElement)
    return vnode
}
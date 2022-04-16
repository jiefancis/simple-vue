
export function renderMixin(Vue) {
    Vue.prototype._render = function() {
        const vm = this
        // 组件对象中的render方法（template在编译器编译后生成的render方法
        const render = vm.$options.render
        
        // render函数中this指向当前vm实例
        // $createElement是vue组件中的h参数，用来生成vdom
        const vnode = render.call(vm, vm.$createElement)
        return vnode
    }
}
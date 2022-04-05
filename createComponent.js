/**
 * render()对组件的vnode处理
 */


const componentVNodeHooks = {
    init(vnode) {
        const child = vnode.componentInstance = createComponentInstanceForVnode(
            vnode,
            activeInstance
        )
        child.$mount(vnode.elm)
    }
}

function installComponentHooks(data) {
    data.hook = data.hook || {}
    data.hook.init = copmonentVNodeHooks.init
}

// Vue.extend(Ctor)构造子构造函数
// 组件中挂载init方法，用于组件初始化挂载的操作
// 返回组件vnode
function createComponent(Ctor, data, context, children, children) {
    // 使用Vue.extend(Ctor)创建子组件构造函数
    let baseCtor = context.$options._base
    if(Ctor) {
        Ctor = baseCtor.extend(Ctor)
    }
    
    installComponentHooks(data)
    
    const vnode = new VNode(
        `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
        data, undefined, undefined, undefined, context,
        { Ctor, propsData, listeners, tag, children },
        asyncFactory
      )
    
    return vnode
}

// 调用new Vue操作初始化vue实例
function createComponentInstanceForVnode(vnode, parent) {

    let options = {
        _isComponent: true,
        parent,
        render
    }

    // Ctor是Vue根实例的子构造函数
    return new vnode.componentOptions.Ctor(options)
}
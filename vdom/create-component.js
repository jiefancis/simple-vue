import { isObject } from "../utils";
import { VNode } from './vnode'
import { activeInstance } from '../instance/lifecycle'

function installComponentHooks(data) {
    if(!data.hook) {
        data.hook = {}
    }
    // 初始化子组件初始化挂载的操作
    data.hook.init = function(vnode) {
        const child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance)
        child.$mount(vnode.elm)
    }
} 

// parent父组件实例vm，子组件的provide则是通过vm.$parent的方式向上查找父组件的provide
// $parent在initLifecycle函数中初始化为vm.$options.parent

function createComponentInstanceForVnode(vnode, parent) {
    const options = {
        _isComponent: true,
        parentNode: vnode,
        parent,
        render: function() {
            console.log('如果组件没有render方法，编译器会将template编译后的render方法添加到options对象中')
            return new VNode()
        }
    }
    
    // new Vue()
    return new vnode.componentOptions.Ctor(options)
}


export default function createComponent(
    Ctor,
    data,
    children,
    context,
    tag
) {
    let baseCtor = Ctor.$options._base // Vue
    // Vue.extend
    if(isObject(Ctor)) {
        Ctor = baseCtor.extend(Ctor)
    }
    installComponentHooks(data)

    let vnode = new VNode(
        `vue-component-${uuid()}`,
        data, undefined, undefined, undefined, context,
        { Ctor ,children, tag}
    )
    return vnode
}
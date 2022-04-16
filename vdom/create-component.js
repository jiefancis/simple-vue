import { isObject } from "../utils";

function installComponentHooks(data) {
    if(!data.hook) {
        data.hook = {}
    }
    // 初始化子组件初始化挂载的操作
    data.hook.init = function(vnode) {
        const child = vnode.componentInstance = createComponentInstanceForVnode(vnode)
        child.$mount(vnode.elm)
    }
} 

function createComponentInstanceForVnode(vnode) {
    // const options = {
    //     _isComponent: true,
    //     parentNode: vnode
    // }
    
    // new Vue()
    return new vnode.componentOptions.Ctor()
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
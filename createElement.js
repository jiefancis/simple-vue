/**
 * render函数中的 h / createElement 参数的定义
 */
import { createComponent } from './createComponent'

// render函数中传入的 h / createElement参数
export function createElement(context, tag, data, children) {
    return _createElement(context, tag, data, children)
}

// 对组件与普通html元素处理
// 返回vnode tree
function _createElement(context, tag, data, children) {
    if(tag === 'string') {
        let vnode
        // 普通html标签
        
        // 组件
        let Ctor
        // Vue.components会在Vue.$options.components根实例上创建id->definition的关系
        if(Ctor = resolveAsset(context.$options, 'component', tag)) {
            vnode = createComponent(Ctor, data, context, children, tag)
        }

        return vnode
    }
}
// 解析资源
function resolveAsset(options, prop, name) {
    return options[prop][name]
}
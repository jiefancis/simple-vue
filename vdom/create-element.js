import { createComponent } from './create-component'
import { resoveAsset } from '../utils/options'
/**
 * 
 * @param {*} tag      标签
 * @param {*} data     属性等数据
 * @param {*} children 子元素
 * @return vnode
 */
// （.vue文件）render渲染函数的参数，校验用户的输入保证参数的规范
// 返回组件vnode数据模型
export function createElement(context, tag, data, children) {
    let vnode
    if(typeof tag === 'string') {
        let Ctor
        // 如果是局部 / 全局组件
        if( Ctor = resoveAsset(context.$options, 'components', tag) ) {
            // Vue.extend 
            Ctor = createComponent(Ctor, data, children, context, tag)
        } else {
            // 普通html标签
            vnode = new VNode(tag, data, children, undefined, undefined, context)
        }
        return vnode
    } else {
        // new Vue({ render: h => h(App)})此时tag是App组件
        Ctor = createComponent(tag, data, children, context)
    }
}
export default class VNode {
    constructor(
        tag,
        data,
        children,
        text,
        elm,
        context,
        componentOptions,
        componentInstance
    ) {
        // 标签名，html标签或者是组件名
        this.tag = tag 
        // 元素属性等数据
        this.data = data
        // 子元素
        this.children =children
        // 文本节点的文本内容
        this.text = text
        // vnode对应的真实的dom元素
        this.elm = elm
        this.context = context
        // 子组件的组件选项
        this.componentOptions = componentOptions
        this.componentInstance = componentInstance
    }
}
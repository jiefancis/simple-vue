
export function initState(Vue) {
    Object.defineProperty(Vue.prototype, '$data', {
        get() {
            // 在_init中，给vm实例定义一个_data属性，值为组件data的返回值
            // 每个组件都有自己的vm实例，vm.$data时返回组件自身的data对象
            return this._data
        }
    })
    Object.defineProperty(Vue.prototype, '$props', {
        get() {
            // 在_init中，给vm实例定义一个_props属性，值为组件props的返回值
            // 每个组件都有自己的vm实例，vm.$props时返回组件自身的data对象
            return this._props
        }
    })
}
import { ASSET_TYPES } from '../utils/constants'
import { mergeOptions } from '../utils/options'

export default function initExtend(Vue) {
    Vue.extend = function(extendOptions) {
        let Super = this

        // 构造Vue子类
        function Sub(options) {
            this._init(options)
        }
        Sub.prototype = Object.create(Super.prototype)
        Sub.prototype.constructor = Sub

        // 选项合并，将Vue.options和extendOptions合并
        Sub.options = mergeOptions(
            Super.options,
            extendOptions
        )
        
        Sub.super = Super
        
        // 全局API
        Sub.use = Super.use
        Sub.mixin = Super.mixin
        Sub.extend = Super.extend
        ASSET_TYPES.forEach(prop => {
            // 将Vue的静态属性添加到子类上
            Sub[prop] = Super[prop]
        })
        
        
        Sub.superOptions = Super.options
        Sub.extendOptions = extendOptions
        Sub.sealedOptions = Object.assign({}, Sub.options)
        return Sub
    }
}
import { ASSET_TYPES } from '../utils/constants'

export default function initExtend(Vue) {
    Vue.extend = function(options) {
        let Super = this

        // 构造Vue子类
        function Sub() {
            this._init(options)
        }
        Sub.prototype = Object.create(Super.prototype)
        Sub.prototype.constructor = Sub
        Sub.options = options
        
        Sub.super = Super
        // 将Vue的静态属性添加到子类上
        ASSET_TYPES.forEach(prop => {
            Sub[prop] = Super(prop)
        })
        return Sub
    }
}
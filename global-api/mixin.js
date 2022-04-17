import { mergeOptions } from '../utils/options'

export default function initMixin(Vue) {
    Vue.mixin = function(mixin) {
        this.options = mergeOptions(this.options, mixin)
        return this
    }
}
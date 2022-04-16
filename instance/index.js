import { initMixin } from './init'
import { stateMixin } from './state'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { renderMixin } from './render'

function Vue(options) {
   this._init(options)
}

// 以下mixin均是在Vue.prototype对象上定义对应的方法

// this._init 
initMixin(Vue)
// this.$data this.$props
stateMixin(Vue)
// this.$on $once $off $emit
eventsMixin(Vue)
// _update $foreUpdate $destroy
lifecycleMixin(Vue)
// _render $nextTick
renderMixin(Vue)


export default Vue
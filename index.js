import { initRender } from "./init"

function Vue(options) {
    this._init(options)
}

Vue.prototype._init = function(options) {
    initRender(vm)
    vm.$options = options
    
    if(options.el) {
        vm.$mount(options.el)
    }
}

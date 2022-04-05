import { initRender } from "./init"

function Vue(options) {
    this._init(options)
}

Vue.prototype._init = function(options) {
    initRender(vm)

    if(options.el) {
        vm.$mount(options.el)
    }
}

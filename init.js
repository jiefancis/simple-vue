
import { createElement } from './createElement'
// vm挂载$createElement
export function initRender(vm) {
    vm.$createElement = createElement.bind(vm)
}
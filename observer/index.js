
import { isObject } from '../utils'

function observer(o) {
    if(isObject(o)) {
        Object.keys(o).forEach(key => {
            defineReactive(target, key, o[key])
        })
    }
}

function defineReactive(target, key, value) {
    let dep = new Dep()
    if(Array.isArray(value)) {

    } else {
        Object.defineProperties(target,  key, {
            get() {
                dep.depend()
                return value
            },
            set(newVal) {
                target[key] = newVal
                dep.notice()
            }
        })
    }
}
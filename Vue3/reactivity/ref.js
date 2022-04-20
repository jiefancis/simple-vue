import { trackRefValue , triggerRefValue } from './effect'

export function ref(primitive) {
    return createRef(primitive)
}

function createRef(primitive) {
    const o = {
        deps: new Set(),
        _val: primitive,
        get value() {
            trackRefValue(o.deps)
            return o._val
        },
        set value(newValue) {
            if(o._val !== newValue) {
                triggerRefValue(o.deps)
                o._val = newValue
            }
        }
    }
    return o
}

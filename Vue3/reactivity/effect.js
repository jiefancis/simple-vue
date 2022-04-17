
let activeEffect = null
const targetMap = new WeakMap()

class ReactiveEffect{
    construtor(fn) {
       this.fn = fn
    }
    run() {
        activeEffect = this
        this.fn()
        activeEffect = null
    }
}

export function effect(fn) {
    let effect = new ReactiveEffect(fn)
    effect.run()
}

// 以（源）对象为模板创建一个对象，访问的属性对应的是set集合，收集跟这个属性有关的依赖
function getDeps(target, key) {
    let depsMap = targetMap.get(target)
    if(!depsMap) {
        depsMap = new Map()
        targetMap.set(target, depsMap)
    }
    let deps = depsMap.get(key)
    if(!deps) {
        // set可以避免重复收集同一个依赖
        deps = new Set()
        depsMap.set(key, deps)
    }
    return deps
}
// 收集依赖
export function track(target, key) {
    let deps = getDeps(target,key)
    if(activeEffect) {
        deps.add(activeEffect)
    }
}

// 触发依赖
export function trigger(target, key) {
    let deps = getDeps(target, key)
    deps.forEach(effect => effect.run())
}

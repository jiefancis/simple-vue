

// vue3响应性使用Proxy进行代理，优点有：
// 1、对对象数据的访问是lazy，提高性能（vue2是一开始就将数据全部劫持）
// 2、无须深层遍历对象及对数组额外处理

import { track } from './effect'

const targetMap = new WeakMap()

function getDeps(target, key) {
    let depsMap = targetMap.get(target)
    if(!depsMap) {
        targetMap.set(target, depsMap = new Map())
    }
    let deps = depsMap.get(key)
    if(!deps) {
        depsMap.set(key, deps = new Set())
    }
    return deps
}

function reactive(o) {
    let state = new Proxy(o, {
        get(target, key, receiver) {
            // 收集依赖
            let deps = getDeps(target, key)
            // 将deps传入dep中添加当前活跃（等待收集）的依赖
            track(deps)

            // 返回结果
            return Reflect.get(target, key)
        },
        set(target, key, newValue, receiver) {
            // 更新值
            Reflect.set(target, key, newValue)
            // 触发依赖
            let deps = getDeps(target, key)
            trigger(deps)
            
        }
    })
    return state
}
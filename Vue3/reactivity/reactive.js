import { track, trigger } from './effect'
// 数据代理，通过代理对象访问源对象
export default function reactive(o) {
    return new Proxy(o, {
        get(target, key, receiver) {
            // 取值
            let value = Reflect.get(target, key)

            // 收集依赖
            track(target, key)
            return value
        },

        set(target, key, newValue, receiver){
            let oldValue = Reflect.get(target, key)
            if(oldValue !== newValue) {
                // 更新值
                Reflect.set(target, key, newValue)
            }
            // 触发依赖
            trigger(target, key)
        }
    })
}
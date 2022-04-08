
import { isObject } from '../utils'
import { ArrayMethods } from './array'
import Dep from './dep'
export function observer(o) {
    if(o) {
        if(Array.isArray(o)) {
            // 原型继承（不考虑兼容性，以谷歌浏览器为主）
            o.__proto__ = ArrayMethods
            // 遍历数组内部，元素是对象类型则继续劫持
            o.forEach(observer)
        } else if(typeof o === 'object') {
            Object.keys(o).forEach(key => {
                defineReactive(o, key, o[key])
            })
        }
    }
}

function defineReactive(target, key, value) {
    let descriptor = Object.getOwnPropertyDescriptor(target, key)
    let getter = descriptor?.get
    let setter = descriptor?.set
    // 每一个数据有自己的依赖收集器
    let dep = new Dep()
    
    // 不能改变的属性不进行数据劫持
    if(!descriptor?.configurable){
        return
    }
    // 第一次劫持getter 跟 setter均为undefined，为避免求值出错，先求值
    if((!getter || setter)){
        value = target[key]
    }
    // 深层递归劫持
    observer(value)

    Object.defineProperty(target, key, {
        get() {
            // 收集依赖
            if(Dep.target){
                dep.addDep(Dep.target)
            }
            console.log(target, key, value)
            // 返回结果
            return getter ? getter.call(target) : value
        },
        set(newVal) {
            // 更新数据
            if(setter) {
                setter.call(obj, newVal)
            } else {
                value = newVal
            }

            // 触发依赖
            dep.notify()
        }
    })
}
// example
var p = [{
    a:{
        b: {
            c:1
        }
    },
    b:2
},1,2,[1]]
observer(p)
p.push({d:6})
let d = p.pop()
d.d
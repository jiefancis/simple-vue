
import { LIFECYCLE_HOOKS } from './constants'
import { extend, hasOwn } from './index'
import { defineReactive } from '../observer/index'

const stats = {}

// 定义生命周期的选项合并策略
LIFECYCLE_HOOKS.forEach(hook => {
    stats[hook] = mergeHook
})

/**
 * 生命周期钩子合并为一个数组，格式如下：
 * {
 *  beforeCreate: [],
 *  created: []
 * }
 */
function mergeHook(parentVal, childVal) {
    return childVal ?
             parentVal ?
               parentVal.concat(childVal)
             : Array.isArray(childVal) ?
                 childVal : [childVal]
           : parentVal
}

// 重复属性以组件内部优先
stats.methods =
stats.inject =
stats.props =
stats.computed = function(parentVal, childVal) {
    let options = Object.create(parentVal)
    if(childVal) {
        extend(options, childVal)
    }
    return options
}

// data是一个函数（这里不考虑用户传入对象的情况），选项合并策略中缓存外部与内部的数据对象，等到initState(vm)时再合并
// 同理，provide也是
stats.provide = mergeDataOrFn
stats.data = mergeDataOrFn
function mergeDataOrFn(parentVal, childVal, vm) {
    return function() {
                           // 判断页面中的data是否是一个函数？这里按组件的data都是函数处理
        let instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
        let defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : parentVal;

        if(instanceData) {
            return mergeData(instanceData, defualtData)
        }
        return defaultData
    }
}
function mergeData(to, from) {
    for(let key in Object.keys(from)) {
        // 找出子类没有的key添加即可，父子均有的属性以子为准。
        let fromValue = from[key]
        let toValue = to[key]
        if(!hasOwn(to, key)) {
            to[key] = fromValue
            // 添加的数据赋予双向绑定
            defineReactive(to, key, fromValue)
        } else if(
            toValue !== fromValue &&
            isPlainObject(toValue) &&
            isPlainObject(fromValue)
        ) {
            // 深层遍历合并
            mergeData(toValue, fromValue)
        }
    }
}


// 选项式合并
// data methods props computed的合并是组件优先于外部mixin的选项
// lifecycle等生命周期的合并是合并为一个数组
export function mergeOptions(parent, child, vm) {
    let options = {}

    for(let key in parent) {
        mergeField(key)
    }
    for(let key in child) {
        if(!parent.hasOwnProperty(key)) {
            mergeField(key)
        }
    }
    function mergeField(key) {
        const stat = stats[key] // 策略模式
        options[key] = stat(parent[key], child[key])
    }
    return options
}


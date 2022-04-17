
import { LIFECYCLE_HOOKS } from './constants'
import { extend } from './index'

const stats = {}

// 定义生命周期的选项合并策略
LIFECYCLE_HOOKS.forEach(hook => {
    stats[hook] = mergeHook
})
// 生命周期钩子合并为一个数组
/**
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
stats.computed =
function(parentVal, childVal) {
    let options = {}
    if(parentVal) {
        extend(options, parentVal)
    }
    if(childVal) {
        extend(options, childVal)
    }
    return options
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
        const stat = stats[key]
        options[key] = stat(parent[key], child[key])
    }
    return options
}


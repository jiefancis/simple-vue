import { observer } from "."


// 对数组中新增的数据进行劫持，赋予响应性
// 但是其它plain object则只能先定义好才能具备响应性（后面通过this.$set弥补这个弊端）
// let o = p.pop()弹出object，o依然具有响应性
var methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]

var ArrayPrototype = Array.prototype
var ArrayMethods = Object.create(ArrayPrototype)

methods.forEach(method => {
    let original = ArrayPrototype[method]
    Object.defineProperty(ArrayMethods, method, {
        configurable: true,
        writable: true,
        value: function(...args) {
            let result = original.apply(this, args)
            let inserted
            switch(method) {
                case 'push':
                case 'unshift':
                    inserted = args;
                    break;
                case 'splice':
                    inserted = args.slice(2)
                    break; 
            }
            // 插入的值可能会对象，基本数据或者是数组，需要赋给这些数据响应式
            // 响应式主要的工作就是给对应数据收集依赖，在更新数据时触发依赖，在这里不用关心新增的数据与原数组。
            if(inserted) observer(inserted)

            return result
        }
    })
})







  
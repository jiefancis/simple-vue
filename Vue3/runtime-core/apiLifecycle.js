import { currentInstance } from './component'
// 给当前组件实例添加事件钩子
export function injectHook(
    type,
    hook,
    target
) {
  // 在当前组件实例上注册事件钩子
   const hooks = target[type] || (target[type] = [])
   const wrappedHook =
      hook.__weh ||
      (hook.__weh = (...args) => {
        if (target.isUnmounted) {
          return
        }
        // 执行用户传入的事件钩子
        const res = args ? hook(...args) : hook()
        return res
      })
    if (prepend) {
      hooks.unshift(wrappedHook)
    } else {
      hooks.push(wrappedHook)
    }
    return wrappedHook

}

function createHook(lifecycle) {
    return function(hook, target = currentInstance) {
        inject(lifecycle, hook, target)
    }
}

/**
 * 所以我们前端在开发的时候调用生命周期钩子的方式则是：onMounted(() => {})
 */
export const onMounted = createHook('m')


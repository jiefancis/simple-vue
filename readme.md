## 双向数据绑定有两个核心点：收集与触发。在合适的时机收集，收集的是watcher

## vue2中watcher有三种：computed watch render，意味着要收集的只有这三种watcher

## 收集watcher前需要将当前watcher标记为待收集状态（new Watcher -> pushTarget）

## vue-router如何实现路由变化与视图响应式更新关联？
> VueRouter.install种将 vm._route 定义为响应式  
> router-view组件中访问$route （返回_route）触发依赖收集，此时是updateComponent触发设置了watcher阶段  
> router.push等api变化最后会触发 app._route = newRoute的操作触发依赖更新  

## vuex如何实现响应式？

1. new Vue({ data: options.state})

2. 在页面渲染过程中，当访问到store的数据，触发依赖收集，将new Watcher(vm, updateComponent)收集到数据中，等待数据发生改变触发依赖更新

## 组件如何处理？在何时接入？

1. render中h函数会优先解析组件Ctor，Vue.extend(Ctor)将Ctor设置为继承Vue的子实例构造函数

2. 将组件vnode.data.hook添加 init函数，该函数中会执行new Vue().$mount操作实现挂载

3. 创建vnode并返回

4.组件的处理在patch中，createElm()每一个vnode都会判断是否是组件，是则走组件初始化挂载流程

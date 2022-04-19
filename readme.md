实现一个mini-Vue
=============

### vue2和vue3

-  vue2是面向对象，所有的模块都为这个组件实例服务，并且将各种api和属性挂载在实例上，页面中开发者通过this拿到组件实例

-  vue3函数式编程，vue3则是在框架内部维护一个组件对象，不对外暴露[简单实现](https://github.com/jiefancis/simple-vue/blob/master/Vue3/demo.js)

### 虽然vue3已经慢慢普及了，还是把vue2的实现细节看了看，深入了解以下问题：

- 双向绑定对于数组与普通对象的处理有什么不同？
- 多个数据或者一个数据被多次更新，会立马更新视图吗？
- vue2父子组件通信中子组件如何获取到父组件传递的props？
- 子组件如何实现$emit的事件中的this指向父组件？
- vue的全局api（Vue.extend Vue.use Vue.mixin Vue.component）注册后如何实现全局都可使用？
- 三种watcher（computed watch render）分别在什么时候实例化以确保数据能收集到正确的watcher？
- provide和inject如何实现深层传递？
- 全（局）子组件的处理有什么不同？
- render(h)的h函数中如何区分tag和component？

### Vue框架的核心
-  响应系统

-  编译器

-  渲染器

-  组件化  


### 响应系统
- watcher分类
  - computed watcher
  - watch watcher   
  - render watcher  

- 依赖收集与触发
  - 确保每个数据都有自已的依赖收集器dep，在合适的时机收集依赖。

  - 收集watcher前需要将当前watcher标记为待收集状态（new Watcher() -> pushTarget）


### 组件化

-  单文件组件中js部分里的export default导出的是组件对象
   - 单文件组件template被编译器编译并生成render函数，将render函数赋值到组件对象中  

-  Vdom如何描述组件？
   - 执行（父）组件的render函数生成组件vdom的过程中，vue在解析到（子）组件标签时，首先取得注册的子组件对象Ctor，并通过Vue.extend(Ctor)将Ctor构造成原型对象为Vue的构造函数

   - 在组件data.hook对象添加 init函数，init函数实现组件的初始化和挂载操作（即new Vue().$mount()）

   - 创建vnode并返回，vnode中componentOptions属性包含组件的构造函数等参数

-  子组件在父组件的哪个生命周期中执行挂载(更新)？

   - 在patch挂载中，createElm挂载前会判断当前vnode是否是组件？判断依据为当前vnode数据的data.hook.init是否存在？是则执行init()操作，对组件进行初始化及挂载操作；此时父组件处在beforeMount阶段

   - 因此，父子组件的生命周期执行顺序为父beforeCreate -> 父created -> 父beforeMount -> 子beforeCreated -> 子created -> 子beforeMount -> 子mounted -> 父mounted

### 父子组件

-  事件
   -  vm实例内部维护一个属性：_events，当通过vm.$on(name, fn)注册事件时，vm_events内部维护一个数组，（vm._events[name] = [fn]）

-  provide与inject
   -  遍历子组件的inject，如果在子组件中找不到对应的属性，vm.$parent访问父组件查找

-  props与$emit如何访问到父组件的数据？
   - self是父组件vm实例
   - self.$emit，此时self是父组件，input事件保存在子组件input内部，在$emit触发时，input内部vm是父组件，因此确保了input事件正确执行

```
props: ['value'],
render: function (createElement) {
  var self = this
  return createElement('input', {
    domProps: {
      value: self.value
    },
    on: {
      input: function (event) {
        self.$emit('input', event.target.value)
      }
    }
  })
}
```

### vue-router如何实现路由变化与视图响应式更新关联？
- VueRouter.install种将 $route、_route 赋予响应式  

- router-view组件中访问$route （返回_route）触发依赖收集并收集到render watcher，这个阶段watcher为render watcher。

- router.push等api变化最后会触发 app._route = newRoute的操作触发依赖更新  


### vuex如何实现响应式？

-  Store.state赋值为响应式（new Vue({ data: Store.state})）

- 在页面渲染过程中，当访问到store的数据，触发依赖收集（此时是render watcher），将new Watcher(vm, updateComponent)收集到数据中，等待数据发生改变触发依赖更新



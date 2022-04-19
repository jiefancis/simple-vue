import { pushTarget } from './dep'
import { queueWatcher } from './watcher'


class Watcher{
    constructor(
        vm,
        getter,
        options
    ) {
        if(options) {
            this.before = options.before
        }
        this.vm = vm
        this.getter = getter
        // 执行getter，先收集一次依赖
        this.get()
    }
    get() {
        // 将watcher置为代收集依赖的目标
        pushTarget(this)
        try{
            // 执行getter，访问数据，触发数据的get操作，收集依赖
            this.getter.call(this.vm, this.vm)
        } catch(e) {
            console.warn(`watcher get occur error: ${e}`)
        } 
        // 置空当前依赖目标
        pushTarget()
    }
    update() {
        if(this.before) {
            queueWatcher(this)
        }
    }
}

export default Watcher


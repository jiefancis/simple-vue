
// 依赖
export default class Dep{
    constuctor(){
        // set可以避免重复添加同一个依赖
        this.subs = new Set()
    }

    addDep(dep) {
        this.subs.add(dep)
    }
    notify() {
        this.subs.forEach(dep => dep())
    }
}

export const pushTarget = (watcher) => {
    Dep.target = watcher
}

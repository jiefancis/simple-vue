

// 当前活跃的组件实例
export let currentInstance = null

export function setCurrentInstance(instance) {
    currentInstance = instance
}

export function getCurrentInstance() {
    return currentInstance
}

// 创建当前组件实例
export function createComponentInstance() {
    const instance = {
        isUnmounted: false, // 是否卸载
    }
    return instance
}




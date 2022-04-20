/**
 * 依靠对pinia的简单使用及对vue的理解，简单实现pinia
 */
var useStore = defineStore('abcdefg', {
    state: () => {
        return {
            count: 1
        }
    },
    actions: {
        a () {
            console.log('aaaaa')
        }        
    }
})
// app.use(createPinia())

var activeStore = null
function createPinia() {
    const pinia = activeStore ={
        install(app) {
        }
    }
    setActiveStore(pinia)
    return pinia
}
function setActiveStore(store) {
    activeStore = store
}


function defineStore(id, options) {
   let { state, getters, actions } = options
   return function() {
        if(activeStore[id]) {
           return activeStore[id]
        }
        let store = activeStore[id] = Object.create({
            ...state(),
            ...getters,
            ...actions
        })
        return reactive(store)
   }

}


function reactive(o) {
    return new Proxy(o, {
        get(target, key, receiver){
            let value = Reflect.get(target, key)
            console.log('target key', target, key, value)
            if(value && typeof value === 'object') {
                return reactive(value)
            }
            return value
        },
        set(target, key, newValue) {
            let value = Reflect.get(target, key)
            console.log('更新值', target, key, value, newValue)
            if(value !== newValue) {
                Reflect.set(target, key, newValue)
            }
        }
    })
}

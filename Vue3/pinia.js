/**
 * 依靠对pinia的简单使用及对vue的理解，简单实现pinia
 * 
 * 1. 实现访问getters的属性，执行该属性对应的函数并返回结果值（proxyRef）
 */
import { reactive } from './reactivity/reactive'
import { isFunction } from './utils'

var useStore = defineStore('abcdefg', {
    state: () => {
        return {
            sum: 1,
            count: 1
        }
    },
    getters: {
        ga: (state) => {
            console.log(state)
        },
        getCount: (state) => {
            return prop => state[prop]
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
        let stateObj = state()
        let getterFns = makeGetters(getters, stateObj)

        let store = activeStore[id] = Object.assign(
            getterFns,
            stateObj,
            actions
        )
        return store
   }
}

function makeGetters(getters, state) {
    let o = {}
    Object.keys(getters).forEach(key => {
        let value = getters[key]
        def(o, key, value, state)
    })
}

function def(target, key, value,state) {
    Object.defineProperty(target, key, {
        get() {
            return value(state)
        }
    })
}

var store = useStore()
console.log(store.count)

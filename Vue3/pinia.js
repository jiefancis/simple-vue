/**
 * 依靠对pinia的简单使用及对vue的理解，简单实现pinia
 */
import { reactive } from './reactivity/reactive'
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
        let store = activeStore[id] = reactive(Object.create({
            ...state(),
            ...getters,
            ...actions
        }))
        return store
   }

}

var store = useStore()
console.log(store.count)

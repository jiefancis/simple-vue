import { ASSET_TYPES }  from "../utils/constants"
import initExtend from './extend'
import registerAssets from './assets'

export default function initGlobalAPI(Vue) {

    // Vue构造函数，生成组件vnode tree过程中，使用Vue.extend将子组件构造为Vue的子类
    Vue.$options._base = Vue


    // Vue添加静态属性 Vue.component Vue.filter Vue.directive等函数
    Vue.options = Object.create(null)
    ASSET_TYPES.forEach(type => {
        Vue.options[type + 's'] = Object.create(null)
    })


    initExtend(Vue)
    registerAssets(Vue)

}
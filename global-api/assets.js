import { ASSET_TYPES } from '../utils/constants'

export default function registerAssets(Vue) {
    ASSET_TYPES.forEach(type => {
        Vue[type] = function(id, definition) {
            
            // Vue.component注册全局组件，构造Vue子类，Vue.options.components中添加组件索引表
            if(type === 'component') {
                definition = new this.$options._base(definition)
                this.options[type][id] = definition
            }
        }
    })
}
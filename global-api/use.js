
export function initUse(Vue) {
    Vue.use = function(plugin) {
        // 缓存，避免重复执行插件的install方法
        let _installedPlugins = this._installedPlugins || (this._installedPlugins = [])
        if(_installedPlugins.indexOf(plugin) > -1) {
            return
        }
        // 插件install时，可能会传入自定义的配置参数，vue.use保留了这些参数
        let args = Array.from(arguments).slice(1)
        // 确保插件的install方法的第一个参数是Vue这个构造函数
        args.unshift(this)
        if(typeof plugin.install === 'function') {
            // plugin.install.call(plugin, Vue) // 这种方式不支持use时传入自定义配置
            plugin.install.apply(plugin, args)
        } else {
            plugin.install.apply(plugin, args)
        }
        _installedPlugins.push(plugin)
        return this
    }
}
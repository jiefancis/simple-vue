
// vue-runtime
Vue.prorotype.__patch__ = createPatchFunction().patch


function createPatchFunction() {
    function createComponent(vnode, queue, parentElm, refElm) {
        let i = vnode.data
        // createComponent中对组件的vnode.data挂载了init函数初始化并$mount
        if((i = i.hook) && (i = i.init)) {
            i(vnode)
        }
        if(vnode.componentInstance) {
            // vue2中规定组件只能有一个根节点
            parentElm.appendChild(vnode.elm)
            return true
        }
    }

    // 对vnode tree进行挂载
    // 遇到子组件先挂载子组件
    // vnode挂载到parentElm下
    function createElm(vnode, insertedQueue, parentElm) {
        const children = vnode.children

        // 是组件就先处理组件
        // 父子组件的生命周期为父beforeCreate -> created -> beforeMount -> 子 beforeCreate -> created -> beforeMount -> 子mounted -> 父mounted
        if(createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
            return 
        }
        vnode.elm = document.createElement(vnode.tag)

        createChildren(vnode, children)
        parentElm.appendChild(vnode.elm)
    }
    function createChildren(vnode, children) {
        for(let i = 0; i< children.length; i++) {
            createElm(children[i], null, vnode.elm)
        }
    }

    // 创建一个带有真实dom元素的空节点
    function emptyNodeAt (elm) {
        return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
    }
    
    function patchVnode() {

    }
    
    return function patch(oldVnode, vnode) {
        // createElm挂载，组件vnode会走createComponent方法
        // createComponent中i(vnode)中只会创建vnode.elm
        // 组件的vnode.elm挂载发生在if(vnode.componentInstance)
        if(isUndef(oldVnode)) {
            createElm(vnode)
        }else {
            let isRealElement = oldVnode.nodeType
            // 都是vnode 且是相同节点
            if(!isRealElement && sameVnode(oldVnode, vnode)) {
                patchVnode(oldVnode, vnode)
            } else if(isRealElement) {
                // 如果是真实dom，创建包含真实dom的vnode对象
                oldVnode = emptyNodeAt(oldVanode)
            }
            // replacing existing element
            const oldElm = oldVnode.elm
            const parentElm = nodeOps.parentNode(oldElm)

            createElm(
                vnode,
                null,
                parentElm
            )
        }
    }
}


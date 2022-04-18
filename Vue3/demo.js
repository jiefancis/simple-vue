function ref(val) {
    return new RefImpl(val)
}
function RefImpl(val) {
    let o = {
        _val: val,
        effects: new Set(),
        get value() {
            if (activeEffect) {
                o.effects.add(activeEffect)
            }
            return o._val
        },
        set value(newVal) {
            o._val = newVal
            o.effects.forEach(effect => effect())
        }
    }

    return o

}
var renderer = null
var activeEffect = null
var currentInstance = null

function createRenderer() {
    return {
        render: function (vnode, container) {
            let vm = currentInstance
            if (!currentInstance) {
                vm = currentInstance = vnode
            }
            console.log('render vnode tree', vm)
            let prevVnode = vm._vnode
            updateComponent(prevVnode, vnode, container)
        }
    }
}
function isRealElement(el) {
    return el.nodeType
}
function updateComponent(n1, n2, container) {
    console.log('render vnode tree', n2)
    container = isRealElement(container) ? container : document.querySelector(container) ? document.querySelector(container): document.body
    patch(n1, n2, container)
}

function patch(n1, n2, container) {
    if (!n1) {
        createElm(n2, container)
    } else {
        patchVnode(n1, n2, container)
    }
}
function createElm(vnode, parentElm) {
    let elm = vnode.elm = document.createElement(vnode.tag)
    patchProps(vnode)
    if (Array.isArray(vnode.children)) {
        vnode.children.forEach(child => createElm(child, elm))
    } else {
        elm.innerHTML = vnode.children
    }
    parentElm.appendChild(elm)
}
function patchProps(vnode) {
    let { props, elm } = vnode
    Object.entries(props).forEach(([prop, value]) => {
        if (/^on/.test(prop)) {
            let name = prop.slice(2).toLowerCase()
            elm.addEventListener(name, value)
        } else {
            elm.removeEventListener(name, value)
        }
    })
}
function patchVnode(n1, n2, container) {
    let elm = n2.elm = n1.elm;
}
var renderer = renderer || createRenderer()
function effect(fn) {
    activeEffect = fn
    fn()
}
var bol = ref(true)
effect(() => {
    const vnode = {
        tag: 'div',
        props: bol.value ? {
            onClick: () => { console.log('父元素 click', bol.value) }
        } : {},
        children: [
            {
                tag: 'p',
                props: {
                    onClick: () => {
                        console.log('子元素 click', bol.value)
                        bol.value = false
                    }
                },
                children: 'toggle'
            }
        ]
    }
    renderer.render(vnode, '#app')
})


export function track(deps) {
    if(activeEffect) {
        deps.add(activeEffect)
    }
}
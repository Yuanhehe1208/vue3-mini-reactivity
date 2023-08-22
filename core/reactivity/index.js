/*
 * @Description: 响应式库
 */
let currentEffect;
// 依赖
class Dep {
    constructor(val) {
        this.effects = new Set()
        this._val = val
    }
    get value() {
        this.depend();
        return this._val
    }
    set value(newVal) {
        this._val = newVal
        this.notice()
    }

    // 依赖收集
    depend() {
        if(currentEffect) {
            this.effects.add(currentEffect)
        }
    }

    // 通知更新
    notice() {
        this.effects.forEach(effect => {
            effect()
        })
    }
}

export function effectWatch(effect) {
    // 依赖收集
    currentEffect = effect;
    effect()
    // 依赖收集完毕
    currentEffect = null;
}

const targetMap = new Map();
function getDep(target, key) {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        depsMap = new Map()
        targetMap.set(target, depsMap)
    }
    let dep = depsMap.get(key)
    if (!dep) {
        dep = new Dep()
        depsMap.set(key, dep)
    }
    return dep
}
export function reactive(raw) {
    return new Proxy(raw, {
        get(target, key) {
            // 一个 key 对应一个 dep
            // dep存储在哪里？
            const dep = getDep(target, key)
            dep.depend()
            return Reflect.get(target, key)
        },
        set(target,key,value) {
            const dep = getDep(target, key)
            const result = Reflect.set(target, key, value)
            dep.notice()
            return result
        }
    })
}
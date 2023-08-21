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

function effectWatch(effect) {
    // 依赖收集
    currentEffect = effect;
    effect()
    // 依赖收集完毕
    currentEffect = null;
}

// ref -> 很像了  在vue3 中 是这样监控一个基础类型的 ref(xx)
const dep = new Dep(10);

let b = 10
effectWatch(() => {
    b = dep.value + 10;
    console.log(b)
})

// 值发生变更
dep.value = 20;


/*
 * @Description: 
 */
import { effectWatch, reactive } from './core/reactivity/index.js'

let a = reactive({ name: 'a', age: 10 })

effectWatch(() => {
    console.log(a.name)
})

a.name = 'b'
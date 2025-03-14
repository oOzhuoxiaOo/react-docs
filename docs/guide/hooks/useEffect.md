# useEffect

`useEffect` 是react中处理 **副作用** 的钩子，除此之外还充当着生命周期的作用

## 副作用概念

函数的输入决定输出（可以是return，也可以是改变了外部环境数据等），如果遇到或者可能遇到不可预测的变化那就说明该函数内产生了副作用

不产生副作用的纯函数：



```ts
function sum(p1,p2){
    return p1 + p2
}
```



产生副作用的函数



```ts
let a = 1
function sum(p1,p2){
    return p1 + p2 + a
}
```

>
>
>为什么说该函数产生了副作用？
>
>因为该函数依赖外部状态，一旦外部状态发生改变，该函数的输出就是不可预测的

有哪些副作用场景？

1. 函数内请求接口（不可预知的）
2. 操作和获取dom
3. 函数依赖外部外部模块数据
   - 函数依赖本地存储（因为本地存储是可能在其他模块被更改的）
   - 依赖外部定义的变量等数据

## 使用方式



### 基本语法





```tsx
useEffect(setup, dependencies?)
```

**参数**

- `setup`：处理 Effect 的函数。setup 函数选择性返回一个 **清理（cleanup）** 函数。当组件被添加到 DOM 的时候，React 将运行 setup 函数。在每次依赖项变更重新渲染后，React 将首先使用旧值运行 cleanup 函数（如果你提供了该函数），然后使用新值运行 setup 函数。在组件从 DOM 中移除后，React 将最后一次运行 cleanup 函数。
- **可选** `dependencies`：`setup` 代码中引用的所有响应式值的列表。响应式值包括 props、state 以及所有直接在组件内部声明的变量和函数。如果你的代码检查工具 [配置了 React](https://zh-hans.react.dev/learn/editor-setup#linting)，那么它将验证是否每个响应式值都被正确地指定为一个依赖项。依赖项列表的元素数量必须是固定的，并且必须像 `[dep1, dep2, dep3]` 这样内联编写。React 将使用 [`Object.is`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is) 来比较每个依赖项和它先前的值。如果省略此参数，则在每次重新渲染组件之后，将重新运行 Effect 函数。如果你想了解更多，请参见 [传递依赖数组、空数组和不传递依赖项之间的区别](https://zh-hans.react.dev/reference/react/useEffect#examples-dependencies)。



### 返回值

undefined

## 充当生命周期

当依赖项为空数组时，副作用函数只在组件挂载后执行一次，清理函数只在组件卸载后执行一次



```tsx
function Home(){
    useEffect(()=>{
        return ()=>{}
    },[])
    return <div><div>
}
```



## 充当侦听器

当依赖项为 props、state 时

setup执行时机：组件挂载后执行一次、依赖项变化时执行一次

清理函数的执行时机：触发副作用函数前执行一次（使用旧值运行 cleanup 函数），组件卸载后执行一次





```tsx
function Home(){
    let [count,setCount] = useState(0)
    useEffect(()=>{
        return ()=>{}
    },[count])
    return <div><div>
}
```




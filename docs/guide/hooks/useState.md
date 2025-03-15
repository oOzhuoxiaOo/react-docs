# useState
`useState` 是一个 React Hook，它允许你向组件添加一个状态变量



>
>
>状态变量：可以理解为记忆变量，通过useState持久化存储一个数据，在组件更新时重新执行组件函数时，从useState的内部执行逻辑里能拿到新数据(上次setState时被持久化存储了)



>
>
>**useState 为什么必须在顶层被调用？**
>
>让我们先看一个案例，让我一步一步分析我对useState的设计的思考：
>
>
>
>```jsx
>function Home(){
>const [count,setCount] = useState(0)
>const [age,setAge] = useState(20)
>return <div><div>
>}
>```
>
>当组件第一次渲染时候，依次执行了Home里的两个useState，然后能分别拿到不同的状态数据
>
>❓然后我就有个疑惑，当组件再次渲染后，count等数据他不可能是再拿初始化数据作为值(那不就像普通变量数据一样了吗)，那是怎么可以获取到最新的数据的呢？
>
>一定有个地方将数据持久化存储了起来，是的，肯定是在useState内部做的 ✅
>
>❓为什么每次useState后，组件从新渲染后，能准确再次获取count和age呢？
>
>我能想到的是顺序。在一个组件内如果按照Hooks执行顺序存储起来这些Hooks，那再次执行组件函数后，不就能按顺序一一映射状态了吗。
>
>基于此，是不是说明react需要hooks按顺序调用，所以禁止让我们把hooks放入非顶层下使用呢，是的，如果放在条件语句中等里边的useState可能是不执行的，会对顺序造成了破坏✅
>
>







## 使用方法

```jsx
function Home(){
    const [keyword,setKeyword] = useState('')
    return (
        <div>
            {/* ✅ */}
            <input value={keyword} onChange={(e)=>setKeyword(e.target.value)} />
        </div>
    )
}
```

## 基本数据类型
直接`set(value)`即可
## 数组
1. 数组首部、末尾追加
```jsx
function Home(){
    const [state,setState] = useState([])
    setState([...state,5211314]) // ✅ 尾部追加
    // setState([5211314,...state]) // ✅ 首部追加
    return (
        <div>
          
        </div>
    )
}
```
2. 数组中间追加
```jsx
function Home(){
    const [state,setState] = useState([0,1,2,3,4])
    const addIndex = 2
    const addValue = 10
    setState([...state.slice(0,addIndex),addValue,...state.slice(addIndex)])
    return (
        <div>
          
        </div>
    )
}
```
3. 数组替换元素
```jsx
function Home(){
    const [state,setState] = useState([0,1,2,3,4])
    const updateValue = 2
    const resultValue = 10
    setState(state.map((item)=>{
        let result = item
        if(item === updateValue) {
            result = resultValue
        }
        return result
    }))
    return (
        <div>
        </div>
    )
}

```
4. 数组删除
使用filter过滤即可
```jsx
function Home(){
    const [state,setState] = useState([0,1,2,3,4])
    const delValue = 2
    setState(state.filter((item)=>{
        return item !== updateValue
    }))
    return (
        <div>
        </div>
    )
}

```
## 对象


```jsx
function Home(){
    const [state,setState] = useState({name:'xiana'})
    setState({...state,name:"bai"})
    return (
        <div>
          
        </div>
    )
}
```

## useState的更新机制

### 异步机制
set是异步的
```jsx
function Home(){
    const [count,setCount] = useState(0)
    function handleClick(){
        setCount(count + 1)
        console.log("count",count) // ✅ 比页面渲染的数小1（延迟）
    }
    return (
        <div>
          <button  onClick={handleClick}>按钮</button>
        </div>
    )
}
```
### 内部机制
当我们多次以相同的操作更新状态时
```jsx
import { useState } from "react"
function App() {
  let [index, setIndex] = useState(0)
  const heandleClick = () => {
    setIndex(index + 1) //1
    setIndex(index + 1) //1
    setIndex(index + 1) //1
    console.log(index,'index')
  }
  return (
    <>
       <h1>Index:{index}</h1>
      <button onClick={heandleClick}>更改值</button>
      
    </>
  )
}
export default App
```
结果是1并不是3，因为异步，setIndex(index + 1)的值是一样的，后续操作被屏蔽掉了，阻止了更新。

为了解决这个问题，你可以向setIndex 传递一个更新函数，而不是一个状态。

```jsx
import { useState } from "react"
function App() {
  let [index, setIndex] = useState(0)
  const heandleClick = () => {
    setIndex(index => index + 1) //1
    setIndex(index => index + 1) //2
    setIndex(index => index + 1) //3
  }
  return (
    <>
      <h1>Index:{index}</h1>
      <button onClick={heandleClick}>更改值</button>

    </>
  )
}
export default App
```
index => index + 1 将接收 0 作为待定状态，并返回 1 作为下一个状态。
index => index + 1 将接收 1 作为待定状态，并返回 2 作为下一个状态。
index => index + 1 将接收 2 作为待定状态，并返回 3 作为下一个状态。
现在没有其他排队的更新，因此 React 最终将存储 3 作为当前状态。

按照惯例，通常将待定状态参数命名为状态变量名称的第一个字母，例如 prevIndex 或者其他你觉得更清楚的名称。
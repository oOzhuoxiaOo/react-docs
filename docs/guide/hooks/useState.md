# useState
允许函数组件在内部管理状态

其实就是让我们用useState自己去实现双向绑定
> `更改的本质是不更改原始状态的情况下生成新的状态(新的引用对象)去覆盖他`

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
当我们多次以相同的操作更新状态时，React 会进行比较，如果值相同，则会屏蔽后续的更新行为。自带防抖的功能，防止频繁的更新。
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
结果是1并不是3，因为setIndex(index + 1)的值是一样的，后续操作被屏蔽掉了，阻止了更新。

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
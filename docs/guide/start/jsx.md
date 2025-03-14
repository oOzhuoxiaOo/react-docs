# JSX 语法入门
是html和js的混合语法，被多方框架(react、vue等)所采用

## JSX 规则

### 1.只能返回一个根元素
```jsx
function Home(){
    return (
        <div>
            <h1>只能返回一个根元素</h1>
        </div>
    )
}
export default Home
```

### 2.标签必须闭合
在 React（以及 JSX 语法）中，**所有的 HTML 标签和自定义组件标签都必须正确闭合**，否则会导致语法错误。这与 HTML 有所不同，因为 JSX 更接近于 XML 语法。  


#### 什么是“标签必须闭合”？
在传统 HTML 里，某些标签可以不闭合，例如：
```html
<input>
<img>
<br>
```
但是，在 **React（JSX）中，所有标签都必须正确闭合**，即使是那些**在 HTML 中可以省略闭合的标签**，也必须用**自闭合的方式 `/`**：
```jsx
<input />  ✅
<img />    ✅
<br />     ✅
```
**❌ 错误示例：**
```jsx
<input>    // ❌ 错误！必须写成 <input />
<img>      // ❌ 错误！必须写成 <img />
```

---


这是一种**强制规范**，有助于减少语法错误，让 JSX 代码更规范、更易读！ 🚀
### 3.属性的驼峰命名
js的变量命名规范中一个变量不允许存在`-`字符，而在html中属性是可以存在`-`的，但jsx最终会转为js，我们在jsx中所书写的属性会被转为对象的键值对，经常会遇到使用变量读取属性的场景，于是在react中就广泛采用驼峰命名方式（html属性、css属性）


## 状态绑定
> react中的状态可以理解为数据

使用大括号绑定状态
```jsx
function Home(){
    const [count,setCount] = useState(1)
    return (
        <div className={count && 'customClass'}>
            {/* ✅ */}
            {count}
        </div>
    )
}
```
## 条件语句
本质就是利用js动态控制标签存在与否
```jsx
function Home(){
    const [count,setCount] = useState(1)
    return (
        <div>
            {/* ✅ */}
            {count ? <h1>我被干掉了</h1> : <h1>我还活着</h1>}
            
        </div>
    )
}
```
## 列表渲染
本质就是利用js动态渲染标签列表，注意给动态列表追加唯一key（为啥？去了解虚拟dom和diff去）
```jsx
function Home(){
    const [users,setUsers] = useState([{id:0,name:'xiana',age:16}])
    return (
        <div>
            {/* ✅ */}
            {users.map((item)=><h1 key={item.id}>{item.name}</h1>)}
            
        </div>
    )
}
```

## 类与样式绑定
### 类样式绑定
用标签属性className绑定
```jsx
function Home(){
    return (
        <div>
            <div className={true ? 'active flex' : ''}></div>
        </div>
    )
}
```
> 注意jsx中一个标签只能有一个className属性
### 行内样式绑定
核心点是驼峰绑定
```jsx
function Home(){
    return (
        <div>
            <div style={{ backgroundColor: "red" }}></div>
        </div>
    )
}
```
## 事件处理
利用onClick绑定一个函数即可
```jsx
function Home(){
    const [count,setCount] = useState()
    return (
        <div>
            <h1>{ count }</h1>
            <div onClick={()=>setCount(count + 1)}></div>
        </div>
    )
}
```

## 表单输入绑定
```jsx
function Home(){
    const [keyword,setKeyword] = useState('')
    return (
        <div>
            {/* value实现状态同步视图，onChange实现用户输入改变状态 */}
            <input value={keyword} onChange={(e)=>setKeyword(e.target.value)}></input>
        </div>
    )
}
```
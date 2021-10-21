import React, {
    ChangeEvent,
    Fragment,
    memo,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useReducer,
    useState
} from "react";
import {ActionForReducer, StateForReducer, SubCounterProps, Types} from "@/types";

/*
    Hooks优势
    。能优化类组件的三大问题
    。能在无需修改组件结构的情况下复用状态逻辑（自定义Hooks）
    。能将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）
    。副作用的关注点分离：副作用指那些没有发生在数据向视图转换过程中的逻辑，如ajax请求、访问原生dom元素、本地持久性缓存、绑定/解绑事件、添加订阅、设置定时器、记录日志等

    注意事项
    。只能在函数内部的最外层调用Hook，不要在循环、条件判断或者子函数中调用
    。只能在React的函数组件中调用Hook，不啊哟在其他JavaScript函数中调用
 */

function ChildOne(props: any) {
    /*
     useState
     。React假设当你多次调用useState的时候，能够保证每次渲染时它们的调用顺序是不变的
     。通过在函数组件里调用它给组件添加一个内部state，React会在重复渲染时保留这个state
     。useState唯一的参数就是初始state
     。useState会返回一个数组：一个state，一个更新state的函数
        。在初始化渲染期间，返回的状态与传入的第一个参数值相同
        。可以在事件处理函数中或其他一些地方调用这个函数。它类似class组件的this.setState，但是它不会把新的state和旧的state进行合并，而是直接替换
     */
    const { num, handleClick } = props;

    return (
        <div
            onClick={() => handleClick(num + 1)}
        >
            <h3>{num}</h3>
            <span>child1</span>
        </div>
    );
}

function ChildTwo(props: any) {
    const { text, handleClick } = props;

    return (
        <div>
            Child2
            <Grandson text={text} handleClick={handleClick} />
        </div>
    );
}

function Grandson(props: any) {
    const { text, handleClick } = props;

    return (
        <div
            onClick={() => handleClick(text + 1)}
        >
            <h3>hhh - {text}</h3>
            <span>grandson</span>
        </div>
    );
}

function Parent() {
    let [num, setNum] = useState(0)
    let [text, setText] = useState(1)

    return (
        <div>
            <ChildOne num={num} handleClick={setNum} />
            <ChildTwo text={text} handleClick={setText} />
        </div>
    );
}

function Counter() {
    let [number, setNumber] = useState(0)

    function alertNumber() {
        setTimeout(() => {
            console.log('number', number)
        }, 3000)
    }

    return (
        <div>
            <h3>{number}</h3>
            <button onClick={() => setNumber(number + 1)}>+</button>
            <button onClick={alertNumber}>alertNumber</button>
        </div>
    );
}

function Counter5(props: any) {
    const { number } = props
        /*
            惰性初始化 state
            。initialState参数只会在组件的初始化渲染中起作用，后续渲染时会被忽略
            。如果初始state需要通过复杂计算获得，则可传入一个函数，在函数中计算并返回初始的state，此函数只在初始渲染时被调用
         */
    console.log('Counter5 render')
    function getInitState() {
        return {number}
    }
    let [counter, setCounter] = useState(getInitState)
    return (
        <div>
            <h3>{counter.number}</h3>
            <button onClick={() => setCounter({number: counter.number + 1})}>+</button>
            <button onClick={() => setCounter(counter)}>setCounter</button>
        </div>
    );
}

function Counter6() {
    /*
        性能优化
        1.Object.is（浅比较）
            。Hooks内部使用Object.is来比较新旧state是否相等
            。与class组件中的setState方法不同，如果你修改状态的时候，传入的状态值没有变化，则不重新渲染（class组件在状态更新时就会渲染，及时状态值没有变化）。
            。与class组件中的setState方法不同，useState不会自动合并并更新对象，可以用函数式的setState结合展开运算符来达到更新对象的效果

        2.减少渲染次数
            。默认情况下，只要父组件状态变了（不管子组件是否依赖该状态），子组件也会重新渲染
            。一般优化：
                。类组件：可以使用pureComponent
                。函数组件：使用memo，将函数组件传递给memo之后，就会返回一个新的组件，新组件的功能：入伙接受到的属性不变，则不重新渲染函数
            。但是怎么保证属性不会变呢？这里使用useState，每次更新都是独立的，const [number, setNumber] = useState(0)也就是说每次都会生成一个新的值（哪怕这个值没有变化），即使使用了React.memo，也还是会重新渲染
     */
    const [counter, setCounter] = useState({name: '计数器', number: 0});
    console.log('render Counter')

    const { name, number } = counter;
    // 如果你修改二楼状态的时候，传的值没有变化，则不重新渲染
    return (
        <div>
            <h3>{name}：{number}</h3>
            <button onClick={() => setCounter({...counter, number: number + 1})}>+</button>
            <button onClick={() => setCounter(counter)}>++</button>
        </div>
    )
}

function MySubCounter({ onClick, data, children }: SubCounterProps) {
    console.log('SubCounter render', children)
    return (
        <Fragment>
            <h3>{children}</h3>
            <button onClick={onClick}>{data.number}</button>
        </Fragment>
    )
}

const SubCounter = memo(MySubCounter)

function Counter7() {
    console.log('Counter render')
    const [name, setName] = useState('计数器')
    const [number, setNumber] = useState(0)
    /*
        父组件更新时，这里的变量和函数每次都会重新创建，那么子组件接受到的属性每次都会认为是新的
        所以子组件也会随之更新，这时候可以用到useMemo
        有没有后面的依赖数组很重要，否则还是会重新渲染
        如果后面的依赖数组没有值的话，即使父组件的number值改变了，子组件也不会去更新
     */
    const data = {number}
    const dataForUseMemo = useMemo(() => ({number}), [])
    const dataForUseMemoWithDeep = useMemo(() => ({number}), [number])
    const addClick = () => {
        setNumber(number + 1)
    };
    const addClickUseCallback = useCallback(() => {
        setNumber(number + 1)
    }, [number])
    return (
        <div>
            <input type="text" value={name} onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
            <SubCounter data={data} onClick={addClick}>我是MySubCounter组件</SubCounter>
            <SubCounter data={dataForUseMemo} onClick={addClick}>传入data使用useMemo</SubCounter>
            <SubCounter data={dataForUseMemoWithDeep} onClick={addClickUseCallback}>传入dataForUseMemoWithDeep使用useMemo</SubCounter>
        </div>
    );
}

function MyReducer() {
    /*
        useReducer
            。useReducer和redux中的reducer很像
            。useState内部就是靠useReducer来实现的
            。useState的替代方案
            。在某些场景下，useReducer会比useState更适用，例如state逻辑复杂且包含多个子值，或者下一个state依赖之前的state等
     */
    const initialState = 0;
    function reducer(state: StateForReducer, action: ActionForReducer) {
        switch (action.type) {
            case Types.increment:
                return {number: state.number + 1};
            case Types.decrement:
                return {number: state.number - 1};
            default:
                throw new Error();
        }
    }
    function init(initialState: number) {
        return {number: initialState};
    }
    // useReducer为hooks中提供了类似reducer的功能
    // 这个函数时一个惰性初始化函数，可以用来进行复杂的计算，然后返回最终的initialState
    const [state, dispatch] = useReducer(reducer, initialState, init)
    return (
        <div>
            <h3>Count：{state.number}</h3>
            <button onClick={() => dispatch({type: Types.increment})}>+</button>
            <button onClick={() => dispatch({type: Types.decrement})}>-</button>
        </div>
    );
}

function MyUseEffect() {
    /*
        useEffect
            。effect(副作用)：指哪些没有发生在数据向视图转换过程中的逻辑，如ajax请求、访问原生DOM元素、本地持久化缓存、绑定/解绑事件、添加订阅、设置定时器、记录日志等
            。副作用操作可以分为两类：需要清除的和不需要清除的
            。useEffect就是一个EffectHook，给函数组件增加了操作副作用的能力，它跟class组件中的componentDidMount、componentDidUpdate和componentWillUnmount具有相同的用途，只不过被合并成UI个API
            。useEffect接收一个函数，该函数会在组件渲染到屏幕之后执行，该函数有要求：要么返回一个能清除副作用的函数，要么就不返回任何内容
            。与componentDidMount或componentDidUpdate不同，使用useEffect调度的effect不会阻塞浏览器更新屏幕，这让你的应用看起来响应更快。大多数情况下，effect不需要同步执行。在个别情况下，有单独的useLayoutEffect Hook供你使用
     */
    const [number, setNumber] = useState(0)
    /*
        useEffect里面的这个函数会在第一次渲染之后和更新完成后执行
        相当于componentDidMount和componentDidUpdate
     */
    useEffect(() => {
        document.title = `你点击了${number}次`
    });

    return (
        <Fragment>
            <p>{number}</p>
            <button onClick={() => setNumber(number + 1)}>+</button>
        </Fragment>
    );
}

function ClearUseEffect() {
    let [number, setNumber] = useState(0)
    let [text, setText] = useState('')

    // 相当于componentDidMount和componentDidUpdate
    /*
        如果想执行只运行一次的effect（仅在组件挂载和卸载时执行），可以传递一个空赎罪作为第二个参数。这就是告诉React你的effect不依赖于props或state中的任何值，所以它永远都不需要重复执行
     */
    useEffect(() => {
        console.log('开启一个定时器')
        let $timer = setInterval(() => {
            setNumber((number: number): number => number + 1)
        }, 1000);

        /*
            useEffect如果返回一个函数的话，该函数会在组件卸载和更新时调用
            useEffect在执行副作用之前，会先调用上一次返回的函数
            如果要清除副作用，就得返回一个清除副作用的函数
         */
        return () => {
            console.log('destroy effect')
            clearInterval($timer)
        }
    }, [])

    useEffect(() => {
        console.log('useEffect - 数组表示 effect 依赖的变量，只有当这个变量发生改变之后才会重新执行 effect 函数')
    }, [text]) // 数组表示 effect 依赖的变量，只有当这个变量发生改变之后才会重新执行 effect 函数

    return (
        <Fragment>
            <input value={text} type="text" onChange={(event: ChangeEvent<HTMLInputElement>) => setText(event.target.value)} />
            <p>number: {number}</p>
            <button>+</button>
        </Fragment>
    );
}

function MyUseLayoutEffect() {
    /*
        useLayoutEffect会在浏览器layout之后，painting之前执行
     */
    const [color, setColor] = useState('red');
    useLayoutEffect(() => {
        console.log(`useLayoutEffect - color - ${color}`)
    })

    useEffect(() => {
        console.log('color', color)
    }, [color])

    const updateColor = (color: string) => {
        setColor(color)
    }

    return (
        <Fragment>
            <div id="myDiv" style={{background: color, transition: 'all 0.5s'}}>颜色</div>
            <button onClick={() => updateColor('red')}>红</button>
            <button onClick={() => updateColor('yellow')}>黄</button>
            <button onClick={() => updateColor('blue')}>蓝</button>
        </Fragment>
    )
}

function useNumber(){
    /*
        。自定义Hook更像是一种约定，而不是一种功能。如果函数的名字以use开头，并且调用了其他的Hook，则就称其为一个自定义Hook
        。有时候我们会想要在组件之间重用一些状态逻辑，之前要么用props render，要么用高阶组件，要么使用redux
        。自定义Hook可以让你在不增加组件的情况下到达同样的目的
        。Hook是一种复用状态逻辑的方式，它不复用state本身
        。事实上Hook的每次调用都有一个完全独立的state
     */
    let [number,setNumber] = useState<number>(0);
    useEffect(()=>{
       console.log('useEffect', number)
    },[number]);
    return [number,setNumber];
}

// 每个组件调用同一个Hook,只是复用Hook的状态逻辑，并不会共用一个状态
function Counter8() {
    const [number, setNumber] = useNumber()
    return (
        <div>
            <button onClick={() => setNumber(number + 1)}>{number}</button>
        </div>
    )
}

function useFormatList(list: string[]) {
    return useMemo(() => list.map((item: string) => {
        console.log('useFormatList')
        return item.toUpperCase()
    }), [])
}

function Index({ list }: any) {
    const [number, setNumber] = useState(0)
    const newList = useFormatList(list);
    return <div>
        <div className="list">
            { newList.map((item: string) => <div key={item}>{item}</div>) }
        </div>
        <div className="number">
            <div>{number}</div>
            <button onClick={() => setNumber(number + 1)}>add</button>
        </div>
    </div>
}

function MyHoos() {
    return (
        <div>
            <Parent/>
            <Counter/>
            <Counter5 number={1}/>
            <Counter6/>
            <Counter7/>
            <MyReducer/>
            <MyUseEffect/>
            <ClearUseEffect/>
            <MyUseLayoutEffect/>
            <Counter8/>
            <Counter8/>
            <Index list={['robin', 'zhu']}/>

        </div>
    );
}

export default MyHoos

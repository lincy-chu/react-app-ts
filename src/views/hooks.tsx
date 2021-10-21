import React, {useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState} from "react";
import {TweenMax} from 'gsap';
import enumArray from 'enum-array';
import {MyReducerAction, MyReducerActionType, MyReducerState} from "@/types";

function MyState() {
    /*
        使用规则：
            1、只在React函数中调用Hook
            2、不要在循环、条件或嵌套函数中调用Hook。
     */
    const [number, setNumber] = useState<number>(0);
    const [like, setLike] = useState<boolean>(false);

    const likeFn = (newLike: boolean) => setLike(newLike)
    return (
        <div style={{border: '1px solid #eee', boxSizing: 'border-box', margin: '10px', padding: '10px'}}>
            <h2>useState</h2>
            <h3>number：{number}</h3>
            <button onClick={() =>setNumber(number + 1)}>设置number</button>
            <h3>你喜欢我吗？{like ? 'yes': 'no'}</h3>
            <button onClick={() => likeFn(true)}>喜欢</button>
            <button onClick={() => likeFn(false)}>不喜欢</button>
        </div>
    );
}

function MyEffect() {
    /*
        useEffect每次完成之后触发，配合array去模拟类的生命周期，使用规则：
            1、如果不传，则每次componentDidUpdate时都会先触发returnFunction(如果存在)，再触发effect
            2、[]模拟componentDidMount
            3、[id]仅在id的值发生变化以后触发
            4、清除effect
     */
    const [number, setNumber] = useState<number>(0)
    const [num, setNum] = useState<number>(0)

    // 不传，会每次更细时都被触发，先触发回调再触发effect
    useEffect(() => {
        console.log('不传，会每次更细时都被触发')
        return () => {
            console.log('我是回调函数，此处可以清除定时器')
        }
    })

    // []模拟componentDidMount
    useEffect(() => {
        console.log('[]模拟componentDidMount', number, num)
    }, [])

    useEffect(() => {
        console.log('number发生了变化', number)
    }, [number])

    return (
        <div style={{border: '1px solid #eee', boxSizing: 'border-box', margin: '10px', padding: '10px'}}>
            <h2>useEffect</h2>
            <h3>number：{number}</h3>
            <button onClick={() => setNumber(number + 1)}>add number</button>
            <h3>num: {num}</h3>
            <button onClick={() => setNum(num + 1)}>add num</button>
        </div>
    );
}

function MyLayoutEffect() {
    /*
        useLayoutEffect
            1、跟useEffect使用差不多，通过同步执行状态更新可解决一些特殊场景下的页面闪烁问题
            2、useLayoutEffect会阻塞渲染，请谨慎使用
     */
    const ref = useRef(null)

    // useEffect(() => {
    //     TweenMax.to(ref.current, 0, {x: 200})
    // }, [])

    useLayoutEffect(() => {
        TweenMax.to(ref.current, 0, {x: 200})
    }, [])

    return (
        <div style={{border: '1px solid #eee', boxSizing: 'border-box', margin: '10px', padding: '10px'}}>
            <h2>useLayoutEffect</h2>
            <div ref={ref} style={{width: '200px', height: '200px', backgroundColor: '#38f'}} />
        </div>
    );
}

function MyRedux() {
    function init(initialCount: number) {
        return { count: initialCount }
    }

    function reducer({ count }: MyReducerState, { type, payload }: MyReducerAction) {
        switch (type) {
            case MyReducerActionType.INCREMENT:
                return {count: count + 1}
            case MyReducerActionType.DECREMENT:
                return {count: count - 1}
            case MyReducerActionType.RESET:
                return init(payload)
            default:
                throw new Error()
        }
    }

    const [state, dispatch] = useReducer(reducer, 0, init)
    const arr = enumArray.getEnumArray(MyReducerActionType) // 枚举数组化
    console.log('arr', arr)
    return (
        <div style={{border: '1px solid #eee', boxSizing: 'border-box', margin: '10px', padding: '10px'}}>
            <h3>useRedux</h3>
            <h4>Count：{state.count}</h4>
            <button onClick={() => dispatch({type: MyReducerActionType.RESET, payload: 0})}>Reset</button>
            <button onClick={() => dispatch({type: MyReducerActionType.INCREMENT, payload: 0})}>+</button>
            <button onClick={() => dispatch({type: MyReducerActionType.DECREMENT, payload: 0})}>-</button>
        </div>
    );
}

function MyRef() {
    /*
        useRef返回一个可变的ref对象，其.current属性被初始化为传入的参数（initialValue）。返回的ref对象在组件的整个生命周期内保持不变
            1、解决引用问题 -- useRef会在每次渲染时返回同一个ref对象
            2、解决一些this指向问题
            3、对比 createRef -- 在初始化节点两个是没区别的，但是在更新节点两者是有区别的
            4、在一个局部和拿书中，函数每一次update，都会把函数的变量重新生成一次。所以每更新一次组件，就会重新创建一次ref，这个时候继续使用createRef显然不合适，所以官方推出useRef。useRef创建的ref仿佛像在函数外部定义的一个全局变量，不会随着组件的更新而重新创建。但组件销毁，它会消失，不用手动进行销毁

        总结：createRef每次渲染都会返回一个新的引用，而useRef每次都会返回相同的引用
     */
    const refContainer = useRef<HTMLDivElement>(null)

    useEffect(() => {
        console.log('refContainer', refContainer)
    }, [])
    return (
        <div style={{border: '1px solid #eee', boxSizing: 'border-box', margin: '10px', padding: '10px'}}>
            <h3>useRef</h3>
            <div ref={refContainer}>举个栗子</div>
        </div>
    );
}

function MyMemo() {
    /*
        useMemo：依赖不变时不重新渲染。类似于shouldComponentUpdate
     */
    const [count, setCount] = useState<number>(0)
    const [color, setColor] = useState<string>('red')

    useEffect(() => {
        console.log('count effect')
    }, [count])

    const newCount = useMemo(() => {
        console.log('newCount触发了')
        return Math.round(count)
    }, [count])

    const newColor = useMemo(() => {
        console.log('color触发了')
        return color;
    }, [color])

    const nextColor = color === 'red' ? 'deepskyblue' : 'red'
    return (
        <div style={{border: '1px solid #eee', boxSizing: 'border-box', margin: '10px', padding: '10px'}}>
            <h3>useMemo</h3>
            <p>
                <span>count: {count}</span>
                <button onClick={() => setCount((count: number) => count + 1)}>changeCount</button>
            </p>
            <p>
                <span>newCount: {newCount}</span>
            </p>
            <p style={{color: newColor, transition: 'color 0.5s ease-in'}}>
                <span>newColor：{newColor}</span>
                <button onClick={() => setColor(`${nextColor}`)}>changeColor</button>
            </p>
        </div>
    );
}

function MyCallback () {
    /*
        useCallback：与useMemo差不多，是专门用来缓存函数的hooks
     */
    const [value, setValue] = useState<number>(0)

    const memoSetCount = useCallback(() => {
        setValue(value + 1)
    }, [])
    return (
        <div style={{border: '1px solid #eee', boxSizing: 'border-box', margin: '10px', padding: '10px'}}>
            <div>value：{value}</div>
            <button onClick={memoSetCount}>Update</button>
        </div>
    )
}

export default function Hooks() {
    return (
        <div>
            <h3>Hooks</h3>
            <MyState/>
            <MyEffect/>
            <MyLayoutEffect/>
            <MyRedux/>
            <MyRef/>
            <MyMemo/>
            <MyCallback/>
        </div>
    );
}

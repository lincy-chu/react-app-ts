import React, {Fragment, useRef, useState} from "react";

function Example1() {
    const [count, setCount] = useState<number>(0)

    const handleClick = () => {
        setTimeout(() => {
            setCount(count + 1);
        }, 3000)
    };

    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>setCount</button>
            <button onClick={handleClick}>Delay setCount</button>
        </div>
    );
}

function Example2() {
    /*
        useRef 获取过去或未来帧中的值
     */
    const [count, setCount] = useState<number>(0)
    const currentCount = useRef<number>(count);
    currentCount.current = count;

    const handleClick = () => {
        setTimeout(() => {
            console.log('currentCount.current', currentCount.current)
            setCount(currentCount.current + 1);
        }, 3000);
    };

    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>setCount</button>
            <button onClick={handleClick}>Delay setCount</button>
        </div>
    );
}

function Index() {
    const [number, setNumber] = useState<number>(0);

    const handleClick = () => {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                setNumber(number + 1)
                console.log('number', number)
            }, 1000)
        }
    }

    return <button onClick={handleClick}>{number}</button>
}

function BestHooks() {
    return (
        <Fragment>
            <h3>React Hooks最佳实践</h3>
            <Example1/>
            <Example2/>
            <Index/>
        </Fragment>
    );
}

export default BestHooks

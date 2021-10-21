import {useState} from 'react';
// @ts-ignore
import logo from '@/logo.svg';
import '@/App.scss';
import Hello from "@/components/Hello";
import SayHello from "@/components/SayHello";
import GetGreeting from "@/components/GetGreeting";
import Img from "@/components/Img";
import CreateElement from "@/components/CreateElement";
import Welcome from "@/components/Welcome";
import WelcomeClass from "@/components/WelcomeClass";
import Comment from "@/components/Comment";
import LifeCycle from "@/components/LifeCycle";
import Button from "@/components/Button";
import Form from "@/components/Form";
import Toggle from "@/components/Toggle";
import Greeting from "@/components/Greeting";
import LoginControl from "@/components/LoginControl";
import Mailbox from "@/components/Mailbox";
import ThreeParams from "@/components/ThreeParams";
import Banner from "@/components/WarningBanner";
import ListAndKey from "@/components/ListAndKey";
import Blog from "@/components/Blog";
import ReactForm from "@/components/ReactForm";
import NameForm from "@/components/NameForm";
import EssayForm from "@/components/EssayForm";
import Select from "@/components/Select";
import Reservation from "@/components/Reservation";
import Calculator from "@/components/Calculator";
import ThisApp from "@/components/ThisApp";
import MyHooks from "@/components/MyHooks";
import BestHooks from "@/components/BestHooks";
import HooksIndex from "@/components/HooksIndex";

import {CommentProps, Post, User, Option} from "@/types";

function Base() {
    const [count, setCount] = useState(0)
    const [myProp, setMyProps] = useState({ isLoggedIn: true })
    const [unreadMessages, setUnreadMessage] = useState([])
    const [posts, setPosts] = useState((): Post[] => [])

    const user: User = {
        firstName: 'chu',
        lastName: 'robin'
    }
    const GreetingOne = () => GetGreeting()
    const GreetingTwo = () => GetGreeting(user)
    const myProps: CommentProps = {
        author: {
            name: '测试',
            avatarUrl: logo
        },
        text: '文本',
        date: new Date()
    }
    const addUnreadMessage = () => {
        // @ts-ignore
        setUnreadMessage([...unreadMessages, `${Math.fround(Math.random() * 10000)}`])
    }
    const addPost = () => {
        const nextId = posts.length
        const nextPost: Post = {
            title: `title-${nextId}`,
            id: `${nextId}`,
            content: `content-${nextId}`
        }
        setPosts([...posts, nextPost])
    }
    const options: Option[] = [
        {label: '葡萄柚', value: 'grapefruit'},
        {label: '酸橙', value: 'lime'},
        {label: '椰子', value: 'coconut'},
        {label: '芒果', value: 'mango'}
    ];

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>Hello Vite + React!</p>
                <p>Hello, world!</p>
                <p>
                    <button type="button" onClick={() => setCount((count) => count + 1)}>
                        count is: {count}
                    </button>
                </p>
                <Hello/>
                <SayHello/>
                <GreetingOne/>
                <GreetingTwo/>
                <Img/>
                <CreateElement/>
                <Welcome name="zhu"/>
                <WelcomeClass name="zhu"/>
                <Comment {...myProps} />
                <p>
                    <strong>所有React组件都必须像纯函数一样保护它们的props不被更改</strong>
                </p>
                <LifeCycle/>
                <Button/>
                <Button>按钮</Button>
                <Form/>
                <Toggle/>
                <Greeting/>
                <Greeting {...myProp}/>
                <button onClick={() => setMyProps((state) => ({isLoggedIn: !state.isLoggedIn }))}>切换</button>
                <LoginControl/>
                <Mailbox unreadMessages={unreadMessages}/>
                <button onClick={() => addUnreadMessage()}>新增未读消息</button>
                <ThreeParams/>
                <Banner/>
                <ListAndKey/>
                <button onClick={addPost}>addPost</button>
                <Blog posts={posts}/>
                <ReactForm/>
                <NameForm/>
                <EssayForm/>
                <Select options={options}/>
                <Select options={options} multiple />
                <Reservation/>
                <Calculator/>
                <ThisApp/>
                <MyHooks/>
                <BestHooks/>
                <HooksIndex/>

            </header>
        </div>
    )
}

export default Base

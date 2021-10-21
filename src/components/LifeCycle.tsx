import React from "react";
import { dateFormat } from "../uitls"

export default class LifeCycle extends React.Component<any, any> {
    public timer: any = null;
    public num: number = 0;
    constructor(props: any) {
        super(props);
        this.state = {
            date: new Date(),
        };
        console.log('挂载时顺序：构造函数')
    }
    static getDerivedStateFromProps(props: any, state: any) {
        console.log('getDerivedStateFromProps')
        return {}
    }
    shouldComponentUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any): boolean {
        return true
    }
    componentDidMount() {
        console.log('挂载时顺序：componentDidMount() 方法会在组件已经被渲染到 DOM 中后运行，所以，最好在这里设置计')
        this.timer = setInterval(() => {
            if (this.num >= 3) {
                clearInterval(this.timer)
                this.num = 0
            }
            this.setState(() => {
                return {
                    date: new Date()
                }
            });
            this.num++
        }, 1000)
    }
    getSnapshotBeforeUpdate(prevProps: Readonly<any>, prevState: Readonly<any>): any {
        console.log('getSnapshotBeforeUpdate')
        return {};
    }
    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        console.log('componentDidUpdate')
    }
    componentWillUnmount() {
        console.log('componentWillUnmount：卸载')
    }
    render() {
        console.log('渲染render')
        const { date } = this.state;
        return (
            <div>
                <h3>Hello world!</h3>
                <h4>{dateFormat(date, 'YYYY-MM-DD hh:mm:ss')}</h4>
                <button onClick={() => this.setState({...this.state})}>在state不变的情况下更新state</button>
            </div>
        )
    }
}

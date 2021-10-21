import React from "react";
/*
    类组件的不足
        1、状态逻辑难复用：在组件之间复用状态逻辑很难，可能要用到render props(渲染属性) 或者HOC（高阶组件），但无论是渲染属性，还是高阶组件，都会在原先的组件包裹一层父容器，导致层级冗余
        2、趋向复杂难以维护
            。在生命周期中混杂不相干的逻辑，容易出现bug
            。类组件中到处都是对状态的访问和处理，导致组件难以拆分成更小的组件
        3、this指向问题：父组件给子组件传递函数时，必须绑定this
 */
export default class ThisApp extends React.Component<any, any> {
    public handleClick2: any;
    constructor(props: any) {
        super(props);
        this.state = {
            num: 1,
            title: 'React study'
        };
        this.handleClick2 = this.handleClick1.bind(this)  // 性能最高，因为如果传递给子组件其他的props值不变，那么子组件就不会刷新
    }
    handleClick1() {
        this.setState({
            num: this.state.num + 1
        });
    }
    handleClick3 = () => {
        this.setState({
            num: this.state.num + 1
        })
    }
    render() {
        return (
            <div>
                <h2>Ann, {this.state.num}</h2>
                <button onClick={this.handleClick2}>btn1</button>
                <button onClick={this.handleClick1.bind(this)}>btn2</button>
                <button onClick={() => this.handleClick1()}>btn3</button>
                <button onClick={this.handleClick3}>btn4</button>
            </div>
        )
    }
}
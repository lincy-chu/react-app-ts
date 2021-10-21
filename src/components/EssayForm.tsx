import React from "react";

export default class EssayForm extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: '请撰写一篇关于你喜欢的DOM元素的文章'
        };
    }
    handleChange(event: any) {
        this.setState({value: event.target.value})
    }
    handleSubmit(event: any) {
        console.log('提交的文章：', this.state.value)
        event.preventDefault()
    }
    render() {
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <label>
                    <span>文章</span>
                    <textarea placeholder="请输入文章" value={this.state.value} onChange={(e) => this.handleChange(e)}/>
                </label>
                <input type="submit" value="提交"/>
            </form>
        );
    }
}
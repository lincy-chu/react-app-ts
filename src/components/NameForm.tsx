import React from "react";
import ReactForm from "@/components/ReactForm";

export default class NameForm extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: ''
        };
    }
    handleChange(event: any) {
        this.setState({
            value: event.target.value
        })
    }
    handleSubmit(event: any) {
        console.log('提交的名字：', this.state.value)
        event.preventDefault()
    }
    render() {
        return (
            <ReactForm/>
        );
    }
}
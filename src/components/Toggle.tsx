import React from "react"
import {ToggleState} from "../types";

export default class Toggle extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            isToggleOn: true
        };

        // 为了在回调中使用this，这个绑定是必不可少的
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        this.setState((prevState: ToggleState) => ({
            isToggleOn: !prevState.isToggleOn
        }))
    }
    handleClickOne = () => {
        console.log('This is: ', this)
    }
    deleteRow = (id: string, e: any) => {
        console.log(`id：${id}`, e)
    }
    render() {
        const { isToggleOn } = this.state;
        const style = {
            cursor: 'pointer'
        };
        return (
            <React.Fragment>
                <button onClick={this.handleClick} style={style}>{ isToggleOn ? 'ON': 'OFF' }</button>
                <button onClick={this.handleClickOne} style={style}>Click me</button>
                <button onClick={(e) => this.deleteRow('id', e)}>Delete Row</button>
                <button onClick={this.deleteRow.bind(this, 'id')}>Delete Row</button>
            </React.Fragment>
        );
    }
}
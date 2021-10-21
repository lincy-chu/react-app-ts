import React from "react";
import {MyProps} from "../types";

export default class WelcomeClass extends React.Component<MyProps, any> {
    render() {
        const { name } = this.props;
        return <h3>Hello, { name }</h3>
    }
}

import React from "react";
import {MyProps} from "../types";

export default function Welcome(props: MyProps) {
    return <h3>Hello, { props.name }</h3>;
}

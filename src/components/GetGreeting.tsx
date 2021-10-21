import React from "react";
import {User} from "../types";
import {formatName} from "./SayHello";

function GetGreeting(user?: User) {
    if (user) {
        return <h3>Hello {formatName(user)}!</h3>
    } else {
        return <h3>Hello, Stranger.</h3>
    }
}

export default GetGreeting;

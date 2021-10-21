import React from "react";

function UserGreeting(props: any) {
    return <h3>Welcome back!</h3>
}

function GuestGreeting(props: any) {
    return <h3>Please sign up.</h3>
}

function Greeting(props: any) {
    const isLoggedIn = props.isLoggedIn;

    if (isLoggedIn) {
        return <UserGreeting />
    }
    return <GuestGreeting />
}

export default Greeting;
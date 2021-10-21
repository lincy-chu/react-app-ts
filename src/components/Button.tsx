import React from "react";

function Button(props: any) {
    const activateLasers = () => {
        console.log('activateLasers')
    }
    const { children } = props
    const text = children ? children : 'Activate Lasers'
    return (
        <button onClick={activateLasers}>{text}</button>
    );
}

export default Button;
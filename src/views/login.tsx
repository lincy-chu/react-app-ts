import React, {Fragment} from "react";
import {useHistory} from "react-router-dom";

function Login() {
    /*
        useHistory：帮助我们直接访问到history，而不再需要通过props访问
     */
    const history = useHistory()
    console.log('history', history)
    return (
        <Fragment>
            <h3>鉴权-登录</h3>
        </Fragment>
    );
}

export default Login;

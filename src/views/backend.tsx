import React, {Fragment} from "react";
import {useLocation} from "react-router";

function Backend() {
    /*
        useLocation：会返回当前url的location对象
     */
    const location = useLocation()
    return (
        <Fragment>
            <h3>鉴权-后端</h3>
            <p>location：{JSON.stringify(location)}</p>
        </Fragment>
    );
}

export default Backend;

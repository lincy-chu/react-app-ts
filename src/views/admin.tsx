import React, {Fragment} from "react";
import {useRouteMatch} from "react-router-dom";

function Admin() {
    /*
        useRouteMatch：尝试获取当前url的匹配
     */
    const match = useRouteMatch()
    console.log('match', match)

    const match1 = useRouteMatch({
        path: '/auth/admin'
    })
    console.log('match1', match1)
    return (
        <Fragment>
            <h3>鉴权-管理员</h3>
        </Fragment>
    );
}

export default Admin;

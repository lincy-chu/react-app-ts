import React, {Fragment} from "react";
import {useParams} from "react-router-dom";

function Home() {
    /*
        useParams：帮助我们直接访问到路由参数，而不再需要通过props访问
     */
    const params = useParams()
    return (
        <Fragment>
            <h3>鉴权-首页</h3>
            <p>params: {JSON.stringify(params)}</p>
        </Fragment>
    );
}

export default Home;

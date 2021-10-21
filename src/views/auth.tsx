import React, {Fragment} from "react";
import { Switch, Route, Link } from "react-router-dom";
import {ReactRouter} from "@/types";

function Auth(props: any) {
    const { routes } = props
    const routerList = routes.map(({ path, component }: ReactRouter, index: number) => <Route key={index} path={path} component={component} />)
    return (
        <Fragment>
            <h3>使用React-Router实现前端路由鉴权</h3>
            {
                routes.map(({ path, meta }: ReactRouter, index: number) => {
                    const thePath = path.includes('home') ? `${path}`.replace(':id', `${Math.round(Math.random() * 100)}`) : path;
                    return <Link key={index} to={thePath}>{meta.title}</Link>
                })
            }
            <Switch>
                {routerList}
            </Switch>
        </Fragment>
    )
}

export default Auth;

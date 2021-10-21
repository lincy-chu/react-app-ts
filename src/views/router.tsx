import React, {Fragment} from "react";
import { BrowserRouter as Router, Switch, Route, Link, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { routerList } from "@/router"
import {ReactRouter} from "@/types";

function Topic() {
    // @ts-ignore
    const { topicId } = useParams()

    return (
        <div>
            <h3>{topicId}</h3>
        </div>
    );
}

function Topics() {
    // 获取匹配信息
    const {path, url} = useRouteMatch()
    const history = useHistory()
    const childrenRouter: ReactRouter[] = [
        {
            path: '/rendering',
            meta: {
                title: 'Rendering with react'
            }
        },
        {
            path: '/components',
            meta: {
                title: 'Components'
            }
        },
        {
            path: '/props-v-state',
            meta: {
                title: 'Props v. State'
            }
        }
    ];
    const children = childrenRouter.map(({ path, meta }: ReactRouter, index: number) => <li key={index}>
        <Link to={`${url}${path}`}>{meta.title}</Link>
    </li>);
    const Default = () => <h3>Please select a topic.</h3>

    function goHome() {
        history.push(`${routerList[0].path}`)
    }
    return (
        <Fragment>
            <h3>Topics</h3>
            <ul>{children}</ul>
            <Switch>
                <Route exact path={path} component={Default}/>
                <Route path={`${path}/:topicId`} component={Topic} />
            </Switch>
            <button onClick={goHome}>Go Home</button>
        </Fragment>
    );
}

function BlogPost() {
    /*
        可以使用useParams()在任何位置，而且不需要手动传入参数
     */
    const { slug } = useParams() as any
    return (
        <Fragment>
            <h3>slug：{slug}</h3>
        </Fragment>
    )
}

function MyUseParams() {
    // 获取匹配信息
    const {path, url} = useRouteMatch()
    return (
        <Router>
            <div>
                <h3>BlogPost页面</h3>
                <Link to={`${url}/123456`}>跳转</Link>
            </div>
            <Switch>
                <Route path={`${path}/:slug`}>
                    <BlogPost/>
                </Route>
            </Switch>
        </Router>
    )
}

function MyRouter() {
    return (
        <Fragment>
            <h3>Router页面</h3>
            <Topics/>
            <MyUseParams/>
        </Fragment>
    );
}

export default MyRouter

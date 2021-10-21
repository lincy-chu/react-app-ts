import React, {Fragment, lazy, Suspense} from "react";
import {BrowserRouter, Switch, Route, Link, RouteComponentProps} from "react-router-dom";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {ReactRouter} from "@/types";
import {ExtractRouteParams} from "react-router";
import { Bus, Cart } from "@/views/routeConfig";

const NoMatch = () => <h3>No Match</h3>;

/*
    此处，使用 Suspense 和 lazy配置实现懒加载路由
 */
export const routerList: ReactRouter[] = [
    {
        path: '/',
        exact: true,
        component: lazy(() => import("@/views/index")),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/router',
        component: lazy(() => import('@/views/router')),
        meta: {
            title: '路由'
        }
    },
    {
        path: '/base',
        component: lazy(() => import('@/views/base')),
        meta: {
            title: '基础'
        }
    },
    {
        path: '/routeConfig',
        component: lazy(() => import('@/views/routeConfig')),
        routes: [
            {
                path: '/routeConfig/bus',
                component: Bus,
                meta: {
                    title: 'Bus页面'
                }
            },
            {
                path: '/routeConfig/cart',
                component: Cart,
                meta: {
                    title: 'Cart页面'
                }
            }
        ],
        meta: {
            title: '路由配置'
        }
    },
    {
        path: '/auth',
        component: lazy(() => import('@/views/auth')),
        meta: {
            title: '前端鉴权'
        },
        routes: [
            {
                path: '/auth/login',
                component: lazy(() => import('@/views/login')),
                meta: {
                    title: '鉴权-登录'
                }
            },
            {
                path: '/auth/home/:id',
                component: lazy(() => import('@/views/home')),
                meta: {
                    title: '授权-首页'
                }
            },
            {
                path: '/auth/backend',
                component: lazy(() => import('@/views/backend')),
                meta: {
                    title: '鉴权-后端'
                }
            },
            {
                path: '/auth/admin',
                component: lazy(() => import('@/views/admin')),
                meta: {
                    title: '鉴权-管理员'
                }
            }
        ]
    },
    {
        path: '/redux',
        component: lazy(() => import('@/views/redux')),
        meta: {
            title: 'Redux'
        }
    },
    {
        path: '/hooks',
        component: lazy(() => import('@/views/hooks')),
        meta: {
            title: 'Hooks'
        }
    },
    {
        path: '*',
        component: NoMatch,
        meta: {
            title: '404页面'
        }
    }
];

function Routers() {
    const routers = routerList.map(
        ({path, exact, component: Component, meta, routes}: ReactRouter, index: number) =>
            <Route
                key={index}
                path={path}
                exact={exact}
                render={(props: RouteComponentProps<ExtractRouteParams<string, string>>) => {
                    document.title = meta.title
                    if (routes) {
                        return <Component {...props} routes={routes} />
                    }
                    return <Component {...props} />
                }}
            />
    )
    return (
        <Fragment>
            <BrowserRouter>
                {
                    routerList.map(({path, meta}: ReactRouter, index: number) => (
                        <div key={index} style={{marginRight: '10px', display: 'inline-block'}}>
                            <Link to={path} style={{textDecoration: 'none', color: '#42b983'}}>{meta.title}</Link>
                        </div>
                    ))
                }
                <Suspense fallback={<div>加载中...</div>}>
                    <Route render={({location}: any) => {
                        return (
                            <TransitionGroup>
                                <CSSTransition
                                    key={location.key}
                                    classNames="fade"
                                    timeout={600}
                                >
                                    <Switch>{routers}</Switch>
                                </CSSTransition>
                            </TransitionGroup>
                        )
                    }}/>
                </Suspense>
            </BrowserRouter>
        </Fragment>
    );
}

export default Routers

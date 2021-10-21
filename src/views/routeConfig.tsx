import React from "react";
import {BrowserRouter, Switch, Route, RouteComponentProps, Link} from "react-router-dom";
import {ReactRouter} from "@/types";
import {ExtractRouteParams} from "react-router";

const routes = [
    {
        path: "/sandwiches",
        component: Sandwiches,
        meta: {
            title: 'sandwiches页面'
        }
    },
    {
        path: "/routeConfig",
        component: Tacos,
        meta: {
            title: '路由配置'
        },
        routes: [
            {
                path: "/routeConfig/bus",
                component: Bus,
                meta: {
                    title: 'Bus页面'
                }
            },
            {
                path: "/routeConfig/cart",
                component: Cart,
                meta: {
                    title: 'Cart页面'
                }
            }
        ]
    }
];

export default function RouteConfigExample() {
    const Router = BrowserRouter
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/routeConfig">routeConfig</Link>
                    </li>
                    <li>
                        <Link to="/sandwiches">Sandwiches</Link>
                    </li>
                </ul>

                <Switch>
                    {routes.map((route: any, i: number) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </div>
        </Router>
    );
}

function RouteWithSubRoutes({ path, routes, meta, component: Component }: ReactRouter) {
    return (
        <Route
            path={path}
            render={(props: RouteComponentProps<ExtractRouteParams<string, string>>) => {
                document.title = meta.title
                if (routes) {
                    return <Component {...props} routes={routes} />
                }
                return <Component {...props} />
            }}
        />
    );
}

function Sandwiches() {
    return <h2>Sandwiches</h2>;
}

function Tacos({ routes }: any) {
    return (
        <div>
            <h2>routeConfig</h2>
            <ul>
                <li>
                    <Link to="/routeConfig/bus">Bus</Link>
                </li>
                <li>
                    <Link to="/routeConfig/cart">Cart</Link>
                </li>
            </ul>

            <Switch>
                {routes.map((route: any, i: number) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </Switch>
        </div>
    );
}

export function Bus() {
    return <h3>Bus</h3>;
}

export function Cart() {
    return <h3>Cart</h3>;
}

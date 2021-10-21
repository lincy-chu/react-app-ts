import {MouseEventHandler, ReactChildren, ReactComponentElement} from "react";

export interface User {
    firstName: string;
    lastName: string;
}

export interface MyProps {
    name: string;
}

export interface MyUser {
    avatarUrl: string;
    name: string;
}

export interface MyPropsOne {
    user: MyUser;
}

export interface Author {
    name: string;
    avatarUrl: string;
}

export interface CommentProps {
    author: Author;
    text: string;
    date: Date;
}

export interface ToggleState {
    isToggleOn: Boolean;
}

export interface MailboxProps {
    unreadMessages: string[];
}

export type WarningBannerProps = {
    warn?: boolean;
}

export interface Post {
    title: string;
    id: string;
    content: string;
}

export type BlogProps = {
    posts: Post[];
}

export type Option = {
    label: string;
    value: string;
};

export type SelectProps = {
    options: Option[];
    multiple?: Boolean;
};

export type CalculatorState = {
    temperature: string;
}

export type BoilingVerdictProps = {
    celsius: number;
}

export interface Data {
    number: number;
}
export type SubCounterProps = {
    onClick: MouseEventHandler<HTMLButtonElement>;
    data: Data;
    children: any;
}

export enum Types {
    increment = 'increment',
    decrement = 'decrement'
}

export type ActionForReducer = {
    type?: Types;
}

export type StateForReducer = {
    number: number
}

export type scrollState = {
    top: number;
    suctionTop: boolean;
    opacity: number;
}

export type Meta = {
    title: string;
}
export type ReactRouter = {
    path: string; // 指定路由跳转路径
    exact?: boolean; // 精确匹配路由
    component?: any; // 路由对应组件
    meta: Meta; // 元信息
    name?: string; // 命名路由
    routes?: ReactRouter[]; // 子路由
    render?: Function; // render函数返回具体的DOM
    sensitive?: boolean; // 是否区分路由大小写
    role?: string; // 当前路由需要的角色权限
    backUrl?: string; // 不满足权限跳转的路由
}


export type MyReducerState = {
    count: number;
}

export enum MyReducerActionType {
    INCREMENT = 'increment',
    DECREMENT = 'decrement',
    RESET = 'reset'
}

export type MyReducerAction = {
    type: MyReducerActionType | undefined,
    payload: any;
}

export type VirtualListProps = {
    containerHeight?: number; // 外层容器高度
    itemHeight?: number; // 列表子项高度
    dataList: any[]; // 数据列表
    childrenComponent: any;
    showEnd?: boolean; // 是否显示触底文案
}

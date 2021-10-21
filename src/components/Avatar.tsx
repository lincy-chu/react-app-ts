import React from 'react'
import {MyPropsOne} from "../types";

export default function Avatar(props: MyPropsOne) {
    const { user: { avatarUrl, name } } = props
    return (
        <img
            className="avatar"
            src={avatarUrl}
            alt={name}
            style={{width: '200px'}}
        />
    )
}

import React from "react";
import Avatar from "./Avatar";

function UserInfo(props: any) {
    const { user } = props
    return (
        <div className="userInfo">
            <Avatar user={user} />
            <div className="userInfo-name">{ user.name }</div>
        </div>
    )
}

export default UserInfo

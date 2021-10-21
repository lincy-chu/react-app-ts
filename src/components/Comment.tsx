import React from "react";
import UserInfo from "./UserInfo";
import {CommentProps} from "../types";
import dayjs from "dayjs";

function Comment(props: CommentProps) {
    const { author, text, date } = props
    return (
        <div className="comment">
            <UserInfo user={author} />
            <div className="comment-text">{text}</div>
            <div className="comment-date">{dayjs(date).format('YYYY-MM-DD hh:mm:ss')}</div>
        </div>
    );
}

export default Comment

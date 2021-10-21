import React from "react";
import {MailboxProps} from "@/types";

function Mailbox(props: MailboxProps) {
    const { unreadMessages } = props

    return (
        <div>
            <h3>Hello!</h3>
            {
                unreadMessages.length > 0 &&
                <h2>You have { unreadMessages.length } unread messages.</h2>
            }
            {
                unreadMessages.length === 0 &&
                <h2>You have no messages to read!</h2>
            }
        </div>
    );
}

export default Mailbox;
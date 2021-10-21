import React from "react";
import {BlogProps, Post} from "@/types";

function Blog(props: BlogProps) {
    const { posts } = props
    const sidebar = (
        <ul>
            {posts.map(({ id, title }: Post) => <li key={id}>{title}</li>)}
        </ul>
    )
    const content = posts.map(({id, title, content}: Post) => <div key={id}>
        <h3>{title}</h3>
        <p>{content}</p>
    </div>)

    return (
        <div>
            {sidebar}
            {posts.length > 0 && <hr/>}
            {content}
        </div>
    )
}

export default Blog;

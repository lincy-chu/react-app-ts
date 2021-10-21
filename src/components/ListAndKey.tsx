import React from "react";

function ListAndKey() {
    const [list, setList] = React.useState([])

    const listItems = list.map((item: number, index: number) => <li key={index.toString()}>{item}</li>)

    const addItemToList = () => {
        const nextList = [...list, list.length]
        // @ts-ignore
        setList(nextList)
    }
    return (
        <React.Fragment>
            <button onClick={addItemToList}>添加</button>
            <ul>{listItems}</ul>
        </React.Fragment>
    )
}

export default ListAndKey

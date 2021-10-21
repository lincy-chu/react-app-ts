import React from "react";

function ReactForm() {
    return (
        <form>
            <label>
                <span>名字：</span>
                <input type="text" placeholder="请输入名字" name="name" />
            </label>
            <input type="submit" value="提交" />
        </form>
    );
}

export default ReactForm;
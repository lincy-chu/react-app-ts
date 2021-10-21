import React, { useState } from "react";

function ThreeParams() {
    const [loggedIn, setLoggedIn] = useState(false)
    return (
        <div>
            <strong>The User is <b>{loggedIn ? 'currently' : 'not'}</b> logged in.</strong>
            <button onClick={() => setLoggedIn(!loggedIn)}>切换</button>
        </div>
    )
}

export default ThreeParams

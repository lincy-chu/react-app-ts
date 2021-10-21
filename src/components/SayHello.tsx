import * as React from "react";
import { User } from "../types"

export function formatName(user: User) {
    const { firstName, lastName } = user
    return `${firstName} ${lastName}`
}

const user: User = {
    firstName: 'Harper',
    lastName: 'Perez'
}

const element = () => <h1>Hello, {formatName(user)}!</h1>

export default element

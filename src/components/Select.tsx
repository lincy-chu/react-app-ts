import React from "react";
import {SelectProps, Option} from "@/types";

function Select(props: SelectProps) {
    const { options, multiple }  = props
    const select = options.map(({ label, value }: Option) => <option key={value} value={value}>{label}</option>)
    const isMultiple: boolean = multiple === true
    const handleChange = (value: any) => {
        console.log('value', value.target.value)
    }
    return (
        <select multiple={isMultiple} onChange={(event: any) => handleChange(event)}>{select}</select>
    )
}

export default Select
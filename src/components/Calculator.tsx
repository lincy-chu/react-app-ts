import React, {ChangeEvent} from "react";
import {CalculatorState, BoilingVerdictProps} from "@/types";

function BoilingVerdict(props: BoilingVerdictProps) {
    const { celsius } = props
    if (celsius >= 100) {
        return <p>The water would boil.</p>
    }
    return <p>The water would not boil.</p>
}

export default class Calculator extends React.Component<any, CalculatorState> {
    constructor(props: any) {
        super(props);
        this.state = {
            temperature: ''
        };
    }
    handleChange(e: ChangeEvent<HTMLInputElement>) {
        this.setState({temperature: e.target.value})
    }
    render() {
        const { temperature } = this.state
        return (
            <fieldset>
                <legend>Enter temperature in Celsius：</legend>
                <input
                    type="text"
                    value={temperature}
                    placeholder="please input a number"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => this.handleChange(event)}
                />
                <BoilingVerdict celsius={parseFloat(temperature)}/>
            </fieldset>
        );
    }
}

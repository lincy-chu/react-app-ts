import React from "react";

export default class Reservation extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            isGoing: true,
            numberOfGuest: 2
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event: any) {
        const { target } = event;
        const name = target.name;
        const value = name === 'isGoing' ? target.checked : target.value;

        this.setState({
            [name]: value
        })
    }
    render() {
        const { isGoing, numberOfGuest } = this.state;
        return (
            <form>
                <label>
                    <span>参与：</span>
                    <input
                        type="checkbox"
                        name="isGoing"
                        checked={isGoing}
                        onChange={this.handleInputChange}
                    />
                </label>
                <label>
                    <span>来宾人数：</span>
                    <input
                        type="number"
                        name="number"
                        value={numberOfGuest}
                        onChange={this.handleInputChange}
                    />
                </label>
            </form>
        );
    }
}
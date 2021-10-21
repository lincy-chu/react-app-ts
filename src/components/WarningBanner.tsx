import React from "react";
import {WarningBannerProps} from "@/types";

function WarningBanner(props: WarningBannerProps) {
    const { warn } = props

    if (!warn) {
        // 让render方法直接返回null，即可不进行任何渲染
        return null;
    }
    return (
        <div className="warning">Warning</div>
    )
}

export default class Banner extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            showWarning: true
        };
    }
    handleToggleClick() {
        this.setState((state: any) => ({
            showWarning: !state.showWarning
        }))
    }
    render() {
        return (
            <div>
                <WarningBanner warn={this.state.showWarning} />
                <button onClick={() => this.handleToggleClick()}>{this.state.showWarning ? 'Hide' : 'Show'}</button>
            </div>
        )
    }
}

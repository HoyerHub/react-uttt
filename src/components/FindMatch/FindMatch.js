import React, {Component} from 'react';
import {IconSpinner} from "../Icons/Icons";
import './FindMatch.css';

class FindMatch extends Component {

    getElement = () => {
        if (this.props.mpState === 0)
            return (<span onClick={this.props.enterQueue} className="mp-button">Find Match</span>);
        else
            return (<span>
                <IconSpinner/>
                <span className="in-queue">
                    {this.props.connected ? "Looking for opponent" : "Connecting.."}
                    <span onClick={this.props.leaveQueue} className="mp-cancel-button">Cancel</span>
                </span>
            </span>);
    };

    render() {
        return (
            <span className="find-match">
                {this.getElement()}
            </span>
        );
    }
}

export default FindMatch;
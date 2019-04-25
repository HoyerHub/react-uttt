import React, {Component} from 'react';
import {IconReset} from "../Icons/Icons";
import FindMatch from "../FindMatch/FindMatch";
import Latency from "../Latency/Latency";

class TopBar extends Component {

    renderSP(){
        return (
            <div className="top-bar">
                <div className="status-text">
                    <FindMatch connected={this.props.connected} leaveQueue={this.props.leaveQueue} enterQueue={this.props.enterQueue} mpState={this.props.mpState}/>
                    {this.props.getTurnInfo()}
                    <IconReset onClick={this.props.resetMatch}/></div>
            </div>);
    }

    renderMP(){
        return (
            <div className="top-bar">
                <div className="status-text">
                    <Latency latency={this.props.latency}/>
                    {this.props.getTurnInfo()}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="top-bar">
                {this.props.isMultiPlayer ? this.renderMP() : this.renderSP()}
            </div>);
    }
}
export default TopBar;
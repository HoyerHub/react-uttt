import React, {Component} from 'react';
import './PlayerSettings.css';
import {IconComputer, IconUserSilhouette} from "../Icons/Icons";

class PlayerSettings extends Component {

    renderSP() {
        return (<div className="player-settings-sp">
            <div className="player-settings-x">
                    <span className={this.props.playerModes[0] !== 1 ? "active" : ""}>
                        <IconUserSilhouette onClick={()=>{this.props.setPlayerMode(0, 0)}}/></span>
                <span className={this.props.playerModes[0] === 1 ? "active" : ""}>
                        <IconComputer onClick={()=>{this.props.setPlayerMode(0, 1)}}/></span>
                <span className="calculation-time-input-container">
                        <span className="calculation-time-input">
                            <input type="number" min="20" max="5000" step="20" defaultValue="400" onChange={(e)=>{this.props.setMctsTimer(0, e.target.value)}}/>
                            <span className="input-label">ms</span>
                        </span>
                    </span>
            </div>
            <div className="player-settings-o">
                    <span className="calculation-time-input-container">
                        <span className="calculation-time-input">
                            <input type="number" min="20" max="5000" step="20" defaultValue="400" onChange={(e)=>{this.props.setMctsTimer(1, e.target.value)}}/>
                            <span className="input-label">ms</span>
                        </span>
                    </span>
                <span className={this.props.playerModes[1] === 1 ? "active" : ""}>
                        <IconComputer onClick={()=>{this.props.setPlayerMode(1, 1)}}/></span>
                <span className={this.props.playerModes[1] !== 1 ? "active" : ""}>
                        <IconUserSilhouette onClick={()=>{this.props.setPlayerMode(1, 0)}}/></span>
            </div>
        </div>);
    }

    renderMP() {
        return (<div className="player-settings-mp">
            <div className="player-settings-x">
                    <span className={this.props.playerModes[0] !== 1 ? "active" : ""}>
                        <IconUserSilhouette onClick={()=>{this.props.setPlayerMode(0, 0)}}/></span>
                    <span>{this.props.playerModes[1] === 0 ? "You" : "Opponent"}</span>
            </div>
            <div className="player-settings-o">
                <span>{this.props.playerModes[0] === 0 ? "You" : "Opponent"}</span>
                <span className={this.props.playerModes[1] !== 1 ? "active" : ""}>
                        <IconUserSilhouette onClick={()=>{this.props.setPlayerMode(1, 0)}}/></span>
            </div>
        </div>);
    }

    render() {
        return (
            <div className="player-settings">
                {this.props.isMultiPlayer ? this.renderMP() : this.renderSP()}
            </div>
        );
    }
}

export default PlayerSettings;
import React, {Component} from 'react';
import './PlayerSettings.css';
import {IconComputer, IconUserSilhouette} from "../Icons/Icons";

class PlayerSettings extends Component {
    render() {
        return (
            <div className="player-settings">
                <div className="player-settings-x"><span className={this.props.playerModes[0] === 0 ? "active" : ""}><IconUserSilhouette onClick={()=>{this.props.setPlayerMode(0, 0)}}/></span><span className={this.props.playerModes[0] === 1 ? "active" : ""}><IconComputer onClick={()=>{this.props.setPlayerMode(0, 1)}}/></span></div>
                <div className="player-settings-o"><span className={this.props.playerModes[1] === 0 ? "active" : ""}><IconUserSilhouette onClick={()=>{this.props.setPlayerMode(1, 0)}}/></span><span className={this.props.playerModes[1] === 1 ? "active" : ""}><IconComputer onClick={()=>{this.props.setPlayerMode(1, 1)}}/></span></div>
            </div>
        );
    }
}

export default PlayerSettings;
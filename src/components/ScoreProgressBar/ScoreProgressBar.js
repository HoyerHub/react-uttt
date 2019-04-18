import React, {Component} from 'react';
import "./ScoreProgressBar.css";

class ScoreProgressBar extends Component {
    render() {
        return (
            <div className="progress-bar-container">
                <div className="score-progress-bar">
                    <span className="score-progress-bar__x">X</span>
                    <div className="progress" style={{width: (this.props.progress.toString() + "%")}}>
                        <span className="score-progress-bar__o">O</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default ScoreProgressBar;
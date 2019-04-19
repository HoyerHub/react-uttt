import React, {Component} from 'react';
import './App.css';
import BigBoard from '../BigBoard/BigBoard'
import Engine from "../../game/Engine";
import {IconReset} from "../Icons/Icons";
import ScoreProgressBar from "../ScoreProgressBar/ScoreProgressBar";
import PlayerSettings from "../PlayerSettings/PlayerSettings";

class App extends Component {

    constructor(props) {
        super(props);
        this.engine = new Engine();
        this.state = {
            isTerminal: this.engine.state.isTerminal,
            winner: this.engine.state.winner,
            currentPlayer: this.engine.state.currentPlayer,
            boardStates: this.engine.getBoardStates(),
            boards: this.engine.state.boards,
            validMovesMethod: this.engine.getValidMoves
        };
    }

    updateState = () => {
        this.setState({
            isTerminal: this.engine.state.isTerminal,
            winner: this.engine.state.winner,
            currentPlayer: this.engine.state.currentPlayer,
            boardStates: this.engine.getBoardStates(),
            boards: this.engine.state.boards,
            validMovesMethod: this.engine.getValidMoves
        });
    };

    clickedTile = (board, tile) => {
        if (this.engine.playerModes[this.engine.state.currentPlayer] === 1) return;
        this.engine.onClick(board, tile, this.updateState);
    };

    resetMatch = () => {
        this.engine.resetMatch(this.updateState);
    };

    getTurnInfo = () => {
        if (!this.state.isTerminal && this.state.winner === -1) {
            let player = this.state.currentPlayer === 0 ? "x" : "o";
            return (<span>Current Player: <span className={player}>{player.toUpperCase()}</span></span>)
        } else if (this.state.isTerminal && this.state.winner !== -1) {
            let player = this.state.winner === 0 ? "x" : "o";
            return (<span>Game over - <span className={player}>{player.toUpperCase()}</span> wins!!</span>)
        } else {
            return (<span>Game over - it's a draw!</span>)
        }
    };

    setPlayerMode = (player, mode) => {
        this.engine.setPlayerMode(player, mode, this.updateState);
    };

    setMctsTimer = (player, ms) => {
      this.engine.mctsTimers[player] = ms;
    };

    render() {
        return (
            <div className="App">
                <div className="status-text">{this.getTurnInfo()}<IconReset onClick={this.resetMatch}/></div>
                <BigBoard
                    boardStates={this.state.boardStates}
                    tileStates={this.state.boards}
                    tileClickMethod={this.clickedTile}
                    validMovesMethod={this.state.validMovesMethod}/>
                <PlayerSettings setMctsTimer={this.setMctsTimer} setPlayerMode={this.setPlayerMode} set playerModes={this.engine.playerModes}/>
                <ScoreProgressBar progress={this.engine.winChances[1]}/>
            </div>
        );
    }
}

export default App;

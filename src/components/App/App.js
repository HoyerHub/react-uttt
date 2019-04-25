import React, {Component} from 'react';
import './App.css';
import Engine from "../../game/Engine";
import TopBar from "../TopBar/TopBar";
import BigBoard from "../BigBoard/BigBoard";
import PlayerSettings from "../PlayerSettings/PlayerSettings";
import ScoreProgressBar from "../ScoreProgressBar/ScoreProgressBar";

class App extends Component {

    constructor(props) {
        super(props);
        this.engine = new Engine(this.updateState);
        this.state = {
            isTerminal: this.engine.state.isTerminal,
            winner: this.engine.state.winner,
            currentPlayer: this.engine.state.currentPlayer,
            boardStates: this.engine.getBoardStates(),
            boards: this.engine.state.boards,
            validMovesMethod: this.engine.getValidMoves,
            isMultiPlayer: this.engine.mpEngine.hasActiveMatch,
            isConnected: this.engine.mpEngine.socket.connected,
            latency: this.engine.mpEngine.latency
        };
    }

    updateState = () => {
        if(typeof this.engine !== "undefined"){
            this.setState({
                isTerminal: this.engine.state.isTerminal,
                winner: this.engine.state.winner,
                currentPlayer: this.engine.state.currentPlayer,
                boardStates: this.engine.getBoardStates(),
                boards: this.engine.state.boards,
                validMovesMethod: this.engine.getValidMoves,
                isMultiPlayer: this.engine.mpEngine.hasActiveMatch,
                isConnected: this.engine.mpEngine.socket.connected,
                latency: this.engine.mpEngine.latency
            });
        }
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

    enterQueue = () => {
        this.engine.mpEngine.enterQueue();
        this.updateState();
    };

    leaveQueue = () => {
        this.engine.mpEngine.leaveQueue();
        this.updateState();
    };

    render() {
        return (
            <div className="app">
                <TopBar latency={this.engine.mpEngine.latency} connected={this.state.isConnected} isMultiPlayer={this.state.isMultiPlayer} leaveQueue={this.leaveQueue} enterQueue={this.enterQueue} mpState={this.engine.mpEngine.mpState} getTurnInfo={this.getTurnInfo} resetMatch={this.resetMatch}/>
                <BigBoard
                    boardStates={this.state.boardStates}
                    tileStates={this.state.boards}
                    tileClickMethod={this.clickedTile}
                    validMovesMethod={this.state.validMovesMethod}/>
                <PlayerSettings isMultiPlayer={this.state.isMultiPlayer} setMctsTimer={this.setMctsTimer} setPlayerMode={this.setPlayerMode} playerModes={this.engine.playerModes}/>
                <ScoreProgressBar progress={this.engine.winChances[1]}/>
            </div>
        );
    }
}

export default App;

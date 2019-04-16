import React, { Component } from 'react';
import './App.css';
import BigBoard from '../BigBoard/BigBoard'
import Engine from "../../game/Engine";
import State from "../../game/AI/State";
import UCT from "../../game/AI/UCT";

class App extends Component {

  constructor(props) {
    super(props);
    this.engine = new Engine();
    this.state = new State();
    this.uct = new UCT();
  }

  solveForOpponent = () => {
    if (this.uct.isRunning || this.engine.winner > -1) return;
    let action = this.uct.run(this.state);
    this.state.applyAction(action[0], action[1]);
    this.engine.onClick(action[0], action[1]);
    this.forceUpdate();
    if (this.engine.winner === -1) setTimeout(this.solveForOpponent, 250);
  };

  tile_OnClick = (board, tile) => {
    if (this.uct.isRunning) return;

    if(this.engine.onClick(board, tile)){
      this.state.applyAction(board, tile);
      this.forceUpdate();
      setTimeout(this.solveForOpponent, 0);
    }
  };

  getStatus = () => {
    if (this.engine.winner === -1){
      let player = this.engine.currentPlayer === 0 ? "x" : "o";
      return (<span>Current Player: <span className={player}>{player.toUpperCase()}</span></span>)
    }
    else{
      let player = this.engine.winner === 0 ? "x" : "o";
      return (<span>Game over - <span className={player}>{player.toUpperCase()}</span> wins!!</span>)
    }
  };

  render() {
    return (
      <div className="App">
        <div className="status-text">{this.getStatus()}</div>
        <BigBoard boardStates={this.engine.boardStates} tileStates={this.engine.board} tileClickMethod={this.tile_OnClick} validMovesMethod={this.engine.getValidMoves}/>
      </div>
    );
  }
}

export default App;

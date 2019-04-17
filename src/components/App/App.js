import React, { Component } from 'react';
import './App.css';
import BigBoard from '../BigBoard/BigBoard'
import Engine from "../../game/Engine";
import UCT from "../../game/AI/UCT";

class App extends Component {

  constructor(props) {
    super(props);
    this.engine = new Engine();
    this.uct = new UCT();
  }

  solveForOpponent = () => {
    if (this.uct.isRunning || this.engine.state.isTerminal) return;
    let action = this.uct.run(this.engine.state);
    this.engine.onClick(action[0], action[1]);
    this.forceUpdate();
    if (!this.engine.state.isTerminal) setTimeout(this.solveForOpponent, 250);
  };

  tile_OnClick = (board, tile) => {
    if (this.uct.isRunning) return;

    if(this.engine.onClick(board, tile)){
      this.forceUpdate();
      setTimeout(this.solveForOpponent, 0);
    }
  };

  getStatus = () => {
    if (!this.engine.state.isTerminal && this.engine.state.winner === -1){
      let player = this.engine.state.currentPlayer === 0 ? "x" : "o";
      return (<span>Current Player: <span className={player}>{player.toUpperCase()}</span></span>)
    }
    else if (this.engine.state.winner !== -1){
      let player = this.engine.state.winner === 0 ? "x" : "o";
      return (<span>Game over - <span className={player}>{player.toUpperCase()}</span> wins!!</span>)
    }
    else {
      return (<span>Game over - it's a draw!</span>)
    }
  };

  render() {
    return (
      <div className="App">
        <div className="status-text">{this.getStatus()}</div>
        <BigBoard boardStates={this.engine.getBoardStates()} tileStates={this.engine.state.boards} tileClickMethod={this.tile_OnClick} validMovesMethod={this.engine.getValidMoves}/>
      </div>
    );
  }
}

export default App;

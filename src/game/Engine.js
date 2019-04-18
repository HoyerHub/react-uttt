import State from "./State";
import UCT from "./AI/UCT";

class Engine {
    resetMatch = () =>{
        console.log("Engine created.");
        this.state = new State();
        this.actions = this.state.getActions();
        this.winChances = [50, 50];
    };

    isValidMove = (board, tile) =>{
        return this.actions.some(action => action[0] === board && action[1] === tile);
    };

    getBoardStates = () => {
      let result = [];
      for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 3; j++) {
              if (this.state.boardStates[j] & (1 << i)){
                  result.push(j);
                  break;
              }
          }
          if (result.length === i) result.push(-1);
      }
      return result;
    };

    getValidMoves = (board) => {
        return this.actions
            .filter((action) => {
                return action[0] === board;
            })
            .map((action) => {
                return action[1];
            });
    };

    onClick = (board, tile, callback) => {
        if (this.uct.isRunning) return;
        if (typeof this.callback === "undefined") this.callback = callback;
        if (this.isValidMove(board, tile)) {
            this.state.applyAction(board, tile);
            this.actions = this.state.getActions();
            callback();
            if (!this.state.isTerminal) this.worker.postMessage(JSON.stringify(this.state));
        }
    };

    constructor(){
        this.resetMatch();
        this.uct = new UCT();
        this.worker = new Worker('./AI/UCT.worker.js', { type: 'module' });
        this.worker.onmessage = e => {
            this.winChances[this.state.currentPlayer] = Math.min(100, Math.max(0, e.data[2]));
            this.winChances[1 - this.state.currentPlayer] = 100 - this.winChances[this.state.currentPlayer];
            console.log(this.winChances);
            this.callback();
        };
    };
}
export default Engine;
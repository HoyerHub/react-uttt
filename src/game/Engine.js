import State from "./State";

class Engine {
    resetMatch = (callback) =>{
        this.state = new State();
        this.actions = this.state.getActions();
        this.winChances = [50, 50];
        if (typeof callback !== "undefined") {
            this.callback = callback;
            callback();
            if (this.playerModes[0] === 1){
                this.worker.postMessage(JSON.stringify(this.state));
            }
        }
    };

    isValidMove = (board, tile) =>{
        return this.actions.some(action => action[0] === board && action[1] === tile);
    };

    setPlayerMode = (player, mode, callback) => {
        if (typeof this.callback === "undefined") this.callback = callback;
        this.playerModes[player] = mode;
        callback();
        if (mode === 1 && player === this.state.currentPlayer){
            this.worker.postMessage(JSON.stringify(this.state));
        }
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
        this.worker = new Worker('./AI/UCT.worker.js', { type: 'module' });
        this.worker.onmessage = e => {
            if (this.state.turn !== e.data[3]) return;
            this.winChances[this.state.currentPlayer] = Math.min(100, Math.max(0, e.data[2]));
            this.winChances[1 - this.state.currentPlayer] = 100 - this.winChances[this.state.currentPlayer];
            if (this.playerModes[this.state.currentPlayer] === 1){
                this.onClick(e.data[0], e.data[1], this.callback);
            }
            else this.callback();
        };
        this.playerModes = [0, 0];
    };
}
export default Engine;
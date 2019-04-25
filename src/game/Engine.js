import State from "./State";
import mpEngine from "./Multiplayer/mpEngine";

class Engine {
    resetMatch = () =>{
        this.state = new State();
        this.actions = this.state.getActions();
        this.winChances = [50, 50];
        this.callback();
        if (this.playerModes[0] === 1){
            this.worker.postMessage([JSON.stringify(this.state), this.mctsTimers[this.state.currentPlayer]]);
        }
    };

    isValidMove = (board, tile) =>{
        return this.actions.some(action => action[0] === board && action[1] === tile);
    };

    setPlayerMode = (player, mode) => {
        this.playerModes[player] = mode;
        this.callback();
        if (mode === 1 && player === this.state.currentPlayer){
            this.worker.postMessage([JSON.stringify(this.state), this.mctsTimers[this.state.currentPlayer]]);
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

    onClick = (board, tile) => {
        if (this.isValidMove(board, tile)) {
            if (this.mpEngine.hasActiveMatch){
                this.mpEngine.makeMove([board, tile]);
                return;
            }
            this.state.applyAction(board, tile);
            this.actions = this.state.getActions();
            this.callback();
            if (!this.state.isTerminal) this.worker.postMessage([JSON.stringify(this.state), this.mctsTimers[this.state.currentPlayer]]);
        }
    };

    onMpEvent = (name, data) => {
        console.log(name, data);
        if (name === "foundMatch"){
            this.playerModes[0] = data.participants[0] === this.mpEngine.socket.id ? 2 : 0;
            this.playerModes[1] = this.playerModes[0] === 2 ? 0 : 2;
            this.resetMatch();
        }
        else if (name === "newMove"){
            this.state.applyAction(data[0], data[1]);
            this.actions = this.state.getActions();
            this.callback();
            if (!this.state.isTerminal) this.worker.postMessage([JSON.stringify(this.state), this.mctsTimers[this.state.currentPlayer]]);
        }
        else {
            this.callback();
        }
    };

    constructor(callback){
        this.callback = callback;
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
        this.playerModes = [0, 1];
        this.mctsTimers = [400, 400];
        this.mpEngine = new mpEngine(this.onMpEvent);
        this.resetMatch();
    };
}
export default Engine;
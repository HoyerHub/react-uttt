import State from "./AI/State";

class Engine {
    resetMatch = () =>{
        this.state = new State();
        this.actions = this.state.getActions();
    };

    isValidMove = (board, tile) =>{
        for (let i = 0; i < this.actions.length; i++) {
            let action = this.actions[i];
            if (action[0] === board && action[1] === tile) return true;
        }
        return false;
    };

    getBoardStates = () => {
      let result = [];
      for (let i = 0; i < 9; i++) {
        if (this.state.boardStates[0] & (1 << i)){
            result.push(0);
        }
        else if (this.state.boardStates[1] & (1 << i)){
            result.push(1);
        }
        else if (this.state.boardStates[2] & (1 << i)){
            result.push(2)
        }
        else result.push(-1);
      }
      return result;
    };

    getValidMoves = (board) => {
        return this.actions
            .filter((action) => {
                return action[0] === board;
            })
            .map((move) => {
                return move[1];
            });
    };

    onClick = (board, tile) => {
        if (this.isValidMove(board, tile)) {
            this.state.applyAction(board, tile);
            this.actions = this.state.getActions();
            return true;
        }
        return false;
    };

    constructor(){
        console.log("Engine created.");
        this.resetMatch();
    };
}
export default Engine;
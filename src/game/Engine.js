class Engine {
    resetMatch = () =>{
        this.board = [];
        this.boardStates = [];
        for (let i = 0; i < 9; i++) {
            this.board.push([]);
            this.boardStates.push(-1);
            for (let j = 0; j < 9; j++) {
                this.board[i].push(-1);
            }
        }
        this.currentPlayer = 0;
        this.lastMove = [-1, -1];
        this.winningStates = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        this.winner = -1;
        this.isTerminal = false;
    };

    isValidMove = (board, tile) =>{
        return this.winner === -1 &&
            this.boardStates[board] === -1 &&
            this.board[board][tile] === -1 &&
            (this.lastMove[0] === -1 || board === this.lastMove[1] || this.boardStates[this.lastMove[1]] !== -1);
    };

    getValidMoves = (board) => {
        let moves = [];
        for (let i = 0; i < 9; i++) {
            if (this.isValidMove(board, i)) moves.push(i);
        }
        return moves;
    };

    onClick = (board, tile) => {
        if (this.isValidMove(board, tile)) {
            this.board[board][tile] = this.currentPlayer;

            let bigBoardChanged = false;
            for (let i = 0; i < 8; i++) {
                let win = this.winningStates[i];
                if (this.board[board][win[0]] === this.currentPlayer &&
                    this.board[board][win[1]] === this.currentPlayer &&
                    this.board[board][win[2]] === this.currentPlayer){
                    bigBoardChanged = true;
                    this.boardStates[board] = this.currentPlayer;
                }
            }
            if(bigBoardChanged){
                for (let i = 0; i < 8; i++) {
                    let win = this.winningStates[i];
                    if (this.boardStates[win[0]] === this.currentPlayer &&
                        this.boardStates[win[1]] === this.currentPlayer &&
                        this.boardStates[win[2]] === this.currentPlayer){
                        this.winner = this.currentPlayer;
                    }
                }
            }
            this.lastMove = [board, tile];
            this.currentPlayer = 1 - this.currentPlayer;
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
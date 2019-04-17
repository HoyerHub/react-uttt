class State {
    applyAction = (board, pos) => {
        if (this.isTerminal) return this;
        let fullBoard = this.boards[0][board] | this.boards[1][board];
        if(fullBoard & (1 << pos)){
            this.isTerminal = true;
            this.winner = 1 - this.currentPlayer;
            return this;
        }
        this.boards[this.currentPlayer][board] |= (1 << pos);
        let updateBigBoard = false;
        let checkWins = false;
        if (window.boardHasWin[this.boards[this.currentPlayer][board]]){
            updateBigBoard = true;
            checkWins = true;
            this.boardStates[this.currentPlayer] |= (1 << board);
        }
        if (((this.boards[0][board] | this.boards[1][board]) & 0b111111111) === 0b111111111){
            this.boardStates[2] |= (1 << board);
            updateBigBoard = true;
        }
        if (updateBigBoard){
            if (checkWins)
                if (window.boardHasWin[this.boardStates[this.currentPlayer]]){
                    this.winner = this.currentPlayer;
                    this.isTerminal = true;
                }

            let boardState = this.getBoardState();
            if (!this.isTerminal && boardState === 0b111111111){
                this.isTerminal = true;
            }
        }
        this.currentPlayer = 1 - this.currentPlayer;
        this.lastMove = [board, pos];
        return this;
    };

    getActions = () => {
        let actions = [];
        if (this.isTerminal) return actions;
        let boardState = this.getBoardState();
        let pos = this.lastMove[1];
        if(pos === -1 || boardState & (1 << pos)){
            for (let i = 0; i < 9; i++) {
                if (boardState & (1 << i)) continue;
                let board = this.boards[0][i] | this.boards[1][i];
                actions.push(...window.actionsFromBoard[i][board]);
            }
        }
        else {
            let board = this.boards[0][pos] | this.boards[1][pos];
            actions = window.actionsFromBoard[pos][board];
        }
        return actions;
    };

    getBoardState = () => {
        return this.boardStates[0] | this.boardStates[1] | this.boardStates[2];
    };

    getRandomAction = () => {
        let actions = this.getActions();
        return actions[Math.floor(Math.random() * actions.length)];
    };

    evaluate = () => {
        let rewards = [0,0];
        if (this.isTerminal){
            if(this.winner > -1){
                rewards[this.winner] = 1;
                rewards[1 - this.winner] = -1;
            }
        }
        return rewards;
    };

    constructor(parent){
        if (parent){
            this.currentPlayer = parent.currentPlayer;
            this.isTerminal = parent.isTerminal;
            this.lastMove = [...parent.lastMove];
            this.winner = parent.winner;
            this.boardStates = [...parent.boardStates];
            this.boards = [];
            for (let i = 0; i < 2; i++) {
                this.boards.push([...parent.boards[i]])
            }
            return;
        }

        this.currentPlayer = 0;
        this.isTerminal = false;
        this.lastMove = [-1, -1];
        this.winner = -1;
        this.boardStates = [0,0,0];
        this.boards = [[],[]];
        for (let i = 0; i < 9; i++) {
            this.boards[0].push(0);
            this.boards[1].push(0);
        }
        if (typeof window.boardHasWin === "undefined"){
            const winCombos = [
                0b111000000,
                0b000111000,
                0b000000111,
                0b100100100,
                0b010010010,
                0b001001001,
                0b100010001,
                0b001010100];
            window.boardHasWin = [];
            for (let i = 0; i < 512; i++) {
                let hasWin = false;
                for (let j = 0; j < 8; j++) {
                    let w = winCombos[j];
                    if ((i & w) === w){
                        hasWin = true;
                    }
                }
                window.boardHasWin.push(hasWin);
            }
            window.actionsFromBoard = [];
            for (let i = 0; i < 9; i++) {
                let actionsInBoard = [];
                for (let j = 0; j < 512; j++) {
                    let actions = [];
                    for (let k = 0; k < 9; k++) {
                        if (!(j & (1 << k))) actions.push([i, k]);
                    }
                    actionsInBoard.push(actions);
                }
                window.actionsFromBoard.push(actionsInBoard);
            }
        }
    }
}
export default State;
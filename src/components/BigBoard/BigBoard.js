import React, {Component} from 'react';
import SmallBoard from '../SmallBoard/SmallBoard';
import './Board.css';

class BigBoard extends Component {

    createSmallBoards = () => {
        let html = [];
        for (let i = 0; i < 9; i++) {
            html.push(<SmallBoard
                key={"board"+i}
                board={i}
                boardState={this.props.boardStates[i]}
                tileStateX={this.props.tileStates[0][i]}
                tileStateO={this.props.tileStates[1][i]}
                tileClickMethod={this.props.tileClickMethod}
                validMovesMethod={this.props.validMovesMethod}/>);
        }
        return html;
    };

    render()
    {
        return (
            <div className="board-container">
                <div className="board-inside">
                    <div className="big-board">
                        {this.createSmallBoards()}
                    </div>
                </div>
            </div>
        );
    }
}

export default BigBoard;
import React, {Component} from 'react';
import Tile from '../Tile/Tile';

class SmallBoard extends Component
{
    createTiles = () => {
        let html = [];
        let validMoves = this.props.validMovesMethod(this.props.board);
        for (let i = 0; i < 9; i++) {
            let isValid = validMoves.includes(i);
            html.push(<Tile
                isValid={isValid}
                tileClickMethod={this.props.tileClickMethod}
                key={"Tile"+this.props.board+","+i}
                board={this.props.board}
                boardState={this.props.boardState}
                tile={i}
                tileState={this.getTileState(i)}/>);
        }
        return html;
    };

    getTileState = (tile) =>{
        if (this.props.tileStateX & (1 << tile))
            return 0;
        else if (this.props.tileStateO & (1 << tile))
            return 1;
        return -1;
    };

    render()
    {
        return (
            <div className="small-board">
                {this.createTiles()}
            </div>
        );
    }
}

export default SmallBoard;
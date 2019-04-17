import React, {Component} from 'react';

class Tile extends Component {

    constructor(props) {
        super(props);
        this.value = "";
    }

    onClick = () => {
        this.props.tileClickMethod(this.props.board, this.props.tile);
    };

    getClasses = () => {
        let classes = "tile";
        if (this.props.boardState !== -1){
            if (this.props.boardState === 0){
                classes += " board-x";
            }
            else if (this.props.boardState === 1){
                classes += " board-o";
            }
            else if (this.props.boardState === 2){
                classes += " board-none";
            }
            return classes;
        }
        if (!this.props.isValid) classes += " disabled";
        if (this.value) classes += " " + this.value;
        return classes;
    };

    render() {
        this.value = this.props.tileState === 0 ? "X" : "O";
        return (
            <div className={this.getClasses()} onClick={this.onClick}>
                {this.props.tileState >= 0 ? this.value : ""}
            </div>
        );
    }
}

export default Tile;
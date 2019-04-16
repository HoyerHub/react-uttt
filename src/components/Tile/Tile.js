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
            classes += this.props.boardState ? " board-x" : " board-y";
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
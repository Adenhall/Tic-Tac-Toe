import React, { Component } from 'react'
import Squares from './Squares.js'

export default class Board extends Component {
    
    renderSquare = (num) => {
        return <Squares value={this.props.box[num]} boxClick={() =>this.boxClick(num)}/>
    }

    boxClick = (id) => {
        let boxArray = this.props.box;

        if(boxArray[id] !== null) {
            alert("This box has already been chosen!")
        } else {
        this.props.isXNext ? boxArray[id] = "X" : boxArray[id] = "O"
        this.props.setTheState({box: boxArray, isXNext: !this.props.isXNext})
        console.log(boxArray)
        }
        console.log(this.calculateWinner(boxArray))
    }

    calculateWinner = (squares) => {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
      }
    
    render() {
        let status =''
        let boxArray = this.props.box;
        if (boxArray.some(x => x === null)) {
            if(this.calculateWinner(boxArray) == null) {
            this.props.isXNext ? status = "Next Player is X" : status=" Next Player is O"
            } else status ='Winner is '
        } else status = "Tie game"
        return (
            <div>
                <h1>{status}{this.calculateWinner(boxArray)}</h1>
                <div style ={{display: "flex"}}>
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
                </div>
                <div style ={{display: "flex"}}>
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
                </div>
                <div style ={{display: "flex"}}>
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}
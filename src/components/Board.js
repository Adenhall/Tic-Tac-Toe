import React, { Component } from 'react'
import Squares from './Squares.js'

let status =''
let gameOverStatus=false

export default class Board extends Component {
    
    renderSquare = (num) => {
        return <Squares value={this.props.box[num]} boxClick={gameOverStatus ? () => alert("Game Over!") : () =>this.boxClick(num)}/>
    }


    boxClick = (id) => {
        let boxArray = this.props.box.slice();
        if(boxArray[id] !== null) {
            alert("This box has already been chosen!")
        } else {
        this.props.isXNext ? boxArray[id] = "X" : boxArray[id] = "O"
        this.props.setTheState({box: boxArray.slice(), isXNext: !this.props.isXNext, history: [...this.props.history.slice(), {box: boxArray.slice(), isXNext: !this.props.isXNext}]})
        // console.log(boxArray)
        }
        // console.log(this.props.history)
        console.log(this.props.isGameOver)
        if(boxArray.filter(x => x === "X" || x ==="O").length === 1) {this.props.getStartTime()}
        if (this.calculateWinner(boxArray) !== null) {this.props.getEndGame()}
        // console.log(this.calculateWinner(boxArray))
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
        
        let boxArray = this.props.box;
        if (boxArray.some(x => x === null)) {
            this.props.isXNext ? status = "Next Player is X" : status=" Next Player is O"
        }
        if (this.calculateWinner(boxArray) !== null) {    
            status ='Winner is '
            gameOverStatus=true
            // console.log("END", time_end)
            // game_time = time_end - start_time
            // console.log("Game time",game_time)
            // this.props.postResult(game_time)
            // this.props.gameTime = game_time
            // // this.props.setTheState({game_time: time_end-start_time})
            // console.log("TIME", time_end - start_time)
        } else gameOverStatus =false
        if (boxArray.every(x => x !== null) && this.calculateWinner(boxArray) === null) {
            status = "Tie game"
        }
        return (
            <div>
                <h1 className="game-status">{status}{this.calculateWinner(boxArray)}</h1>
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

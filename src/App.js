import React, {Component} from 'react';
import './App.css';
import Board from './components/Board';
import History from './components/HistoryBoard.js'
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      box: Array(9).fill(null),
      isXNext: true,
      history: [],
      isGameOver: false
    }
  }

  setTheState = (obj) => {
    this.setState(obj)
  }

  timeTravel = (id) => {
    // console.log("Heloooo", this.state.history[id])
    // console.log("Hiiii",this.state.history)
    this.setState({box: this.state.history[id].box, isXNext: this.state.history[id].isXNext})
  }

  render() {
    return (
      <div className="App">
        <Board className="game-board" {...this.state} setTheState={this.setTheState}/>
        <History {...this.state} setTheState={this.setTheState} timeTravel ={this.timeTravel}/>
      </div>
    );
  }
}

export default App;

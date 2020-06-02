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
    let tempArray = this.state.history.map(x => x)
    tempArray.splice(id+1)
    // console.log("Heloooo", this.state.history[id])
    console.log("Hiiii",this.state.history)
    console.log("Heeee", tempArray)
    console.log("My ID", id)
    this.setState({box: this.state.history[id].box, isXNext: this.state.history[id].isXNext, history: tempArray})
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

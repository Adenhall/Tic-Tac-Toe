import React, {Component} from 'react';
import './App.css';
import Board from './components/Board';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      box: Array(9).fill(null),
      isXNext: true,
      status:  ''
    }
  }

  setTheState = (obj) => {
    this.setState(obj)
  }

  render() {
    return (
      <div className="App">
        <Board {...this.state} setTheState={this.setTheState}/>
      </div>
    );
  }
}

export default App;

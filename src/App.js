import React, { Component } from "react";
import "./App.css";
import Board from "./components/Board";
import History from "./components/HistoryBoard.js";
import "bootstrap/dist/css/bootstrap.min.css";
import FacebookLogin from "react-facebook-login";

let tempRank = []
let start_time
let end_time


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      box: Array(9).fill(null),
      isXNext: true,
      history: [],
      isGameOver: false,
      user: "",
      topRank: [],
      score: null
    };
  }

  setTheState = (obj) => {
    this.setState(obj);
  };

  getData = async () => {
    let url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`;
    let data = await fetch(url);
    let result = await data.json();
    this.setState({ ...this.state, topRank: result.items });
    console.log("Server", result);
  };

  componentDidMount() {
    this.getData();
  }

  getStartTime = () => {
    let this_time = Date.now()
    start_time = this_time
    console.log("START",start_time)
}
  getEndGame = () => {
    end_time = Date.now()
    console.log("End", end_time)
    this.setState({score: ((end_time - start_time)/1000).toFixed(2)})
    this.postData()
    this.getData()
    tempRank = this.state.topRank.slice().sort((a, b) =>a.score-b.score)
  }

  responseFacebook = (response) => {
    console.log(response);
    this.setState({ user: response.name });
    tempRank = this.state.topRank.slice().sort((a, b) =>a.score-b.score)
    console.log("temp rank", tempRank)
  };

  timeTravel = (id) => {
    let tempArray = this.state.history.map((x) => x);
    tempArray.splice(id + 1);
    // console.log("Heloooo", this.state.history[id])
    // console.log("Hiiii", this.state.history);
    // console.log("Heeee", tempArray);
    // console.log("My ID", id);
    this.setState({
      box: this.state.history[id].box,
      isXNext: this.state.history[id].isXNext,
      history: tempArray,
    });
  };

  postData = async () => {
    let data = new URLSearchParams();
    data.append("player", this.state.user);
    data.append("score", this.state.score);
    const url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data.toString(),
      json: true,
    });
  };

  resetGame = () => {
    this.setState({
      box: Array(9).fill(null),
      isXNext: true,
      history: [],
      isGameOver: false,
    });
  };

  render() {
    return (
      <div className="App">
        <Board
          className="game-board"
          {...this.state}
          setTheState={this.setTheState}
          postResult={this.postData}
          getStartTime = {this.getStartTime}
          getEndGame={this.getEndGame}
        />
        <div>
          <h3 style={{ textAlign: "center" }}>Hello {this.state.user}</h3>
          <div className="d-flex justify-content-between button-zone">
            <History
              {...this.state}
              setTheState={this.setTheState}
              timeTravel={this.timeTravel}
              resetGame={this.resetGame}
            />
            {this.state.user ? (
              <ul className="ranking-board">
                {tempRank.map((x) => {
                  return (
                    <li>
                      Player {x.player} completed in {x.score}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div>
                <FacebookLogin
                  autoLoad={true}
                  appId="2551580428277199"
                  fields="name,email,picture"
                  callback={(resp) => this.responseFacebook(resp)}
                />
              </div>
            )}
          </div>
        </div>
        <h1>Your time: {this.state.score}</h1>
      </div>
    );
  }
}

export default App;

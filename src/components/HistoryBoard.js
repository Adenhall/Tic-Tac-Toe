import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

export default class History extends Component {
    render() {
        return (
                <div style={{display: "flex", flexDirection:"column"}}>
                    <Button variant="success" onClick={() => this.props.resetGame()}>GAME RESET</Button>
                    {this.props.history.map((x,idx) => {return <Button style={{marginTop: "10px"}} variant="danger" onClick={() => {this.props.timeTravel(idx)}}>Move {idx+1}</Button>})}
                </div>
        )
    }
}

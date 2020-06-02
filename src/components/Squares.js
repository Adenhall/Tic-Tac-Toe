import React, { Component } from 'react'
import X from './img/xMark.png'
import O from './img/circle.png'

export default class Squares extends Component {
    render() {
        return (
            <div style={{width: "200px", height: "200px", border: "1px solid black"}} onClick={() => this.props.boxClick()}>
                {this.props.value === "X" ? <img style={{width: "150px", margin:"20px auto auto 20px"}} src={X}/> : this.props.value === "O" ? <img style={{width: "150px", margin:"20px auto auto 20px"}} src={O}/> : '' }
            </div>
        )
    }
}

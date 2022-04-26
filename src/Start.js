import React from "react"

export default function Start(props) {
    return (
        <div className="container">
            <h1 className="tittle">Quizzical</h1>
            <p className="sub-text">How good are you at trivia?</p>
            <button className="btn btn-start" onClick={props.handleStartClick}>Start quiz</button>
        </div>
    )
}
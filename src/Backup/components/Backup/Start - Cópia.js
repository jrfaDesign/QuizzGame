import React from "react";
import ReactDOM from "react-dom";

export default function Start(props){
    return(
        <div className="container">

            <h1 className="tittle">Quizzical</h1>    
            <p className="sub-text"> Are you ready for some trivia questions?</p>
            <button 
                className="btn btn-start"
                onClick={props.startHandle}
                >
                Start quiz
            </button>
        </div>
    )
}
import React from "react";
import ReactDOM from "react-dom";

export default function Questions(props){



    function declarateStyle(option) {
        if (!props.submit){
            return "answear option-btn"
        }

        if (props.submit){
            let styleAnswer = ""
            for( let i = 0; i < props.question; i++ ) {
                if(option.isSelected){
                    if(option.answear === props.newQuizz[i].correct_answer){
                        return styleAnswer = "correct"
                    }
                } else{
                    return styleAnswer = "wrong"
                }
            }
            return `answear option-btn locked ${styleAnswer}` 
            
        }
        
    } 
    const allAnswers = props.answears.map( option => {
        //console.log(option)
        return(
            <div key={`label - ${option.id}`}>
                <input

                    type="radio"
                    value={option.answear}
                    id={option.id}
                    name={props.id}

                    checked={props.isSelected}
                    onChange={() => props.handleSelection(props.id, option.id, option.answer)} 
                >
                
                </input>
                 
            <label
                htmlFor={option.id}
                className={declarateStyle(option)}

            >
                {option.answer}
            </label>
            </div>
        
        )
    })

    return(
        <div className="container--questions" >
            <h3 className="question">{props.question}</h3>
            <div className="container--answear">
                {allAnswers}
            </div>
        </div>

    )
}
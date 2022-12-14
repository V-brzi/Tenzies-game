import React from 'react'

export default function Die(props){

    return (
        <div className="die" id={props.id}>
            <img className={props.isHeld ? "die-img held" : "die-img"}
            id={props.id} 
            onClick={(event) => props.holdDiceNumber(event)} 
            src={`images/Dice-img${props.value}.png`} 
            alt="die" />
        </div>
    )
}
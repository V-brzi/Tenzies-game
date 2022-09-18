import React from 'react'
import { useState, useEffect } from 'react'
import './App.css'
import Die from './components/Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'


function App() {

  const [round, setRound] = useState(1)
  const [time, setTime] = useState(60)
  const [allDice, setAllDice] = useState(firstRoll)
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const timeLeft = setTimeout(timer, 1000)
    if(time <= 0 || tenzies){
      clearTimeout(timeLeft)
    }
  }, [time])
  


  function timer(){
    setTime(oldTime => oldTime = oldTime - 1)
    return time
  }

  useEffect(()=>{
    const allHeld = allDice.every(dice => dice.isHeld)
    const firstValue = allDice[0].value
    const allValue = allDice.every(dice => dice.value === firstValue)

    if(allHeld && allValue){
      setTenzies(true)
    }
    
  }, [allDice])

  function firstRoll(){
    let setAllDices = []
    setRound(1)
    for(let i = 0; i < 10; i++){
      setAllDices.push({
        id: nanoid(),
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false
      })
    }
    return setAllDices
  }

  function reRoll(){
    if(tenzies || time <= 0){
      setAllDice(firstRoll)
      setTime(60)
      return setTenzies(false)
    }
    
    setRound(oldRound => oldRound = oldRound + 1)
    setAllDice(allDice.map(dice => dice.isHeld ? {...dice} : {...dice, value: Math.floor(Math.random() * 6) + 1}))
  }


  function holdDiceNumber(event){
    setAllDice(oldAllDice => oldAllDice.map(oldDice => 
      event.target.id === oldDice.id ? ({...oldDice, isHeld: !oldDice.isHeld}) : ({...oldDice})
    ))
  }


  const allDiceHtml = (allDice.map(dice => 
    <Die 
      key={dice.id} 
      id={dice.id} 
      value={dice.value} 
      isHeld={dice.isHeld} 
      holdDiceNumber={holdDiceNumber} 
    />))
    

  return (
    <main>

      {time !== 0 ?
        <div className='game-container'>
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className='dies-container'>
            {allDiceHtml}
          </div>
          <p>time remaining {time}s</p>
        </div> : <p>time expired, start new game?</p>}
      
      {tenzies ?
            <div className='finnished-game'>
              <h4>You finnished the game in {round} {"rolls !"}</h4>
              <Confetti className='confetti'/>
            </div>
          : <h4>{"total rolls:"} {round}</h4>}

        <button className ='roll-dices' onClick = {reRoll}>{tenzies || time <= 0 ? "New game" : "Roll"}</button>

    </main>
  )
}

export default App

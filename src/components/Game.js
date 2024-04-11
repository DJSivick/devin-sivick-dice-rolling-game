import Button from "./common/buttons";
import { useEffect, useState } from "react";


const Game = ({}) => {
    const diceArray = [
        {id:0 ,
            frozen: false,
            faceNumber: Math.floor(Math.random() * 6) + 1},
        {id:1 ,frozen: false,
            faceNumber: Math.floor(Math.random() * 6) + 1},
        {id:2 ,frozen: false,
            faceNumber: Math.floor(Math.random() * 6) + 1},
        {id:3 ,frozen: false,
            faceNumber: Math.floor(Math.random() * 6) + 1},
        {id:4 ,frozen: false,
            faceNumber: Math.floor(Math.random() * 6) + 1}]

const [diceValues, setDiceValues] = useState(diceArray)
const [won, setWon] = useState(false)
const [rollsLeft, setRollsLeft] = useState(3)
const [showTryAgain, setShowTryAgain] = useState(false)
const [message, setMessage] = useState('')


useEffect(() =>{
    if(!checkWin(diceValues)){
        setMessage("YOU WIN!")
    }
}, [rollsLeft])

const onRollDice = () => {
    if (rollsLeft > 0) {
        setRollsLeft(rollsLeft - 1);
        const newDiceValues = diceValues.map((dice) => {
          if (dice.frozen !== true) {
            return {...dice, faceNumber: Math.floor(Math.random() * 6) + 1}
          } else {
            return dice;
          }
        });
        setDiceValues(newDiceValues);
    }
}

const onFreeze = (id) => {
    if (rollsLeft < 3) {
        const newDiceValues = [...diceValues];
        newDiceValues[id].frozen = !diceValues[id].frozen
        setDiceValues(newDiceValues);
        console.log("NEW DICE VALUES", newDiceValues)
}
}

const checkWin = (diceArray) =>{
    const firstDiceFace = diceArray[0].faceNumber
    for (let i = 1; i < diceArray.length; i++) {
        if (diceArray[i].faceNumber !== firstDiceFace) {
          return false; 
    }
    }
    return true;
}


const resetGame = () => {
    setRollsLeft(3)
    setDiceValues(diceArray);
    setWon(false)
}


  return (
    <>
    {won && <div>{message} </div>}
    <div> Rolls Left: {rollsLeft}</div>
    {diceValues.map((dice) => (
          <button 
          onClick={() => onFreeze(dice.id)}>
            {dice.faceNumber}
          </button>
        ))}
      <div>
        {<Button onButtonClick={onRollDice}>Roll!</Button>}
        {rollsLeft === 0 && <Button onButtonClick={resetGame}>Reset Game</Button>}
    </div>
    </>
  );
};

export default Game;
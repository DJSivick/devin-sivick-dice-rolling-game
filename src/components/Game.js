import Button from "./common/buttons";
import { useState } from "react";
import Die from "./common/Die";
import "../styles/game-container.css";
import "../styles/text.css";
import "../styles/button.css";

const Game = () => {
  const diceArray = [
    { id: 0, frozen: false, faceNumber: Math.floor(Math.random() * 6) + 1 },
    { id: 1, frozen: false, faceNumber: Math.floor(Math.random() * 6) + 1 },
    { id: 2, frozen: false, faceNumber: Math.floor(Math.random() * 6) + 1 },
    { id: 3, frozen: false, faceNumber: Math.floor(Math.random() * 6) + 1 },
    { id: 4, frozen: false, faceNumber: Math.floor(Math.random() * 6) + 1 },
  ];

  const [diceValues, setDiceValues] = useState(diceArray);
  const [showMessage, setShowMessage] = useState(false);
  const [rollsLeft, setRollsLeft] = useState(3);
  const [message, setMessage] = useState("");
  const [showRollButton, setShowRollButton] = useState(true);
  const [won, setWon] = useState(false);
  const [showCount, setShowCount] = useState(true)

  const onRollDice = () => {
    if (rollsLeft > 0) {
      setRollsLeft(rollsLeft - 1);
      const newDiceValues = diceValues.map((dice) => {
        if (dice.frozen !== true) {
          return { ...dice, faceNumber: Math.floor(Math.random() * 6) + 1 };
        } else {
          return dice;
        }
      });
      setDiceValues(newDiceValues);
      if (checkWin(newDiceValues)) {
        setShowRollButton(false);
        setShowMessage(true);
        setMessage("WINNER :D");
        setWon(true);
        setShowCount(false)
      }
      if (rollsLeft === 1 && !checkWin(newDiceValues)) {
        setShowRollButton(false);
        setShowMessage(true);
        setMessage("TRY AGAIN :(");
        setWon(false);
        setShowCount(false);
      }
    }
  };

  const onFreeze = (id) => {
    if (rollsLeft < 3) {
      const newDiceValues = [...diceValues];
      newDiceValues[id].frozen = !diceValues[id].frozen;
      setDiceValues(newDiceValues);
      console.log("NEW DICE VALUES", newDiceValues);
    }
  };

  const checkWin = (diceArray) => {
    const firstDiceFace = diceArray[0].faceNumber;
    for (let i = 1; i < diceArray.length; i++) {
      if (diceArray[i].faceNumber !== firstDiceFace) {
        return false;
      }
    }
    return true;
  };

  const resetGame = () => {
    setRollsLeft(3);
    setDiceValues(diceArray);
    setShowMessage(false);
    setMessage("");
    setShowRollButton(true);
    setWon(false);
    setShowCount(true)
  };

  return (
    <div className="game-container">
      {showMessage && <div className={won ? "won" : "lost"}>{message}</div>}
      {showCount && (
        <div className="bold-white-text"> ROLLS LEFT: {rollsLeft}</div>
      )}
      {diceValues.map((dice) => (
        <Die
          frozen={dice.frozen}
          face={dice.faceNumber}
          onClick={() => onFreeze(dice.id)}
        ></Die>
      ))}
      <div>
        {showRollButton && <Button onButtonClick={onRollDice}>ROLL!</Button>}

        {(rollsLeft === 0 || won) && (
          <Button
            className={won ? "button-won" : "button-lost"}
            onButtonClick={resetGame}
          >
            Reset Game
          </Button>
        )}
      </div>
    </div>
  );
};

export default Game;

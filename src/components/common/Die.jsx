import React from 'react'
import "../../styles/dice.css"

const Die = ({frozen, face, onClick}) => {
  return (
    <img src={`/images/dice${face}.svg`} onClick={onClick} alt={`Dice ${face}`} className={frozen && "disabled"}/>
  )
}

export default Die
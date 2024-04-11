import React from 'react'
import "../../styles/button.css"

const Button = ({children, onButtonClick, disabled, className}) => {
  return (
    <button className={className ? className : "button2"} disabled={disabled} onClick={onButtonClick}>
      {children}
    </button>
  )
}

export default Button
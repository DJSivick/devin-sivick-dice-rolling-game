import React from 'react'

const Die = ({face, freeze}) => {
  return (
    <button disabled={freeze}>
        {face}
    </button>
  )
}

export default Die
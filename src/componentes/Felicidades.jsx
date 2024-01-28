import React from 'react'
import './Felicidades.css'

function Felicidades({attempts, onRestart}) {
  return (
    <div className='divFelicidades1'>
        <div className='divFelicidades2'>
        <h1>Felicidades, has ganado!</h1>
        <h2>Eres todo un Maestro Pokemon!</h2>
        <p>Intentos realizados: {attempts}</p>
        <button onClick={onRestart}>Volver a jugar</button>
        </div>

    </div>
  )
}

export default Felicidades
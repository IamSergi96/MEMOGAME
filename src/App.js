import { useState } from 'react';
import './App.css';
import Game from './componentes/Game';
import Felicidades from './componentes/Felicidades';

const cartas=
[
    {
        id: 1,
        name: "Arceus",
        img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/493.png",
    },
    {
        id: 2,
        name: "Giratina",
        img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/487.png",
    },
    {
        id: 3,
        name: "Mewtwo",
        img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png",
    },
    {
        id: 4,
        name: "Kyurem",
        img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/646.png",
    },
    {
        id: 5,
        name: "Ho-oh",
        img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/250.png",
    },
    {
        id: 6,
        name: "Rayquaza",
        img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/384.png",
    },
    {
        id: 7,
        name: "Arceus",
        img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/493.png",
    },
    {
        id: 8,
        name: "Giratina",
        img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/487.png",
    },
    {
        id: 9,
        name: "Mewtwo",
        img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png",
    },
    {
        id: 10,
        name: "Kyurem",
        img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/646.png",
    },
    {
        id: 11,
        name: "Ho-oh",
        img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/250.png",
    },
    {
        id: 12,
        name: "Rayquaza",
        img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/384.png",
    },
  ]
function App() {
    const[gameComplete, setGameComplete] = useState(false)
    const[attempts, setAttempts] = useState(0)

    const handleGameComplete = (attempts)=>{
        setGameComplete(true);
        setAttempts(attempts);
    }
    const handleRestartGame = () =>{
        setGameComplete(false);
    }
  return (
<div>
      {gameComplete ? (
        <Felicidades attempts={attempts} onRestart={handleRestartGame} />
      ) : (
        <Game onGameComplete={handleGameComplete} cartas={cartas} />
      )}
    </div>

  );
}

export default App;

import React, { useState, useEffect, useCallback } from "react";
import './Game.css';

const Game = ({ cartas, onGameComplete }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [matches, setMatches] = useState(0);
  const [disabledCards, setDisabledCards] = useState(Array(cartas.length).fill(false));

  const initializeGame = useCallback(() => {
    const shuffledCartas = shuffle(cartas);
    console.log("Shuffled Cartas:", shuffledCartas);
    setSelectedItems([]);
    setAttempts(0);
    setMatches(0);
    setDisabledCards(Array(shuffledCartas.length).fill(false));
  }, [cartas]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    if (matches === cartas.length / 2) {
      onGameComplete(attempts);
    }
  }, [matches, cartas.length, attempts, onGameComplete]);

  const shuffle = (array) => {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  const handleCardClick = (index) => {
    if (disabledCards[index]) {
      return; // Carta desactivada, no hacer nada
    }

    setAttempts((prevAttempts) => prevAttempts + 1);
    const updatedSelectedItems = [...selectedItems, index];
    setSelectedItems(updatedSelectedItems);

    if (updatedSelectedItems.length === 2) {
      checkMatch(updatedSelectedItems);
    }
  };

  const checkMatch = (selectedItems) => {
    const [index1, index2] = selectedItems;

    if (cartas[index1] && cartas[index2] && cartas[index1].name === cartas[index2].name) {
      setMatches((prevMatches) => prevMatches + 1);
      setDisabledCards((prevDisabled) => {
        const updatedDisabled = [...prevDisabled];
        updatedDisabled[index1] = true;
        updatedDisabled[index2] = true;
        return updatedDisabled;
      });
    }

    // Voltea las cartas de nuevo después de un breve intervalo
    setTimeout(() => {
      setSelectedItems([]);
    }, 500);
  };

  return (
    <div className="gallery">
      <div className="div1">
        {cartas.map((item, index) => (
          <div
            key={index}
            className={`div2 ${disabledCards[index] ? "flipped disabled" : "flipped"}`}
            onClick={() => handleCardClick(index)}
          >
            <img
              src={selectedItems.includes(index) || disabledCards[index] ? item.img : "https://images.wikidexcdn.net/mwuploads/wikidex/thumb/9/94/latest/20230212115022/Parte_trasera_carta_de_Pok%C3%A9mon.png/180px-Parte_trasera_carta_de_Pok%C3%A9mon.png"}
              alt={item.name}
              className="image"
            />
          </div>
        ))}
      </div>
      <div className="divCounter">
        <p>Intentos: {attempts}</p>
        <p>Aciertos: {matches}</p>
      </div>
    </div>
  );
}

export default Game;

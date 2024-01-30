import React, { useState, useEffect, useCallback } from "react";
import './Game.css';

//creo Game (tablero) que tendra dos propiedades: cartas y cuando se complete
const Game = ({ cartas, onGameComplete }) => {
  //almaceno los estados de las cartas (seleccionadas y deshabilitadas cuando se seleccionen), el marcador de intentos y aciertos que seran useState porque variaran
  const [selectedItems, setSelectedItems] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [matches, setMatches] = useState(0);
  const [disabledCards, setDisabledCards] = useState(Array(cartas.length).fill(false));

  const initializeGame = useCallback(() => {
    //inicializo el Game con useCallback, restableciendo los estqados y barajando las cartas (shuffle) cuando la propiedad cartas cambie
    const shuffledCartas = shuffle(cartas);
    console.log("Shuffled Cartas:", shuffledCartas);
    setSelectedItems([]);
    setAttempts(0);
    setMatches(0);
    setDisabledCards(Array(shuffledCartas.length).fill(false));
  }, [cartas]);

  //use useEffect para iniciar el juego cuando se monta el componente y cada vez qeu cambian las cartas
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);
//vuelvo a usar useEffect para verificar el fin del juego (puntuacion maxima de 6 (12/2))
  useEffect(() => {
    if (matches === cartas.length / 2) {
      onGameComplete(attempts);
      //verifico y llamo a la funcion para cuando se completa el juego onGameComplete
    }
  }, [matches, cartas.length, attempts, onGameComplete]);

  //funciones shuffle para barajar, handleCardClick para manejar los clics en carta y actualizar e checkMatch, checkMatch para ver si coinciden y hacen match
  const shuffle = (array) => {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
//he encontrado esta logica porque no me salia de otra forma, he usado while
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

    // Voltea las cartas de nuevo después de 500ms
    setTimeout(() => {
      setSelectedItems([]);
    }, 500);
  };
//renderizar las cartas y mostrar intentos y aciertos
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

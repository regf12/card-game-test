import { useState, useEffect, MouseEvent } from "react";
import CardComponent from "./CardComponent"
import Notify from "./Notify"
import { Card, shuffleArray, createCard, initDeck } from "@/utils/methods"

export default function GameTable({ }) {

  const [decks, setDecks] = useState<Card[][]>([[], [], []]);
  const [showVictory, setShowVictory] = useState<boolean>(false);
  const [numero, setNumero] = useState<number | null>(null);

  const moveCard = (index: number, name: string) => {
    setDecks([[], [], []])

    const nextIndex = index < 2 ? index + 1 : 0;
    let datos: Card[][] = decks;
    let sourceDeck: Card[] = decks[index];
    let targetDeck: Card[] = decks[nextIndex];

    const cardIndex = sourceDeck.findIndex((card: Card) => card.name === name);
    if (cardIndex !== -1) {

      const movedCard = sourceDeck.splice(cardIndex, 1)[0];

      targetDeck.push(movedCard);

      datos[index] = sourceDeck;
      datos[nextIndex] = targetDeck;

      setTimeout(() => {
        setDecks(datos);
      }, 1);
    }
  };

  const resetGame = () => {
    setDecks([[], [], []])
    setNumero(null);

    const numeroAleatorio = Math.floor(Math.random() * 4) + 1;

    setTimeout(() => {
      setNumero(numeroAleatorio);
      setDecks([shuffleArray(initDeck()), [], []]);
    }, 1);
  }

  const verifyVictory = () => {
    if (decks.length === 0) return false;

    const lastValues = decks.map(array => {
      if (array.length === 0) return null;

      return array[array.length - 1].value;
    });

    setShowVictory(lastValues.every(value => value === numero));
  }

  useEffect(() => {
    verifyVictory();
  }, [decks]);

  useEffect(() => {
    resetGame()
  }, []);

  return (<>

    <div className="w-full h-full">

      <div className="w-full h-full">
        <div className="container mx-auto">

          <div className="px-3 py-5 flex justify-between">
            <span>{numero != null ? <h3>Valor objetivo: {numero}</h3> : null}</span>
            <button onClick={resetGame}>Reset Game</button>
          </div>

          <div className="px-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 py-5">
            {decks.map((deck, index) => (
              deck ? <div key={index} className="flex justify-center items-center p-2">
                <div className="border border-gray-200 rounded p-2 w-[120px] h-[170px]">

                  {deck.length ? <span onClick={() => moveCard(index, deck[deck.length - 1].name)}>
                    {deck[deck.length - 1] ? <CardComponent figure={deck[deck.length - 1].figure} value={deck[deck.length - 1].value} /> : null}
                  </span> : null}

                </div>
              </div> : null
            ))}
          </div>

          {showVictory && <div className="px-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 py-5">
            <Notify />
          </div>}

        </div>
      </div>

    </div>

  </>)
}
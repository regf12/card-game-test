import { useState, useEffect, MouseEvent } from "react";
import Card from "./Card"

interface Card {
  name: string;
  value: number;
  figure: string;
  url: string;
}

export default function GameTable({ }) {

  const figures = ['diamond', 'pica', 'heart']
  const [deckDefault, setDeckDefault] = useState<Card[]>([]);
  const [shuffledDeck, setShuffledDeck] = useState<string[]>([]);
  const [decks, setDecks] = useState<Card[][]>([[], [], []]);

  function shuffleArray(array: Card[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  const createCard = (figure: string, value: number): Card => {
    return {
      name: `${figure}-${value}`,
      url: `${figure}-${value}.jpg`,
      figure,
      value
    }
  }

  const initDeck = () => {
    let deck: Card[] = [];

    for (const figure of figures) {
      for (let j = 1; j <= 4; j++) {
        const card = createCard(figure, j);
        deck.push(card);
      }
    }

    setDeckDefault(deck);
  }

  const moveCard = (index: number, name: string) => {
    setDecks([[],[],[]])

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
    setDecks([[],[],[]])

    setTimeout(() => {
      setDecks([shuffleArray(deckDefault), [], []]);
    }, 1);
  }

  useEffect(() => {
    initDeck();

  }, []);

  useEffect(() => {
    if (deckDefault) {
      resetGame()
    }
  }, [deckDefault]);

  return (<>

    <div className="w-full h-full">

      <div className="w-full h-full">
        <div className="container mx-auto">

          <div className="px-3 grid py-5">
            <button onClick={resetGame}>Reset Game</button>
          </div>

          {/* <hr />

          <div className="px-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 py-5">
            {decks.map((deck, index) => (
              <div key={index} className="border border-gray-200 rounded flex justify-center items-center flex-col">
                {deck.map((card: Card, index) => (
                  <p key={index}>{card?.name || ''}</p>
                ))}
              </div>
            ))}
          </div>

          <hr /> */}

          <div className="px-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 py-5">

            {decks.map((deck, index) => (
              <div key={index} className="border border-gray-200 rounded flex justify-center items-center">
                <span onClick={() => moveCard(index, deck[deck.length - 1].name)}>
                  {/* {deck[deck.length - 1] ? deck[deck.length - 1].name : null} */}
                  {deck[deck.length - 1] ? <Card figure={deck[deck.length - 1].figure} value={deck[deck.length - 1].value} /> : null}
                </span>
              </div>
            ))}

          </div>
        </div>
      </div>

    </div>

  </>)
}
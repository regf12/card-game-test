const figures = ['diamond', 'pica', 'heart'];

export interface Card {
  name: string;
  value: number;
  figure: string;
  url: string;
}

export function shuffleArray(array: Card[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export const createCard = (figure: string, value: number): Card => {
  return {
    name: `${figure}-${value}`,
    url: `${figure}-${value}.jpg`,
    figure,
    value
  }
}

export const initDeck = () => {
  let deck: Card[] = [];

  for (const figure of figures) {
    for (let j = 1; j <= 4; j++) {
      const card = createCard(figure, j);
      deck.push(card);
    }
  }

  return deck;
}
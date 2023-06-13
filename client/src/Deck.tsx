import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import cardService from "./services/cardService";
import deckService from "./services/deckService";
import { TDeck } from "./services/decksService";
import Header from "./Header";

interface DeckResponse {
  data: {
    cards: string[];
    _id: string;
    title: string;
  };
}

const Deck = () => {
  const [text, setText] = useState("");
  const [deck, setDeck] = useState<TDeck | null>(null);
  const [cards, setCards] = useState<string[]>([]);
  const { deckId } = useParams();

  useEffect(() => {
    deckService.getDeck(deckId!).then((res: DeckResponse) => {
      setDeck(res.data);
      setCards(res.data.cards);
    });
  }, [deckId]);

  const handleCreateDeck = (e: React.FormEvent) => {
    e.preventDefault();

    cardService
      .createCard(deckId!, text)
      .then(({ data: { cards: serverCards } }) => {
        setCards(serverCards);
      });

    setText("");
  };

  const handleDeleteCard = (index: number) => {
    if (!deckId) return;
    cardService
      .deleteCard(deckId, index)
      .then(({ data: { cards: serverCards } }) => {
        setCards(serverCards);
      });
  };

  return (
    <>
      <Header />
      <div className="mainWrap">
        <h1>{deck?.title}</h1>
        <ul className="decks">
          {cards.map((card, index) => (
            <li key={index}>
              <button className="btn" onClick={() => handleDeleteCard(index)}>
                x
              </button>
              {card}
            </li>
          ))}
        </ul>
        <form onSubmit={handleCreateDeck}>
          <label htmlFor="card-text">Card Text</label>
          <input
            id="card-text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setText(e.target.value)
            }
            value={text}
          />
          <button>Create Card</button>
        </form>
      </div>
    </>
  );
};

export default Deck;

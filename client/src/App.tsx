import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import deckService, { Deck } from "./services/deckService";

function App() {
  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    deckService.getAllDecks().then((res) => {
      setDecks(res.data);
    });
  }, []);

  const handleCreateDeck = (e: React.FormEvent) => {
    e.preventDefault();

    deckService.createDeck(title).then(({ data: newdeck }) => {
      setDecks([...decks, newdeck]);
    });

    setTitle("");
  };

  const handleDeleteDeck = (deckId: string) => {
    deckService.deleteDeck(deckId);
    setDecks(decks.filter((deck) => deck._id !== deckId));
  };

  return (
    <div className="mainWrap">
      <ul className="decks">
        {decks.map((deck, index) => (
          <li key={index}>
            <button className="btn" onClick={() => handleDeleteDeck(deck._id)}>
              x
            </button>

            <Link to={`decks/${deck._id}`}> {deck.title}</Link>
          </li>
        ))}
      </ul>
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title</label>
        <input
          id="deck-title"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          value={title}
        />
        <button>Create Deck</button>
      </form>
    </div>
  );
}

export default App;

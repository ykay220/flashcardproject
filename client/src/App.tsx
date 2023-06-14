import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import deckService, { TDeck } from "./services/decksService";
import Header from "./Header";

function App() {
  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState<TDeck[]>([]);

  useEffect(() => {
    deckService.getAllDecks().then((res) => {
      setDecks(res.data);
    });
  }, []);

  const handleCreateDeck = (e: React.FormEvent) => {
    e.preventDefault();

    const lowercaseTitle = title.toLowerCase();

    const isDuplicate = decks.some((deck) => deck.title === lowercaseTitle);
    console.log(isDuplicate);
    if (isDuplicate) {
      // Handle the duplicate case, such as showing an error message
      console.log("Duplicate title. Please enter a unique title.");
      return;
    }

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
    <>
      <Header />
      <div className="mainWrap extra">
        <h1>Your Decks</h1>
        <ul className="decks">
          {decks.map((deck, index) => (
            <li key={index}>
              <button
                className="btn"
                onClick={() => handleDeleteDeck(deck._id)}
              >
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
    </>
  );
}

export default App;

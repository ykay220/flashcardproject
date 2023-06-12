import { useEffect, useState } from "react";

import "./App.css";
import axios from "axios";

interface Deck {
  _id: string;
  title: string;
}

function App() {
  const [title, setTitle] = useState("");
  const [decks, setDecks] = useState<Deck[]>([]);

  // const handleCreateDeck = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   await fetch("http://localhost:5000/decks", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       title,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   setTitle("");
  // };

  const handleCreateDeck = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:5000/decks",
        { title },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(({ data: newdeck }) => {
        setDecks([...decks, newdeck]);
      });

    setTitle("");
  };

  const handleDeleteDeck = (deckId: string) => {
    console.log(deckId);
    axios.delete(`http://localhost:5000/decks/${deckId}`);
    setDecks(decks.filter((deck) => deck._id !== deckId));
  };

  useEffect(() => {
    axios.get<Deck[]>("http://localhost:5000/decks").then((res) => {
      setDecks(res.data);
    });
  }, []);

  return (
    <div className="mainWrap">
      <ul className="decks">
        {decks.map((deck, index) => (
          <li key={index}>
            <button onClick={() => handleDeleteDeck(deck._id)}>x</button>
            {deck.title}
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

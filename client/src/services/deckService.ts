import apiClient from "./apiClient";

export interface Deck {
  _id: string;
  title: string;
}

class DeckService {
  getAllDecks() {
    return apiClient.get<Deck[]>("/decks");
  }

  createDeck(title: string) {
    return apiClient.post(
      "/decks",
      { title },
      { headers: { "Content-Type": "application/json" } }
    );
  }

  deleteDeck(deckId: string) {
    return apiClient.delete(`/decks/${deckId}`);
  }
}

export default new DeckService();

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

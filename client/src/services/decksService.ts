import apiClient from "./apiClient";

export interface TDeck {
  _id: string;
  cards: string[];
  title: string;
}

class DecksService {
  getAllDecks() {
    return apiClient.get<TDeck[]>("/decks");
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

export default new DecksService();

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

import apiClient from "./apiClient";

class CardService {
  createCard(deckId: string, text: string) {
    return apiClient.post(
      `/decks/${deckId}/cards`,
      { text },
      { headers: { "Content-Type": "application/json" } }
    );
  }

  deleteCard(deckId: string, index: number) {
    return apiClient.delete(`/decks/${deckId}/cards/${index}`);
  }
}

export default new CardService();

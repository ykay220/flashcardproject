import apiClient from "./apiClient";

class DeckService {
  getDeck(deckId: string) {
    return apiClient.get(`/decks/${deckId}`);
  }
}

export default new DeckService();

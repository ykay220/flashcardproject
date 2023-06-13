import Deck from "../models/Deck";
import { Request, Response } from "express";

class DeckController {
  async getDecksController(req: Request, res: Response) {
    const decks = await Deck.find();
    res.json(decks);
  }

  async createDecksController(req: Request, res: Response) {
    const newDeck = new Deck({
      title: req.body.title,
    });
    const createdDeck = await newDeck.save();
    res.json(createdDeck);
  }

  async deletDecksController(req: Request, res: Response) {
    const deckId = req.params.deckId;
    const deck = await Deck.findByIdAndDelete(deckId);
    res.json(deck);
  }
}

export default new DeckController();

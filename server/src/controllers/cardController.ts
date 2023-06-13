import Deck from "../models/Deck";
import { Request, Response } from "express";

class CardController {
  async getDeckController(req: Request, res: Response) {
    const { deckId } = req.params;
    const deck = await Deck.findById(deckId);
    res.json(deck);
  }
  async createCardForDeckController(req: Request, res: Response) {
    const deckId = req.params.deckId;
    const deck = await Deck.findById(deckId);
    if (!deck) return res.status(400).send("no deck of this id exists");
    const { text } = req.body;
    deck.cards.push(text);
    await deck.save();
    res.json(deck);
  }

  async deletCardForDeckController(req: Request, res: Response) {
    const deckId = req.params.deckId;
    const deck = await Deck.findById(deckId);
    const index = req.params.index;
    if (!deck) return res.status(400).send("no deck of this id exists");
    deck.cards.splice(parseInt(index), 1);
    await deck.save();
    res.json(deck);
  }
}

export default new CardController();

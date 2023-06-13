import DeckModel from "../models/Deck";
import Deck from "../models/Deck";
import { Request, Response } from "express";

class DeckController {
  async getDecksController(req: Request, res: Response) {
    const decks = await Deck.find();
    res.json(decks);
  }

  async createDecksController(req: Request, res: Response) {
    // const newDeck = new Deck({
    //   title: req.body.title,
    // });
    // const createdDeck = await newDeck.save();
    // res.json(createdDeck);
    const { title } = req.body;

    // Check if the title already exists in the database
    const existingDeck = await DeckModel.findOne({ title });
    if (existingDeck) {
      return res
        .status(400)
        .json({ error: "Duplicate title. Please enter a unique title." });
    }

    const newDeck = new DeckModel({ title });
    await newDeck.save();

    res.status(201).json(newDeck);
  }

  async deletDecksController(req: Request, res: Response) {
    const deckId = req.params.deckId;
    const deck = await Deck.findByIdAndDelete(deckId);
    res.json(deck);
  }
}

export default new DeckController();

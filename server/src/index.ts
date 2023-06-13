import { config } from "dotenv";
import deckController from "./controllers/DeckController";
config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import Deck from "./models/Deck";

const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/decks", deckController.getDecksController);

app.post("/decks", deckController.createDecksController);

app.delete("/decks/:deckId", deckController.deletDecksController);

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});

import { config } from "dotenv";
import deckController from "./controllers/deckController";
import cardController from "./controllers/cardController";
config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/decks", deckController.getDecksController);

app.post("/decks", deckController.createDecksController);

app.delete("/decks/:deckId", deckController.deletDecksController);

app.post("/decks/:deckId/cards", cardController.createCardForDeckController);

app.delete(
  "/decks/:deckId/cards/:index",
  cardController.deletCardForDeckController
);

app.get("/decks/:deckId", cardController.getDeckController);

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening on port ${PORT}`);
  app.listen(PORT);
});

import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;

const DeckSchema = new Schema({
  title: String,
  votes: { type: Number, default: 0 },
});

const DeckModel = mongoose.model("Deck", DeckSchema);

export default DeckModel;

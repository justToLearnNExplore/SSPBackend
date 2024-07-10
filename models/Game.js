const mongoose = require("mongoose");

// Schema for creating Games
const GameSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  images: { type: [String], required: true },
  price: { type: String, required: true },
  players: { type: String, required: true },
  age: { type: String, required: true },
  lo: { type: String, required: true },
  youtubeLink: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Game", GameSchema);

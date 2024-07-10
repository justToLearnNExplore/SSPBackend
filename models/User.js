const mongoose = require("mongoose");

// Creating Schema for User Model
const UserSchema = new mongoose.Schema({
  googleId: { type: String },
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  phone: { type: String },
  raiseEnquiry: [
    {
      gamename: { type: String, required: true },
      gamecategory: { type: String, required: true },
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      message: { type: String, required: true },
      date: { type: Date, default: Date.now }
    }
  ],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Users", UserSchema);

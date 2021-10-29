const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const usersSchema = new Schema({
  _id: {
    type: String,
    required: true,
    lowercase: true,
    required: true,
  },
  userName: { type: String, required: true },
  contactNumber: { type: Number, required: true },
  occupiedSeats: [],
});
const User = mongoose.model("User", usersSchema);

module.exports = User;

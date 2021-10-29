const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const seatsSchema = new Schema({
  _id: { type: Number, required: true },
  noOfNotOccupied: { type: Number, required: true },
  seatsUnoccupied: [],
});
const Seat = mongoose.model("Seat", seatsSchema);

module.exports = Seat;

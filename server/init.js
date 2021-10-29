require("dotenv").config();
require("./db/mongoose.js");
const mongoose = require("mongoose");
const Seats = require("./models/seats");

const seats = [
  {
    _id: 1,

    noOfNotOccupied: 7,

    seatsUnoccupied: ["1A", "1B", "1C", "1D", "1E", "1F", "1G"],
  },
  {
    _id: 2,

    noOfNotOccupied: 7,

    seatsUnoccupied: ["2A", "2B", "2C", "2D", "2E", "2F", "2G"],
  },
  {
    _id: 3,

    noOfNotOccupied: 7,

    seatsUnoccupied: ["3A", "3B", "3C", "3D", "3E", "3F", "3G"],
  },
  {
    _id: 4,

    noOfNotOccupied: 7,

    seatsUnoccupied: ["4A", "4B", "4C", "4D", "4E", "4F", "4G"],
  },
  {
    _id: 5,

    noOfNotOccupied: 7,

    seatsUnoccupied: ["5A", "5B", "5C", "5D", "5E", "5F", "5G"],
  },
  {
    _id: 6,

    noOfNotOccupied: 7,

    seatsUnoccupied: ["6A", "6B", "6C", "6D", "6E", "6F", "6G"],
  },
  {
    _id: 7,

    noOfNotOccupied: 7,

    seatsUnoccupied: ["7A", "7B", "7C", "7D", "7E", "7F", "7G"],
  },
  {
    _id: 8,

    noOfNotOccupied: 7,

    seatsUnoccupied: ["8A", "8B", "8C", "8D", "8E", "8F", "8G"],
  },
  {
    _id: 9,

    noOfNotOccupied: 7,

    seatsUnoccupied: ["9A", "9B", "9C", "9D", "9E", "9F", "9G"],
  },
  {
    _id: 10,

    noOfNotOccupied: 7,

    seatsUnoccupied: ["10A", "10B", "10C", "10D", "10E", "10F", "10G"],
  },
  {
    _id: 11,

    noOfNotOccupied: 7,

    seatsUnoccupied: ["11A", "11B", "11C", "11D", "11E", "11F", "11G"],
  },
  {
    _id: 12,

    noOfNotOccupied: 3,

    seatsUnoccupied: ["12A", "12B", "12C"],
  },
];

Seats.create(seats)
  .then(() => {
    console.log("database initialized");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });

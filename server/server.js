require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
require("./db/mongoose");

const Seats = require("./models/seats");
const Users = require("./models/users");

const app = express();

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/v1/seats/", (req, res) => {
  Seats.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500);
    });
});

app.get("/v1/users/:id", (req, res) => {
  Users.find({ _id: req.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).send();
    });
});

app.post("/v1/seats/", (req, res) => {
  bookSeats(req.body, res);
});

app.listen(process.env.PORT, () => {
  console.log(`Server has started on port ${process.env.PORT}`);
});

const bookSeats = (user, res) => {
  var seatsFound = false;
  const upsertUserDetails = (user) => {
    delete user.noOfSeats;

    Users.find({ _id: user._id })
      .then((data) => {
        if (data.length == 0) {
          Users.create(user)
            .then((docs) => {
              console.log("Success,User Added");
            })
            .catch((err) => console.log(err));
        } else {
          data.occupiedSeats = data.occupiedSeats.concat(user.occupiedSeats);
          Users.updateOne({ _id: user._id }, data[0])
            .then(console.log("Updated Users"))
            .catch((err) => console.log(err));
        }
        res.status(201).json(user);
      })
      .catch((err) => console.log(err));
  };
  const updateSeatDetails = (row) => {
    Seats.updateOne({ _id: row._id }, row)
      .then(console.log("Updated Seats"))
      .catch((err) => console.log(err));
  };
  Seats.find({})
    .then((data) => {
      data.every((row) => {
        if (row.noOfNotOccupied >= user.noOfSeats && !seatsFound) {
          seatsFound = true;
          var occupiedSeats = [];
          for (var index = 0; index < user.noOfSeats; index++) {
            occupiedSeats.push(row.seatsUnoccupied.shift());
          }
          row.noOfNotOccupied -= user.noOfSeats;
          upsertUserDetails({ ...user, occupiedSeats });
          updateSeatDetails(row);
          console.log(row);
        } else {
          console.log("else");
        }
      });
    })
    .catch((err) => console.log(err));
};

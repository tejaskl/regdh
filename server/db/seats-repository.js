const { model } = require("mongoose");
const Seats = require("../models/seats");
const Users = require("../models/users");

async function getAllAvailableSeats() {
  var returnData;
  await Seats.find({})
    .then((data) => {
      returnData = data;
    })
    .catch((err) => {
      return err;
    });
  return returnData;
}

const bookSeats = (user) => {
  const upsertUserDetails = (user) => {
    seatsFound = false;
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
      var seatIndexMap = [];
      data.every((row) => {
        seatIndexMap.push([row._id, row.noOfNotOccupied]);
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

module.exports.getAllAvailableSeats = getAllAvailableSeats;

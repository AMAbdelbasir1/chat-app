const User = require("../models/userDB");
let getFreinds = (socket) => {
  socket.on("getFreinds", (id) => {
    User.findById(id)
      .then((data) => {
        socket.emit("friendsGet", data.freinds);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

//get friends that i can concat with him
let myFriBtn = (socket) => {
  socket.on("getMyFreinds", (id) => {
    User.findById(id)
      .then((data) => {
        socket.emit("myFriendsGet", data.freinds);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
//searchFreinds
let searchFreinds = (socket) => {
  socket.on("searchFreinds", (dataS) => {
    //console.log(dataS);
    User.find({ $or: [{ email: dataS }, { username: dataS }] })
      .then((data) => {
       // console.log(data);
        socket.emit("searchFreindsGet", data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
//exploreFreinds
let exploreFreinds = (socket) => {
  socket.on("exploreFreinds", (id) => {
    User.findById(id)
      .then((myData) => {
        User.find()
          .then((data) => {
            //console.log(myData._id.toString()==id);
            let notFre = data.filter((res) => {
              let fu = true;
              if(myData.freinds.length==0){
                if(res._id.toString() === id){
                   fu=false;
                }
              }
              myData.freinds.forEach((ru) => {
                if (ru.id === res._id.toString() || res._id.toString() === id) {
                  fu = false;
                }
              });
              return fu;
            });
            // console.log(notFre);
            socket.emit("exploreFreindsGet", notFre);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  /**User.find()
      .then((data) => {
        socket.emit("exploreFreindsGet", data);
      })
      .catch((err) => {
        console.log(err);
      }); */
};
//get person that send me Requests
let getRequests = (socket) => {
  socket.on("getRequests", (id) => {
    User.findById(id)
      .then((data) => {
        socket.emit("requestsGet", data.requests);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
module.exports = {
  getFreinds,
  getRequests,
  myFriBtn,
  exploreFreinds,
  searchFreinds,
};

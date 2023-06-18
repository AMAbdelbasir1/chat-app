//  To controll ur website
const express = require("express");
const color = require("colors");
const dotenv = require("dotenv");
const helmet = require("helmet");
dotenv.config({ path: "config.env" });
const app = express();
const server = require("http").createServer(app);
const port = 3000;
//create session
const session = require("express-session");
const sessionStore = require("connect-mongodb-session")(session);
const Store = new sessionStore({
  uri: process.env.DB_URL,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SECRETKEY,
    saveUninitialized: false,
    store: Store,
  }),
);
// setting server

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.static("images"));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
// for auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// mongoose
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.DB_URL)
  .then((result) => {
    console.log("database connected".yellow);
    server.listen(process.env.PORT || port, () => {
      console.log(`BeChat app listening at ${port}`.blue);
    });
  })

  .catch((err) => {
    console.log(err);
  });
/****RealTime connection */
/****get module */
const { joinApp } = require("./sockets/init.js");
const {
  sendConcat,
  cancleConcat,
  rejectConcat,
  acceptConcat,
  DisConcat,
} = require("./sockets/concat.js");
const {
  getFreinds,
  getRequests,
  myFriBtn,
  exploreFreinds,
  searchFreinds,
} = require("./sockets/friends.js");
const { getGroups } = require("./sockets/groups.js");
const { joinChat, sendMsg } = require("./sockets/chat.js");

/***** */
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  //console.log("server connected".red);
  //jpin operation
  joinApp(socket);
  //joinChat
  joinChat(socket);
  sendMsg(socket, io);
  //concat operation
  sendConcat(socket, io);
  cancleConcat(socket, io);
  rejectConcat(socket, io);
  acceptConcat(socket, io);
  DisConcat(socket, io);
  //friends operation
  getFreinds(socket);
  getRequests(socket);
  //myFriBtn
  myFriBtn(socket);
  //searchFreinds
  searchFreinds(socket);
  //exploreFreinds
  exploreFreinds(socket);
  //geoups operation
  getGroups(socket);
});

//Routers

const homeRouter = require("./routes/home.routes");
const authRouter = require("./routes/auth.routes");
const profileRouter = require("./routes/profile.routes");
const imageRouter = require("./routes/image.routes");
const groupRouter = require("./routes/groups.routes");
const chatRouter = require("./routes/chat.routes");

app.use(authRouter);
app.use(homeRouter);
app.use(imageRouter);
app.use("/profile", profileRouter);
app.use(groupRouter);
app.use("/chat", chatRouter);

//  404
app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
});

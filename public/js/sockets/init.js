const socket = io();
const myId = document.getElementById("myId").value;
socket.on("connect", () => {
  console.log("client connected");
  socket.emit("joinApp",myId);
});

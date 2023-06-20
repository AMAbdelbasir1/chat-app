const chatId = document.getElementById("chatId").value;
const myName = document.getElementById("myName").value;
const sendinp = document.getElementById("sendinp");
const sendbtn = document.getElementById("sendbtn");
const conchat = document.getElementById("conchat");
conchat.scrollTop = conchat.scrollHeight;
let time = () => {
  let date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};
socket.emit("joinChat", chatId);
sendbtn.onclick = (e) => {
  e.preventDefault();
  socket.emit("sendMsg", { myId, chatId, myName, content: sendinp.value,time:time() });
};
socket.on("newMsg", (data) => {
 // console.log(data);
  if (data.myId == myId) {
    sendinp.value = "";
    conchat.innerHTML += `  <div class="message-orange">
        <p class="message-content">${data.content}</p>
        <div class="message-timestamp-right">${data.time}</div>
    </div>`;
  } else {
    conchat.innerHTML += ` <div class="message-blue">
        <p class="message-content">${data.content}</p>
        <div class="message-timestamp-left">${data.time}</div>
    </div>`;
  }
conchat.scrollTop = conchat.scrollHeight;
});

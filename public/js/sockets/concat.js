//Data i needs
const userId = document.getElementById("userId").value;
const myImage = document.getElementById("myImage").value;
const myName = document.getElementById("myName").value;
const myEmail = document.getElementById("myEmail").value;
const userName = document.getElementById("userName").value;
const userEmail = document.getElementById("userEmail").value;
const userImage = document.getElementById("userImage").value;
//////////////// get button element
const concBtn = document.getElementById("concBtn");
const canBtn = document.getElementById("canBtn");
const accBtn = document.getElementById("accBtn");
const rejBtn = document.getElementById("rejBtn");
const disCon = document.getElementById("disBtn");
const formConcat = document.getElementById("formConcat");
//send conacat with freind
let concBtnFun = () => {
  const concBtn = document.getElementById("concBtn");
  concBtn.onclick = (e) => {
    e.preventDefault();
    socket.emit("sendConcat", {
      myId,
      myEmail,
      myImage,
      myName,
      userId,
      userEmail,
      userImage,
      userName,
    });
  };
};
if (concBtn) {
  concBtnFun();
}
//cancle concat
let canBtnFun = () => {
  const canBtn = document.getElementById("canBtn");
  canBtn.onclick = (e) => {
    e.preventDefault();
    socket.emit("cancleConcat", {
      myId,
      userId,
    });
  };
};
if (canBtn) {
  canBtnFun();
}

// accept or reject conncat
let accORrej = () => {
  const accBtn = document.getElementById("accBtn");
  const rejBtn = document.getElementById("rejBtn");
  accBtn.onclick = (e) => {
    e.preventDefault();
    socket.emit("acceptConcat", {
      myId,
      myEmail,
      myImage,
      myName,
      userId,
      userEmail,
      userImage,
      userName,
    });
  };
  rejBtn.onclick = (e) => {
    e.preventDefault();
    socket.emit("rejectConcat", {
      myId,
      userId,
    });
  };
};
if (accBtn) {
  accORrej();
}
//DisConcat
let DisConcat = () => {
  const disCon = document.getElementById("disBtn");
  const chatId = document.getElementById("chatId").value;
  disCon.onclick = (e) => {
    e.preventDefault();
    socket.emit("DisConcat", {
      myId,
      userId,
      chatId,
    });
  };
};
if (disCon) {
  DisConcat();
}
/// listen user Needs to Concat
socket.on("conncatSend", () => {
  const concBtn = document.getElementById("concBtn");
  concBtn.remove();
  formConcat.innerHTML += `<input type="submit" value="cancel" id="canBtn">`;
  canBtnFun();
});
socket.on("userNeedCon", () => {
  //console.log("listen connect");
  const concBtn = document.getElementById("concBtn");
  concBtn.remove();
  formConcat.innerHTML += `<div id="reqAns">
<input type="submit" value="accept" id="accBtn">
<input type="submit" value="reject" id="rejBtn">
</div>`;
  accORrej();
});

// listen cancle concat
socket.on("conncatCancel", () => {
  const canBtn = document.getElementById("canBtn");
  canBtn.remove();
  formConcat.innerHTML += `<input type="submit" value="Conncat" id="concBtn">`;
  concBtnFun();
});

socket.on("userCancleCon", () => {
  //console.log("listen cancle");
  const reqAns = document.getElementById("reqAns");
  reqAns.remove();
  formConcat.innerHTML += `<input type="submit" value="Conncat" id="concBtn">`;
  concBtnFun();
});

// listen accept or Reject
socket.on("conncatRejected", () => {
  console.log(" listen rejected for me");
  const reqAns = document.getElementById("reqAns");
  reqAns.remove();
  formConcat.innerHTML += `<input type="submit" value="Conncat" id="concBtn">`;
  concBtnFun();
});

socket.on("userRejectCon", () => {
  console.log(" listen cancle for me");
  const canBtn = document.getElementById("canBtn");
  canBtn.remove();
  formConcat.innerHTML += `<input type="submit" value="Conncat" id="concBtn">`;
  concBtnFun();
});

socket.on("conncatAccpted", (data) => {
 // console.log(" listen rejected for me");
  const reqAns = document.getElementById("reqAns");
  reqAns.remove();
  formConcat.innerHTML += ` <div id="disCon">
  <input type="submit" value="DisConncat" id="disBtn">   <a href="/chat/${data}"> 
        <input type="button" value="Chat" id="chBtn">
    </a>
            </div>`;
            document.getElementById("chatId").value = data;
  DisConcat();

});

socket.on("userAccptedCon", (data) => {
 // console.log(" listen cancle for me");
  const canBtn = document.getElementById("canBtn");
  canBtn.remove();
  formConcat.innerHTML += ` <div id="disCon">
  <input type="submit" value="DisConncat" id="disBtn">
    <a href="/chat/${data}"> 
        <input type="button" value="Chat" id="chBtn">
    </a>
            </div>`;
            document.getElementById("chatId").value = data;
  DisConcat();

});
//conncatDisMatch
socket.on("conncatDisMatch", () => {
  const disCon = document.getElementById("disCon");
  disCon.remove();
  formConcat.innerHTML += `<input type="submit" value="Conncat" id="concBtn">`;
  concBtnFun();
});
socket.on("userDisConcat", () => {
  const disCon = document.getElementById("disCon");
  disCon.remove();
  formConcat.innerHTML += `<input type="submit" value="Conncat" id="concBtn">`;
  concBtnFun();
});
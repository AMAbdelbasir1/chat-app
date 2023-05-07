const contFreind = document.getElementById("contFreind");
let getFreindsFun = () => {
  const getFreinds = document.getElementById("getFreinds");
  getFreinds.onclick = (e) => {
    e.preventDefault();
    socket.emit("getFreinds", myId);
  };
};
//myFriBtn
let myFriBtnFun = () => {
  const myFriBtn = document.getElementById("myFriBtn");
  myFriBtn.onclick = (e) => {
    e.preventDefault();
    socket.emit("getMyFreinds", myId);
  };
  const expBtn = document.getElementById("expBtn");
  expBtn.onclick = (e) => {
    e.preventDefault();
    socket.emit("exploreFreinds", myId);
  };
  const searchBtn = document.getElementById("searchBtn");
  const searchFre = document.getElementById("searchFre");
  
  searchBtn.onclick = (e) => {
    e.preventDefault();
    if (searchFre.value) socket.emit("searchFreinds", searchFre.value);
  };
};

let getReqFun = () => {
  const getReqs = document.getElementById("getReqs");
  getReqs.onclick = (e) => {
    e.preventDefault();
    socket.emit("getRequests", myId);
  };
};

getFreindsFun();
getReqFun();
myFriBtnFun();

//listen

socket.on("friendsGet", (friends) => {
  contFreind.innerHTML = "";
  contFreind.innerHTML += `<div class="ser">
        <input type="text" name="search" id="searchFre" value="" placeholder="search new friends" >
        <input type="button" value="search" id="searchBtn" ><br>
        <div id="serchC">
 <input type="button" class="ser-li activer" value="myFriends" id="myFriBtn">
        <input type="button" class="ser-li" value="Explore" id="expBtn" >
        </div>
    </div> 
    <div id="result" style="display: flex;flex-wrap: wrap;"></div>
    `;
  const result = document.getElementById("result");
  if (friends.length == 0) {
    result.innerHTML += ` <h1 style="color: rgb(202, 194, 194); margin-left: 300px;margin-top: 100px;">
              You have not any freind
            </h1>;`;
  } else {
    for (let fer of friends) {
      result.innerHTML += `<div id="fir">
<img src="/${fer.image} " style="width: 100px;height: 100px;border-radius: 50px;">
<div id="info">
    <p style="color: aquamarine;margin-bottom: 0px; display: none;">New massege</p>
    <p >
<a href="/profile/${fer.id}" id="use" > ${fer.name}</a>
<p></p>
<a href="/profile/${fer.id}" id="use"> ${fer.email}</a>
</p>
<a href="/chat/${fer.chatId}" id="link-btn">Chat</a>
<span id="isonl" style="color: aqua; margin-left: 3px; display: none;">Online</span>
</div>
</div>`;
    }
  }
  activeSrcFun();
  myFriBtnFun();
});
// myFriendsGet
socket.on("myFriendsGet", (friends) => {
  const result = document.getElementById("result");
  result.innerHTML = "";
  if (friends.length == 0) {
    result.innerHTML += ` <h1 style="color: rgb(202, 194, 194); margin-left: 300px;margin-top: 100px;">
              You have not any freind
            </h1>;`;
  } else {
    for (let fer of friends) {
      result.innerHTML += `<div id="fir">
<img src="/${fer.image} " style="width: 100px;height: 100px;border-radius: 50px;">
<div id="info">
    <p style="color: aquamarine;margin-bottom: 0px; display: none;">New massege</p>
    <p >
<a href="/profile/${fer.id}" id="use" > ${fer.name}</a>
<p></p>
<a href="/profile/${fer.id}" id="use"> ${fer.email}</a>
</p>
<a href="/chat/${fer.chatId}" id="link-btn">Chat</a>
<span id="isonl" style="color: aqua; margin-left: 3px; display: none;">Online</span>
</div>
</div>`;
    }
  }
});
//searchFreindsGet

socket.on("searchFreindsGet", (dataEx) => {
  console.log("lsiten here");
  const result = document.getElementById("result");
  result.innerHTML = "";
  if (dataEx.length == 0) {
    result.innerHTML += ` <h1 style="color: rgb(202, 194, 194); margin-left: 300px;margin-top: 100px;">
              May be not Found
            </h1>;`;
  } else {
    for (let fer of dataEx) {
      let flag;
      for (let f of fer.freinds) {
        if (myId == f.id) {
          flag = f.chatId;
        }
      }
      if(flag){
        result.innerHTML += `<div id="fir">
<img src="/${fer.image} " style="width: 100px;height: 100px;border-radius: 50px;">
<div id="info">
    <p >
<a href="/profile/${fer._id}" id="use" > ${fer.username}</a>
<p></p>
<a href="/profile/${fer._id}" id="use"> ${fer.email}</a>
</p>
<a href="/chat/${flag}" id="link-btn">Chat</a>
</div>
</div>`;
      }else{
  result.innerHTML += `<div id="fir">
<img src="/${fer.image} " style="width: 100px;height: 100px;border-radius: 50px;">
<div id="info">
    <p >
<a href="/profile/${fer._id}" id="use" > ${fer.username}</a>
<p></p>
<a href="/profile/${fer._id}" id="use"> ${fer.email}</a>

</p>
</div>
</div>`;
      }
      
    }
  }
});


//exploreFreindsGet

socket.on("exploreFreindsGet", (dataEx) => {
  const result = document.getElementById("result");
  result.innerHTML = "";
  if (dataEx.length == 0) {
    result.innerHTML += ` <h1 style="color: rgb(202, 194, 194); margin-left: 300px;margin-top: 100px;">
              You have not any data yet
            </h1>;`;
  } else {
    for (let fer of dataEx) {
      result.innerHTML += `<div id="fir">
<img src="/${fer.image} " style="width: 100px;height: 100px;border-radius: 50px;">
<div id="info">
    <p >
<a href="/profile/${fer._id}" id="use" > ${fer.username}</a>
<p></p>
<a href="/profile/${fer._id}" id="use"> ${fer.email}</a>
</p>
</div>
</div>`;
    }
  }
});

//requasts listen
socket.on("requestsGet", (requests) => {
  console.log("listen");
  contFreind.innerHTML = "";
  if (requests.length == 0) {
    contFreind.innerHTML += ` <h1 style="color: rgb(202, 194, 194); margin-left: 300px;margin-top: 100px;">
              You have not any requests
            </h1>;`;
  } else {
    for (let fer of requests) {
      contFreind.innerHTML += ` <div id="fir">
<img src="/${fer.image} " style="width: 100px;height: 100px;;border-radius: 50px;">
<div id="info">
    <p >
<a href="/profile/${fer.id}" id="use"> ${fer.name}</a>
<p></p>
<a href="/profile/${fer.id}" id="use"> ${fer.email}</a>
</p>
</div>
</div> `;
    }
  }
});

socket.on("userNeedCon", () => {
  console.log("listen connect");
  const reqsNum = document.getElementById("reqsNum");
  if (reqsNum) {
    reqsNum.innerHTML = +reqsNum.innerHTML + 1;
  } else {
    const sel = document.getElementById("sel");
    sel.innerHTML += `<span id="reqsNum" style="background-color: rgb(204, 55, 55);color: white;border-radius: 50%;opacity: 1;padding: 5px;">1</span>`;
  }
  getGroupFun();
  activeSrcFun();
  activeFun();
  getFreindsFun();
  getReqFun();
});
//userCancleCon
socket.on("userCancleCon", () => {
  console.log("listen cancle connect");
  const reqsNum = document.getElementById("reqsNum");

  reqsNum.innerHTML = +reqsNum.innerHTML - 1;
  if (+reqsNum.innerHTML == 0) {
    reqsNum.remove();
  }
  activeFun();
  activeSrcFun();
  getGroupFun();
  getFreindsFun();
  getReqFun();
});

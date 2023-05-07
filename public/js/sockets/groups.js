let getGroupFun = () => {
const getGroups = document.getElementById("getGroups");
  getGroups.onclick = (e) => {
    e.preventDefault();
    socket.emit("getGroups", myId);
  };
};
getGroupFun();
//listen
/**   */
socket.on("groupsGet", (groups) => {
  contFreind.innerHTML = "";
  if (groups.length == 0) {
    contFreind.innerHTML += ` <a href="/createGroup">
          <input type="button" value="Create" class="ser-li activer">
        </a>`; 
    contFreind.innerHTML += ` <h1 style="color: rgb(202, 194, 194); margin-left: 300px;margin-top: 100px;">
              You have not any groups
            </h1>;`;
  } else {
    contFreind.innerHTML += `<div class="ser">
        <input type="text" name="search" id="searchGroup" value="" placeholder="search new friends" >
        <input type="button" value="search" id="searchGroupBtn" ><br>
        <a href="/createGroup">
          <input type="button" value="Create" class="ser-li activer">
        </a>
    </div> 
    <div id="result" style="display: flex;flex-wrap: wrap;"></div>
    `;
  const result = document.getElementById("result");
    for (let fer of groups) {
      result.innerHTML += `<div id="fir">
<img src="/${fer.image} " style="width: 100px;height: 100px;;border-radius: 50px;">
<div id="info">
    <p style="color: aquamarine;margin-bottom: 0px; display: none;">New massege</p>
    <p >
<p id="use">${fer.name}</p>
<p></p>
<a href="/profile/${fer.adminId}" id="use">Greate by :${fer.adminName}</a>
</p>
<a href="/chat/group/${fer.id}" id="link-btn">Chat</a>
</div>
</div>`;
    }
  }
});

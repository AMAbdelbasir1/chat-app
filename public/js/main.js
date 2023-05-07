let activeFun=()=>{
var header = document.getElementById("sel");
var btns = header.getElementsByClassName("li-nav");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
}
let activeSrcFun = () => {
  var serchC = document.getElementById("serchC");
  var serli = serchC.getElementsByClassName("ser-li");
 for (var i = 0; i < serli.length; i++) {
   serli[i].addEventListener("click", function () {
     var current = document.getElementsByClassName("activer");
     current[0].className = current[0].className.replace("activer", "");
     this.className += " activer";
   });
 }
};
activeFun();
activeSrcFun();
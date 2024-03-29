const name = document.getElementById('name');
const logo = document.getElementById('logo');
const homeBtn = document.getElementById('home');
const welcomeBtn = document.getElementById('welcome');

const url = "https://chatapp-kkt.herokuapp.com/";

let db;
let request = window.indexedDB.open("chatapp", 1);

request.onerror = function(event) {
   console.log("error: ");
};

request.onsuccess = function(event) {
   db = request.result;
   console.log("success: "+ db);
};

request.onupgradeneeded = function(event) {
   let db = event.target.result;
   let userInfo = db.createObjectStore("userInfo", {keyPath: "email"});
}

const readUserInfor = () =>{
  let userInfo = db.transaction("userInfo").objectStore("userInfo");
  userInfo.openCursor().onsuccess = (event) => {
    let cursor = event.target.result;

    if (cursor) {
       console.log(cursor);
       console.log(cursor.value.userName);
       console.log(cursor.value.userName[0]);
       let oldTimeStamp = cursor.value.timeStamp;
       console.log("oldTimeStamp: "+oldTimeStamp);
       let d = new Date();
       let timeStamp = d.getTime();
       console.log("timeStamp: "+timeStamp);
       let distance = parseInt(timeStamp) - parseInt(oldTimeStamp);
       console.log("distance: "+distance);
       if(distance - 1.9*24*60*60*1000> 1*60*60*1000){
         setTimeout(() =>{
           welcomeBtn.click();
         }, 5000);
      } else {
        homeBtn.click();
        }
    }else {
      setTimeout(() =>{
        welcomeBtn.click();
      }, 5000);
    }
  }
}

document.onreadystatechange = function() {
    startServer();
    setTimeout(()=>{
      readUserInfor();
    },1000);
    setTimeout(()=>{
      if (document.readyState === "complete") {
        logo.classList.add('logo-animate');
        setTimeout(() => {
          logo.classList.add('logo-color');
        }, 1400);
        setTimeout(() => {
          name.classList.add('name-animate');
        },2100);
        setTimeout(() => {
          name.classList.add('name-color');
          name.classList.add('slide-up');
        }, 3500);
      }
    },1000);

};

const startServer = () =>{
  $.ajax({
    type: "GET",
    url: url+"start",
    success: (data) => console.log(data),
    error: () => console.log("Please check your connection!")
  })
}

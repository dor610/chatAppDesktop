const name = document.getElementById('name');
const logo = document.getElementById('logo');
const homeBtn = document.getElementById('home');
const welcomeBtn = document.getElementById('welcome');

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
       /*console.log(cursor);
       console.log(cursor.value.userName);
       console.log(cursor.value.userName[0]);*/
        homeBtn.click();
     } else {
       /*console.log(cursor);*/
        welcomeBtn.click();
     }
  };
}

document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
    } else {
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
    setTimeout(() => {
      readUserInfor();
    }, 5000);
};
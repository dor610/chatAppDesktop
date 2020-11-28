
const openLoading = () =>{
  loading.classList.remove('hide-d');
};

const closeLoading = () => {
  loading.classList.add('hide-o');
  setTimeout(() => {
      loading.classList.remove('hide-o');
      loading.classList.add('hide-d');
  }, 1500);
};

let db;
let request = window.indexedDB.open("chatapp", 1);

request.onerror = function(event) {
   console.log("error: ");
};

request.onsuccess = function(event) {
   db = request.result;
   let userInfo = db.transaction('userInfo').objectStore('userInfo');
   console.log("success: "+ db);
   userInfo.openCursor().onsuccess = (event) =>{
    let cursor = event.target.result;
    if(cursor){
      email = cursor.value.email;
      getUserInfo();
    }
   }
};

request.onupgradeneeded = function(event) {
   let db = event.target.result;
   let userInfo = db.createObjectStore("userInfo", {keyPath: "email"});
}

//------------------

const setUserInfo = () =>{
  userAvatarLetter.innerHTML = user.userName[0].toUpperCase();
  userName.innerHTML = user.userName;
  userName.addEventListener('click', () =>{
    openSettingTab();
  },true);
};

const removeDB = () =>{
    let rdb = window.indexedDB.deleteDatabase("chatapp");

    rdb.onsuccess = () =>{
      console.log('remove database successfully!');
    };

    rdb.onerror = () =>{
      console.log('error');
    };
};

function removeUserInfo() {
   var request = db.transaction(["userInfo"], "readwrite")
   .objectStore("userInfo")
   .delete(email);

   user.email = '';
   user.userName = '';
   user.friends = '';
   user.groups = '';
   user.receivedFriendRequest = '';
   user.friendRequest = '';
   user.gender = '';
   user.age = '';

   request.onsuccess = function(event) {
   };
}

const writeUserInfoToDB = (data) => {
  let request = db.transaction(["userInfo"], "readwrite")
  .objectStore("userInfo");
//chua xong
console.log('email: '+data.email);
console.log('userName: '+data.userName);
  request.add({email: data.email,
               userName: data.userName});

  request.onsuccess = function(event) {
     console.log("User has been added to your database.");
  };

  request.onerror = function(event) {
     console.log("Unable to add data\r\n user is aready exist in your database! ");
  }
};

const getUserInfo = () =>{
  console.log('email before sending: '+email);
  $.ajax({
    type: "GET",
    url: "https://secret-brook-88276.herokuapp.com/users/"+email,
    xhrFields: {
      withCredentials: true
    },
    success: (data) => {
      console.log(data);
      console.log('user groups(login): '+data.group);
      console.log('user email(login): '+data.email);
      writeUserInfoToDB(data);
      user.email = data.email;
      user.userName = data.userName;
      user.friends = data.friend;
      user.groups = data.group;
      user.receivedFriendRequest = data.receivedFriendRequest;
      user.friendRequest = data.friendRequest;
      user.gender = data.gender;
      user.age = data.age;
      closeLoading();
      readUserInfo();
      //webSocket.js
      connect();
    }
  });
};

const readUserInfo = () =>{
  let userInfo = db.transaction("userInfo").objectStore("userInfo");
  userInfo.openCursor().onsuccess = (event) => {
     let cursor = event.target.result;
     if (cursor) {
        setUserInfo();
        setUserGroups();
        setUserFriends();
        setUserProfile();
        //setUserNoti(cursor);
        setUserFriendRequest();
     } else {
        //loginBtn.click();
     }
  }
};



const getUserNoti = () =>{

};

const getMessage = (email) =>{

};

//
//openLoading();

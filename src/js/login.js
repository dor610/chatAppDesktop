const openSignupBtn = document.getElementById('open-signup-btn');
const haveAccount = document.getElementById('have-account');
const login = document.getElementById('login');
const signup = document.getElementById('signup');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const mainContent = document.getElementById('main-content');
const body = document.getElementsByTagName("BODY")[0];

const notiContainer = document.getElementById('noti-container');
const notiBox = document.getElementById('noti-box');
const notiContent = document.getElementById('noti-content');
const notiBtn = document.getElementById('noti-btn');
const type = document.getElementById('type');

const welcome = document.getElementById('welcome');
const welcomeLoginBtn = document.getElementById('welcome-login-btn');
const welcomeSignupBtn = document.getElementById('welcome-signup-btn');

const bg1 = document.getElementById('bg-1');
const bg2 = document.getElementById('bg-2');

const requireAuth = document.getElementById('require-auth');
const gender = document.getElementById('gender');

const loading = document.getElementById('loading-box');
const userEmail = document.getElementById('email');
const password = document.getElementById('password');

const newEmail = document.getElementById('new-email');

let email = '';
let pageType = type.innerHTML;

const openLoading = () =>{
  loading.classList.remove('hide-o');
  mainContent.style.overflow = "hidden";
}

const closeLoading = () => {
  loading.classList.add('hide-opacity');
  setTimeout(() => {
    loading.classList.remove('hide-opacity')
      loading.classList.add('hide-o');
  }, 1500);
}

const openWelcomePage = (t) =>{
  mainContent.classList.add('hide-o');
  welcome.classList.remove('hide-o');
  welcome.classList.remove('hide-opacity');
  document.title = "Welcome to chatApp";
  bg1.classList.add('show-bg-1');
  bg2.classList.add('show-bg-2');
}

const openSignupForm = (t) =>{
  welcome.classList.add('hide-o');
  welcome.classList.add('hide-opacity');
  mainContent.classList.remove('hide-o');
  openSignupBtn.innerHTML = "Login";
  haveAccount.innerHTML = 'Already have an account?';
  signup.classList.remove('hide-o');
  login.classList.add('hide-o');
  document.title = "Signup to chatApp";
  bg1.classList.remove('show-bg-1');
  bg2.classList.add('show-bg-2');
}

const openLoginForm = (t) =>{
  welcome.classList.add('hide-o');
  welcome.classList.add('hide-opacity');
  mainContent.classList.remove('hide-o');
  openSignupBtn.innerHTML = 'Create Account';
  haveAccount.innerHTML = "Don't have an account?";
  login.classList.remove('hide-o');
  signup.classList.add('hide-o');
  document.title = "Login to chatApp";
  bg1.classList.remove('show-bg-1');
  bg2.classList.add('show-bg-2');
}

const notiMessage = message =>{
  window.scrollTo(0, 0);
  notiContainer.classList.remove('hide-o');
  notiContent.innerHTML = message;
  body.style.overflow = 'hidden';
  setTimeout(() =>{
    notiContainer.classList.add('hide-o');
    notiContent.innerHTML = '';
    body.style.overflow = 'visible';
  }, 3000);
}

document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        openLoading();
    } else {
        closeLoading();
        openWelcomePage();
    }
};

window.onpopstate = e =>{
  let path = window.location.pathname;
  switch (path) {
    case "/login":
      openLoginForm(false);
      break;
    case "/signup":
      openSignupForm(false);
      break;
    default:
    openWelcomePage(true);
  }
};

gender.addEventListener('change', () => {

  if(gender.value === "0")
    gender.style.color = "#8C8B8B";
  else gender.style.color = "black";

});

welcomeLoginBtn.addEventListener('click', () =>{
  openLoginForm(true);
});

welcomeSignupBtn.addEventListener('click', () =>{
  welcome.classList.add('hide-o');
  mainContent.classList.remove('hide-o');
  openSignupForm(true);
});


openSignupBtn.addEventListener('click', () => {

  let label = openSignupBtn.innerHTML;

  if(label === 'Create Account'){
    openSignupForm(true);
  }
  else {
    openLoginForm(true);
  }

}, true);

//access to indexedDB
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

const writeToUserInfo = (data) => {
  let request = db.transaction(["userInfo"], "readwrite")
  .objectStore("userInfo");
  console.log("data: "+data);
//chua xong
  let d = new Date();
  request.add({email: data.email.replaceAll('.','__'),
               userName: data.userName,
               timeStamp: d.getTime()});

  request.onsuccess = function(event) {
     console.log("User has been added to your database.");
  };

  request.onerror = function(event) {
     console.log("Unable to add data\r\n user is aready exist in your database! ");
  }
 document.getElementById('main').click();
//alert( document.cookie );
};

const getUserInfo = () =>{
  $.ajax({
    type: "GET",
    url: "https://secret-brook-88276.herokuapp.com/users/"+email,
    xhrFields: {
      withCredentials: true
    },
    success: (data) => {
      console.log('user groups(login): '+data.group);
      writeToUserInfo(data);
    }
  })
}

loginForm.addEventListener('submit', e => {
  openLoading();
  e.preventDefault();
  email = userEmail.value.replaceAll('.','__');
  console.log(email);
  $.ajax({
       type: "POST",
       url: "https://secret-brook-88276.herokuapp.com/auth",
       data: "email="+email+"&password="+password.value,
       xhrFields: {
         withCredentials: true
       },
       success: function() {
         closeLoading();
         notiMessage("Login successfully!");
         getUserInfo();
       },
       error: () =>{
         closeLoading();
         notiMessage("Check your email, password or reconnect and try again!");
       }
    });
});

signupForm.addEventListener('submit', e => {
  openLoading();
  e.preventDefault();

  $.ajax({
    type: "POST",
    url: "https://secret-brook-88276.herokuapp.com/signup",
    data: $('#signup-form').serialize(),
    success: function() {
      closeLoading();
      notiMessage("Signup successfully!");
      setTimeout(() => {
        openLoginForm();
      }, 3000);
    },
    error: () =>{
      closeLoading();
      notiMessage("Something wrong. Please try again!");
    }
  });
});

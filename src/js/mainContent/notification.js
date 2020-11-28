const notiBox = document.getElementById('notification-box');
const notiMessage = document.getElementById('notification-message');

const confirmBox = document.getElementById('confirm-box');
const confirmMessage = document.getElementById('confirm-message');
const confirmedBtn = document.getElementById('confirmed-btn');
const cancelConfirm = document.getElementById('cancel-confirm-btn');

let confirmValue = false;

const showNotiBox = (message) =>{
  notiMessage.innerHTML = message;
  notiBox.classList.remove('hide-top');
  setTimeout(() =>{
    notiBox.classList.add('hide-top');
  },3000);
};

const showConfirmBox = (message) =>{
  confirmMessage.innerHTML= message;
  confirmBox.classList.remove('hide-top');
  setTimeout(() =>{
    confirmBox.classList.add('hide-top');
  },3000);
};

confirmedBtn.addEventListener('click', () =>{
  confirmValue = true;
});

cancelConfirm.addEventListener('click', () =>{
  confirmValue = false;
});

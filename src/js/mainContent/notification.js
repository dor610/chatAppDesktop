
notiBtn.addEventListener('click', () =>{
  openNotiTab();
});

const showNotiBox = (message) =>{
  notiMessage.innerHTML = message;
  notiBox.classList.remove('hide-top');
  setTimeout(() =>{
    notiBox.classList.add('hide-top');
  },3000);
};

const showConfirmBox = (message, confirm, cancel) =>{
  confirmMessage.innerHTML= message;
  confirmBox.classList.remove('hide-top');
  $('#confirmed-btn').one("click", confirm);
  $('#cancel-confirm-btn').one('click', cancel);
};

confirmedBtn.addEventListener('click', () =>{
  confirmValue = true;
  confirmBox.classList.add('hide-top');
});

cancelConfirm.addEventListener('click', () =>{
  confirmValue = false;
  confirmBox.classList.add('hide-top');
});

const openNotiTab = () =>{
  groupsTab.classList.add('hide-d');
  friendsTab.classList.add('hide-d');
  notiTab.classList.remove('hide-d');
  recentChat.classList.add('hide-d');
  friendRequestTab.classList.add('hide-d');
  searchResult.classList.add('hide-d');
};

const getNotification = () =>{

  $.ajax({
    type: "GET",
    url: "https://secret-brook-88276.herokuapp.com/app/users/notification",
    headers: {email: user.email},
    success: data =>{
      setNotification(data);
    },
    error: () =>{
      console.log("Some error has occurred when getting notifications!");
    }
  });
};

const setNotification = (data) =>{
  notiContent.innerHTML = '';
  if(data[0]){
    data.forEach((item, i) => {
      setNewNotification(item);
    });
  }
}

const setNewNotification = noti =>{
  let divParent = document.createElement('div');
  let firstChild = document.createElement('i');
  let lastChild = document.createElement('p');

  firstChild.classList.add('far');
  firstChild.classList.add('fa-dot-circle');

  lastChild.innerHTML = noti.message;

  divParent.append(firstChild);
  divParent.append(lastChild);
  notiContent.append(divParent);
}

const displayNewNotification = noti =>{
  showNotiBox(noti.message);
  setNewNotification(noti);
  console.log("received a new notification");
}


notiBtn.addEventListener('click', () =>{
  openNotiTab();
  closeSettingTab();
  closeGroupInfoTab();
  closeCreateGroupTab();
});

const showNotiBox = (title,message, isSmall, isError) =>{
  notiTitle.innerHTML = title;
  notiMessage.innerHTML = message;
  if(isSmall)
    notiBox.classList.add('small-noti');
  if(isError)
    notiBox.classList.add('error-noti');
  notiBox.classList.remove('hide-top');
  setTimeout(() =>{
    notiBox.classList.add('hide-top');
    notiBox.classList.remove('small-noti');
    notiBox.classList.remove('error-noti');
  },3000);
};

const showConfirmBox = (title, message, confirm, cancel) =>{
  confirmTitle.innerHTML = title;
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
  switch (noti.notiType) {
    case messageType.acceptFriendRequest:
        getFriend();
        showNotiBox('Friend',noti.message, true, false);
        setNewNotification(noti);
      break;
    case messageType.newGroup:
        getGroup();
        showNotiBox('Group',noti.message, true, false);
        setNewNotification(noti);
      break;
    case messageType.friendRequest:
        getFriendRequest();
        showNotiBox('Friend',noti.message, true, false);
        setNewNotification(noti);
      break;
    default:
      console.log("just a notification");
  }
  console.log("received a new notification");
}

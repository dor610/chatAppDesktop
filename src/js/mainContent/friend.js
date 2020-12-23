const friendRequestContent = document.getElementById('friend-request-content');
const backFromFriendRequest = document.getElementById('back-friend-request');
const friendRequestTab = document.getElementById('friend-request-tab');
const friendRequestBtn = document.getElementById('friend-request-btn');


const setUserFriends = () =>{

  let userFriendEmail = Object.keys(user.friends);
  onlineFriend.innerHTML = '';
  offlineFriend.innerHTML = '';

  userFriendEmail.forEach((item, i) => {
    let divParent = document.createElement('div');
    divParent.id = item;
    divParent.addEventListener('click', setFriendRecipientInfo);
    divParent.addEventListener('click', getPrivateMessage);
    //divParent.addEventListener('mouseup', openRightClickMenu);
    let divChild = document.createElement('div');
    divChild.innerHTML = user.friends[item][0].toUpperCase();
    let pChild = document.createElement('p');
    pChild.innerHTML = user.friends[item];
    let span = document.createElement('span');
    span.title = 'Online';

    let iElement = document.createElement('i');
    iElement.title = 'Remove';
    iElement.classList.add('far');
    iElement.classList.add('fa-times-circle');
    iElement.id = 'friend_'+item;
    iElement.addEventListener('click', deleteFriend, false);

    divParent.appendChild(divChild);
    divParent.appendChild(span);
    divParent.appendChild(pChild);
    divParent.appendChild(iElement);
    if(onlineUser.indexOf(item) >= 0){
      divParent.classList.add('online');
      onlineFriend.appendChild(divParent);
    }
    else offlineFriend.appendChild(divParent);
  });
};

const setOnlineFriend = (email) =>{
  let friend = document.getElementById(email);
  friend.classList.add('online');

  offlineFriend.removeChild(friend);
  onlineFriend.appendChild(friend);
}

const setOfflineFriend = (email) =>{
  let friend = document.getElementById(email);
  friend.classList.remove('online');

  onlineFriend.removeChild(friend);
  offlineFriend.appendChild(friend);
}

const setUserFriendRequest = () =>{
  let userFriendRequest = user.receivedFriendRequest;
  let userFriendRequestEmail = Object.keys(userFriendRequest);

  friendRequestContent.innerHTML = '';

  userFriendRequestEmail.forEach((item, i) => {
    let divParent = document.createElement('div');
    divParent.id = item;
    let divChild = document.createElement('div');
    divChild.innerHTML = userFriendRequest[item][0].toUpperCase();
    let pChild = document.createElement('p');
    pChild.innerHTML = userFriendRequest[item];

    let spanParent = document.createElement('span')
    let spanFirstChild = document.createElement('span');
    let spanLastChild = document.createElement('span');

    spanFirstChild.innerHTML = 'Accept';
    spanFirstChild.id = "accept_"+item;
    spanFirstChild.addEventListener('click', acceptFriendRequest);
    spanLastChild.id = "remove_"+item
    spanLastChild.addEventListener('click', removeFriendRequest);
    spanLastChild.innerHTML = 'Remove';

    divParent.appendChild(divChild);
    divParent.appendChild(pChild);

    spanParent.appendChild(spanFirstChild);
    spanParent.appendChild(spanLastChild);
    friendRequestContent.appendChild(divParent);
    friendRequestContent.appendChild(spanParent);
  });

};

const openFriendsTab = () =>{
  groupsTab.classList.add('hide-d');
  friendsTab.classList.remove('hide-d');
  notiTab.classList.add('hide-d');
  recentChat.classList.add('hide-d');
  friendRequestTab.classList.add('hide-d');
  searchResult.classList.add('hide-d');
};

const opentFriendRequestTab = () =>{
  friendRequestTab.classList.remove('hide-d');
  groupsTab.classList.add('hide-d');
  friendsTab.classList.add('hide-d');
  notiTab.classList.add('hide-d');
  recentChat.classList.add('hide-d');
  searchResult.classList.add('hide-d');
};

function acceptFriendRequest() {
  let friendEmail = this.id.replaceAll('.','__');
  friendEmail = friendEmail.substring(7, this.id.length);
  openLoading();

  $.ajax({
    type: "POST",
    url: url+"app/friends/accept",
    headers:{email: user.email},
    data: "friendEmail="+friendEmail,
    success: () =>{
      loadUserFriend();
      loadUserFriendRequest();
      closeLoading();
      //add notification
    },
    error: () => {
      console.log('error');
      closeLoading();
    } //add notification
  });
};

function removeFriendRequest() {
  let friendEmail = this.id;
  friendEmail = friendEmail.substring(7, this.id.length);

  $.ajax({
    type: "POST",
    url: url+"app/friends/accept",
    headers:{email: user.email},
    data: "friendEmail="+friendEmail,
    success: () =>{
      loadUserFriend();
      loadUserFriendRequest();
      //add notification
    },
    error: console.log('error')
  });
}

const loadUserFriend = () =>{

  $.ajax({
    type: "GET",
    url: url+"app/friends",
    headers: {email: user.email},
    success: (data) =>{
      user.friends = data;
      setUserFriends();
    }
  });
};

const loadUserFriendRequest = () =>{

  $.ajax({
    type: "GET",
    url: url+"app/friends/received",
    headers: {email: user.email},
    success: data =>{
      user.receivedFriendRequest = data;
      setUserFriendRequest();
    }
  });

};

//recent chats
const setRecentChat = () =>{

  groupRecentChats.innerHTML = '';
  friendRecentChats.innerHTML = '';

  user.friendRecentChats.forEach((item, i) => {
    if(item && user.friends[item]){
        let divParent = document.createElement('div');
        let firstChild = document.createElement('div');
        let lastChild = document.createElement('div');
        let span = document.createElement('span');
        span.title = 'Online';

        divParent.id = 'recent_'+item;
        divParent.addEventListener('click', setFriendRecipientInfo);
        divParent.addEventListener('click', getPrivateMessage);
        firstChild.innerHTML = user.friends[item][0].toUpperCase();
        lastChild.innerHTML = user.friends[item];
        divParent.appendChild(firstChild);
        divParent.appendChild(span);
        divParent.appendChild(lastChild);
        if(onlineUser.indexOf(item) >= 0)
          divParent.classList.add('online');
        friendRecentChats.appendChild(divParent);
    }
  });

  user.groupRecentChats.forEach((item, i) => {
    if(item){
      console.log("from set group recent chats: "+item);
      let divParent = document.createElement('div');
      let firstChild = document.createElement('div');
      let lastChild = document.createElement('div');

      divParent.id = item;
      divParent.addEventListener('click', setGroupRecipientInfo);
      divParent.addEventListener('click', getGroupMessage);
      firstChild.innerHTML = user.groups[item][0].toUpperCase();
      lastChild.innerHTML = user.groups[item];
      divParent.appendChild(firstChild);
      divParent.appendChild(lastChild);
      groupRecentChats.appendChild(divParent);
    }
  });
}

  const getUserFriend = () =>{

    $.ajax({
      type: "GET",
      url: url+"app/friends",
      headers: {email: user.email},
      success: (data) =>{
        user.friends = data;
        setUserFriends();
      },
      error: () =>{
        console.log("Some error occurred when getting user's friend");
      }
    });
  }

  const getFriendRequest = () =>{
    $.ajax({
      type: "GET",
      url: url+"app/friends/received",
      headers: {email: user.email},
      success: (data) =>{
        user.receivedFriendRequest = data;
        setUserFriendRequest();
      },
      error: () =>{
        console.log("Some error has occurred when getting friend request");
      }
    });
  }

function deleteFriend() {
  let friendEmail = this.id.substring(7, this.id.length);
  showConfirmBox("Friend", "Are you sure you want to remove "+ user.friends[friendEmail]+" from your friend list?",
  () =>{
    $.ajax({
      type: "DELETE",
      url: url+"app/friends/remove",
      headers: {email: user.email,
                friendEmail: friendEmail},
      success: () =>{
        let recentFriend = document.getElementById('recent_'+friendEmail);
        if(friendRecentChats.contains(recentFriend))
          friendRecentChats.removeChild(recentFriend);

        if(currentRecipient.id === friendEmail){
          let messageView = document.getElementById(currentRecipient.chatId);
          if(messageView){
            messageContainer.removeChild(messageView);
          }
          chatArea.classList.add('hide-d');
          welcomeBox.classList.remove('hide-d');
          recipientInfo.classList.add('hide-d');
        }
        let friend = document.getElementById(friendEmail);
        if(onlineFriend.contains(friend))
          onlineFriend.removeChild(friend);
        if(offlineFriend.contains(friend))
          offlineFriend.removeChild(friend);
      },
      error: () =>{
        console.log('Some errors has occurred when removing your friend from friend list!')
      }
    });
  }, () =>{
    console.log('cancel!')
  });
}

/*const openRightClickMenu = (e) =>{
  if(typeof e === 'object')
    if(e.button === 2)
      alert("right click menu here!!!!");
}*/


//---------------------

friendsBtn.addEventListener('click', () =>{
  openFriendsTab();
  closeSettingTab();
  closeGroupInfoTab();
  closeCreateGroupTab();
});

friendRequestBtn.addEventListener('click', () =>{
  opentFriendRequestTab();
});

backFromFriendRequest.addEventListener('click', () =>{
  openFriendsTab();
});

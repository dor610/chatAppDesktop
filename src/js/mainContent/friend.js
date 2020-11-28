const friendRequestContent = document.getElementById('friend-request-content');
const backFromFriendRequest = document.getElementById('back-friend-request');
const friendRequestTab = document.getElementById('friend-request-tab');
const friendRequestBtn = document.getElementById('friend-request-btn');


const setUserFriends = () =>{

  let userFriendEmail = Object.keys(user.friends);
  friendsContent.innerHTML = '';

  userFriendEmail.forEach((item, i) => {
    let divParent = document.createElement('div');
    divParent.id = item;
    divParent.addEventListener('click', setFriendRecipientInfo);
    divParent.addEventListener('click', getPrivateMessage);
    let divChild = document.createElement('div');
    divChild.innerHTML = user.friends[item][0].toUpperCase();
    let pChild = document.createElement('p');
    pChild.innerHTML = user.friends[item];

    divParent.appendChild(divChild);
    divParent.appendChild(pChild);
    friendsContent.appendChild(divParent);
  });
};

const setUserFriendRequest = (cursor) =>{
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
};

const opentFriendRequestTab = () =>{
  friendRequestTab.classList.remove('hide-d');
  groupsTab.classList.add('hide-d');
  friendsTab.classList.add('hide-d');
  notiTab.classList.add('hide-d');
  recentChat.classList.add('hide-d');
};

function acceptFriendRequest() {
  let friendEmail = this.id;
  friendEmail = friendEmail.substring(7, this.id.length);

  $.ajax({
    type: "POST",
    url: "https://secret-brook-88276.herokuapp.com/app/friends/accept",
    headers:{email: user.email},
    data: "friendEmail="+friendEmail,
    success: () =>{
      loadUserFriend();
      loadUserFriendRequest();
      //add notification
    },
    error: () => console.log('error') //add notification
  });
};

function removeFriendRequest() {
  let friendEmail = this.id;
  friendEmail = friendEmail.substring(7, this.id.length);

  $.ajax({
    type: "POST",
    url: "https://secret-brook-88276.herokuapp.com/app/friends/accept",
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
    url: "https://secret-brook-88276.herokuapp.com/app/friends",
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
    url: "https://secret-brook-88276.herokuapp.com/app/friends/received",
    headers: {email: user.email},
    success: data =>{
      user.receivedFriendRequest = data;
      setUserFriendRequest();
    }
  });

};


//---------------------

friendsBtn.addEventListener('click', () =>{
  openFriendsTab();
});

friendRequestBtn.addEventListener('click', () =>{
  opentFriendRequestTab();
});

backFromFriendRequest.addEventListener('click', () =>{
  openFriendsTab();
});

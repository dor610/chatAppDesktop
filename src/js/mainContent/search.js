
// thêm on click vào trong friend => mở chat or tìm bằng search button thì thêm nút kết bạn


searchKeyWord.addEventListener('input', () =>{
  if(searchResult.classList.contains('hide-d'))
    openSearchResultTab();
  let keyWord = searchKeyWord.value.toLowerCase().replaceAll('.','__');
  let friendList = Object.keys(user.friends);
  let groupList = Object.keys(user.groups);
  friendSearchResult.innerHTML = '';
  groupSearchResult.innerHTML = '';

  newFriend.innerHTML = '';
  otherPeople.classList.add('hide-d');
  noNewPeopleFound.classList.add('hide-d');

  if(keyWord !== ''){
    friendList.forEach((item, i) => {
      if(item.toLowerCase().search(keyWord) !== -1){
        let divParent = document.createElement('div');
        let firstChild = document.createElement('div');
        let lastChild = document.createElement('div');
        let span = document.createElement('span');
        span.title = 'Online';
        divParent.id = 'search_'+item;

        firstChild.innerHTML = user.friends[item][0].toUpperCase();
        lastChild.innerHTML = user.friends[item];

        divParent.appendChild(firstChild);
        divParent.appendChild(span);
        divParent.appendChild(lastChild);
        divParent.addEventListener('click', getPrivateMessage);
        divParent.addEventListener('click', setFriendRecipientInfo);
        if(onlineUser.indexOf(item) >= 0)
          divParent.classList.add('online');
        friendSearchResult.appendChild(divParent);
      }
    });

    groupList.forEach((item, i) => {
      if(item.toLowerCase().search(keyWord) !== -1){
        let divParent = document.createElement('div');
        let firstChild = document.createElement('div');
        let lastChild = document.createElement('div');

        firstChild.innerHTML = user.groups[item][0].toUpperCase();
        lastChild.innerHTML = user.groups[item];
        divParent.id = 'search_'+item;
        divParent.addEventListener('click', getGroupMessage);
        divParent.addEventListener('click', setGroupRecipientInfo);

        divParent.appendChild(firstChild);
        divParent.appendChild(lastChild);
        groupSearchResult.appendChild(divParent);
      }
    });

    if(friendSearchResult.innerHTML === '')
      noFriendFound.classList.remove('hide-d');
    else noFriendFound.classList.add('hide-d');

    if(groupSearchResult.innerHTML === '')
      noGroupFound.classList.remove('hide-d');
    else noGroupFound.classList.add('hide-d');
  }else{
    noFriendFound.classList.add('hide-d');
    noGroupFound.classList.add('hide-d');
  }

});

searchButton.addEventListener('click', () =>{
  let keyWord = searchKeyWord.value.replaceAll('.','__');

  if(!user.friends[keyWord]){
    $.ajax({
      type: "GET",
      url: url+"users/"+keyWord,
      success: (data) =>{
        console.log('success');
        newFriend.innerHTML = '';
        otherPeople.classList.remove('hide-d');
        let divParent = document.createElement('div');
        let firstChild = document.createElement('div');
        let secondChild = document.createElement('div');
        let lastChild = document.createElement('button');
        let i = document.createElement('i');
        i.classList.add('fas');
        i.classList.add('fa-user-plus');
        lastChild.title = 'Send friend request';
        lastChild.appendChild(i);

        lastChild.id = 'new_'+keyWord;
        lastChild.addEventListener('click', sendFriendRequest);

        firstChild.innerHTML = data.userName[0].toUpperCase();
        secondChild.innerHTML = data.userName;

        divParent.appendChild(firstChild);
        divParent.appendChild(secondChild);
        divParent.appendChild(lastChild);
        newFriend.appendChild(divParent);

        friendSearchResult.innerHTML = '';
        groupSearchResult.innerHTML = '';
        noFriendFound.classList.remove('hide-d');
        noGroupFound.classList.remove('hide-d');
      },
      error: () => {
        otherPeople.classList.remove('hide-d');
        noNewPeopleFound.classList.remove('hide-d');
      }
    });
  }
});

const openSearchResultTab = () =>{
  groupsTab.classList.add('hide-d');
  friendsTab.classList.add('hide-d');
  notiTab.classList.add('hide-d');
  recentChat.classList.add('hide-d');
  friendRequestTab.classList.add('hide-d');
  searchResult.classList.remove('hide-d');
}

const clearSearchBox = () =>{
  noNewPeopleFound.classList.add('hide-d');
  noFriendFound.classList.add('hide-d');
  noGroupFound.classList.add('hide-d');

  searchKeyWord.value = '';
  otherPeople.classList.add('hide-d');
  newFriend.innerHTML = '';
}

function sendFriendRequest(){
  let friendEmail = this.id.substring(4, this.id.length);

  $.ajax({
    type: "POST",
    url: "https://secret-brook-88276.herokuapp.com/app/friends/add",
    headers: {email: user.email.replaceAll('.', '__')},
    data: "friendEmail="+friendEmail.replaceAll('.','__'),
    success: () =>{
      showNotiBox('Friend',"Friend request has been sent successfully!");
      clearSearchBox();
    },
    error: () =>{
      showNotiBox('Friend',"Some error has orrcured. Please try again!", false, true);
    }
  })

}

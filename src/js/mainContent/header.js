function setFriendRecipientInfo(){
  let friendEmail = this.id;

  if(recipientInfo.classList.contains('hide-o'))
    recipientInfo.classList.remove('hide-o');

  recipientAvatar.innerHTML = user.friends[friendEmail][0].toUpperCase();
  recipientName.innerHTML = user.friends[friendEmail];
};

function setGroupRecipientInfo(){
  let groupId = this.id;

  if(recipientInfo.classList.contains('hide-o'))
    recipientInfo.classList.remove('hide-o');

    recipientAvatar.innerHTML = user.groups[groupId][0].toUpperCase();
    recipientName.innerHTML = '';
    let div = document.createElement('div');
    div.innerHTML = user.groups[groupId];
    div.id = 'open_'+groupId;
    div.addEventListener('click', openGroupInfoTab, true);
    recipientName.appendChild(div);
}

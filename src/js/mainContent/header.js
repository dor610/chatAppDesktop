function setFriendRecipientInfo(){
  let friendEmail = this.id;

  if(friendEmail.includes('search_'))
    friendEmail = friendEmail.substring(7, friendEmail.length)
  if(friendEmail.includes('recent_'))
    friendEmail = friendEmail.substring(7, friendEmail.length);

  if(recipientInfo.classList.contains('hide-o'))
    recipientInfo.classList.remove('hide-o');

  recipientAvatar.innerHTML = user.friends[friendEmail][0].toUpperCase();
  recipientName.innerHTML = user.friends[friendEmail];

  currentRecipient.id = friendEmail;
  currentRecipient.name = user.friends[friendEmail];
  currentRecipient.isGroup = false;
};

function setGroupRecipientInfo(){
  let groupId = this.id;

  if(groupId.includes('search_'))
    groupId = groupId.substring(7, groupId.length)
  if(groupId.includes('recent_'))
    groupId = groupId.substring(7, groupId.length);

  if(recipientInfo.classList.contains('hide-o'))
    recipientInfo.classList.remove('hide-o');

    recipientAvatar.innerHTML = user.groups[groupId][0].toUpperCase();
    recipientName.innerHTML = '';
    let div = document.createElement('div');
    div.innerHTML = user.groups[groupId];
    div.id = 'open_'+groupId;
    div.addEventListener('click', openGroupInfoTab, true);
    recipientName.appendChild(div);

    currentRecipient.id = groupId;
    currentRecipient.name = user.groups[groupId];
    currentRecipient.isGroup = true;
}

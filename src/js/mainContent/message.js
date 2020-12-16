
function openGroupMessageTab(){
  let groupId = this.id;
};

function getGroupMessage(){
  let groupId = this.id;

  if(groupId.includes('search_'))
    groupId = groupId.substring(7, groupId.length)
  if(groupId.includes('recent_'))
    groupId = groupId.substring(7, groupId.length);

  chatArea.classList.remove('hide-d');
  welcomeBox.classList.add('hide-d');

  if(currentRecipient.chatId && currentRecipient.chatId !== 'message_'+groupId)
    document.getElementById(currentRecipient.chatId).classList.add('hide-d');

  let chatBox = document.getElementById('message_'+groupId);

  if(!chatBox){
    $.ajax({
      type: "GET",
      url: "https://secret-brook-88276.herokuapp.com/app/groups/messages",
      headers: {email: user.email,
                groupId: groupId},
      success: (data) =>{
        displayGroupMessage(data);
        //console.log("Messages from "+ currentGroup.groupId+": "+data);
      },
      error: () => console.log('some errors occurred when getting group messages!')
    });
  }else{
    if(currentRecipient.chatId)
    document.getElementById(currentRecipient.chatId).classList.add('hide-d');
    chatBox.classList.remove('hide-d');
    currentRecipient.chatId = 'message_'+groupId;
  }
}

function getPrivateMessage(){
  let recipient = this.id;
  if(recipient.includes('search_'))
    recipient = recipient.substring(7, recipient.length)
  if(recipient.includes('recent_'))
    recipient = recipient.substring(7, recipient.length);

  let chatId = getPrivateChatId(user.email, recipient);
  let chatBox = document.getElementById(chatId);

  chatArea.classList.remove('hide-d');
  welcomeBox.classList.add('hide-d');
  if(currentRecipient.chatId && currentRecipient.chatId !== chatId)
    document.getElementById(currentRecipient.chatId).classList.add('hide-d');
  if(!chatBox){
    $.ajax({
      type: "GET",
      url: "https://secret-brook-88276.herokuapp.com/app/users/messages",
      headers: {email: user.email,
                chatId: chatId},
      success: (data) =>{
        displayPrivateMessage(data);
        //console.log("Messages from "+ recipient+": "+data);
      },
      error: () => console.log('some errors is occurred when getting your messages!')
    });
  }else {
    if(currentRecipient.chatId)
    document.getElementById(currentRecipient.chatId).classList.add('hide-d');
    chatBox.classList.remove('hide-d');
    currentRecipient.chatId = chatId;
  }
}

const getPrivateChatId = (sender, recipient) =>{
  if(sender.localeCompare(recipient) > 0)
    return sender+recipient;
  else return recipient+sender;
}

const displayPrivateMessage = (data) =>{

  if(document.getElementById(currentRecipient.chatId))
    document.getElementById(currentRecipient.chatId).classList.add('hide-d');

  let messageView = document.createElement('div');
  messageView.classList.add("message-view");
  if(data[0]){
    currentRecipient.chatId = data[0].chatId;
    if(document.getElementById(data[0].chatId) === null){
      messageView.id = data[0].chatId;
      data.forEach((item, i) => {
        let divParent;
        if(item.mesType === messageType.image){
          divParent = processImageMessage(item);
        }else{
          divParent = document.createElement('div');
          let firstChild = document.createElement('div');
          let lastChild = document.createElement('div');
          divParent.id = item.messageId;
          if(item.sender === user.email){
            //console.log("sender");
            divParent.classList.add('message-sent');
          }
          else divParent.classList.add('message-received');
          firstChild.innerHTML = item.message;
          lastChild.innerHTML = getTime(item.timeStamp);

          divParent.appendChild(firstChild);
          divParent.appendChild(lastChild);
        }
        messageView.appendChild(divParent);
      });
      messageContainer.appendChild(messageView);
      messageView.scrollTop = messageView.scrollHeight;
    }
    document.getElementById(currentRecipient.chatId).classList.remove('hide-d');
  }

}

  const displayGroupMessage = (data) =>{

    if(data[0]){
      currentRecipient.chatId = 'message_'+data[0].groupId;
      console.log("data[0].groupId:  "+data[0].groupId);
      if(document.getElementById(data[0].chatId) === null){
        let messageView = document.createElement('div');
        messageView.classList.add("message-view");
        messageView.id = 'message_'+data[0].groupId;
        data.forEach((item, i) => {
          let divParent;
          if(item.mesType === messageType.image){
            divParent = processImageMessage(item);
          }else{
            divParent = document.createElement('div');

            let secondChild = document.createElement('div');
            let lastChild = document.createElement('div');

            divParent.id = item.messageId;
            if(item.sender === user.email)
              divParent.classList.add('message-sent');
            else {
              divParent.classList.add('group-message-received');
              let firstChild = document.createElement('p');
              //console.log(item.groupId+"-----"+item.sender);
              if(userGroupMember[item.groupId][item.sender])
                firstChild.innerHTML = userGroupMember[item.groupId][item.sender];
              else firstChild.innerHTML = data.sender.replaceAll('__', '.');
              divParent.appendChild(firstChild);
            }
            secondChild.innerHTML = item.message;
            lastChild.innerHTML = getTime(item.timeStamp);


            divParent.appendChild(secondChild);
            divParent.appendChild(lastChild);
          }
          if(!item.isRemove[user.email])
            messageView.appendChild(divParent);
        });
        messageContainer.appendChild(messageView);
        messageView.scrollTop = messageView.scrollHeight;
      }
      if(currentRecipient.chatId === data.chatId)
        document.getElementById(currentRecipient.chatId).classList.remove('hide-d');
    }
}

const getTime = (time) =>{
  time = parseInt(time);
  let d = new Date(time).toLocaleTimeString();
  let date = new Date(time).toLocaleDateString();
  d = d.substr(0, d.length - 6) + d.substr(d.length - 3, 3);
  return d+" "+date;
}


const processArrivingMessage = (dataString) =>{
  console.log("-----\n"+dataString+"\n-------");
  let data = JSON.parse(dataString);
    switch (data.type) {
      case type.private:
        displayNewPrivateMessage(data);
        break;
      case type.group:
        displayNewGroupMessage(data);
        break;
      case type.notification:
        displayNewNotification(data);
        break;
      default:
      console.log("Something wrong with the enum value :(((("+ "  "+data.type);
    }
}

const displayNewGroupMessage = (data) =>{
  let chatId = "message_"+data.groupId;
  let messageView = document.getElementById(chatId);

  if(messageView){
    if(data.mesType === messageType.image){
      let divParent = processImageMessage(data);
      messageView.appendChild(divParent);
    }else{
      let divParent = document.createElement('div');
      let p = document.createElement('p');
      let firstChild = document.createElement('div');
      let lastChild = document.createElement('div');

      divParent.id = data.messageId;
      if(data.sender === user.email)
        divParent.classList.add('message-sent');
      else {
        divParent.classList.add('group-message-received');
        if(userGroupMember[data.groupId][data.sender])
          p.innerHTML = userGroupMember[data.groupId][data.sender];
        else p.innerHTML = data.sender.replaceAll('__', '.');
        divParent.appendChild(p);
      }
      firstChild.innerHTML = data.message;
      lastChild.innerHTML = getTime(data.timeStamp);

      divParent.appendChild(firstChild);
      divParent.appendChild(lastChild);

      messageView.appendChild(divParent);
    }
  messageView.scrollTop = messageView.scrollHeight;
  if(currentRecipient.chatId === chatId){
    let divParent = document.getElementById(data.messageId);
    divParent.classList.add('new-arriving-message');
    setTimeout(() => {
      document.getElementById(data.messageId).classList.remove('new-arriving-message');
    },2000);
  }
  }
  if(currentRecipient.chatId !== chatId){
    let group = document.getElementById(data.groupId);
    group.classList.add('new-message');
    showNotiBox('Message','New message from '+user.friends[data.sender]+" in "+user.groups[data.groupId]);
  }
}

const displayNewPrivateMessage = (data) =>{
  let chatId = data.chatId;
  let messageView = document.getElementById(chatId);

  if(messageView){
    if(data.mesType === messageType.image){
    let divParent = processImageMessage(data);
    messageView.appendChild(divParent);
  }else{
    let divParent = document.createElement('div');
    let firstChild = document.createElement('div');
    let lastChild = document.createElement('div');

    divParent.id = data.messageId;
    if(data.sender === user.email){
    divParent.classList.add('message-sent');
    }
    else{
      divParent.classList.add('message-received');
    }
    firstChild.innerHTML = data.message;
    lastChild.innerHTML = getTime(data.timeStamp);

    divParent.appendChild(firstChild);
    divParent.appendChild(lastChild);
    messageView.appendChild(divParent);
  }
  messageView.scrollTop = messageView.scrollHeight;
  if(currentRecipient.chatId === chatId){
    document.getElementById(data.messageId).classList.add('new-arriving-message');
    setTimeout(() => {
      document.getElementById(data.messageId).classList.remove('new-arriving-message');
    },2000);
  }
  }
  if(currentRecipient.chatId !== chatId){
    showNotiBox('Message','New message from '+user.friends[data.sender]);
    let friend = document.getElementById(data.sender);
    friend.classList.add('new-message');
  }
}

/*const displaySentGroupMessage = (message) =>{
console.log("display sent message");
  let chatId = 'message_'+currentRecipient.id;
  let messageView = document.getElementById(chatId);
  if(!messageView){
    messageView = document.createElement('div');
    messageView.id = chatId;
    messageView.classList.add("message-view");
    messageContainer.appendChild(messageView);
  }

  let d = new Date();

  let divParent = document.createElement('div');
  let firstChild = document.createElement('div');
  let lastChild = document.createElement('div');

  divParent.classList.add('message-sent');
  firstChild.innerHTML = message;
  lastChild.innerHTML = getTime(d.getTime());

  divParent.appendChild(firstChild);
  divParent.appendChild(lastChild);

  messageView.appendChild(divParent);
  messageView.scrollTop = messageView.scrollHeight;
}*/

/*const displaySentPrivateMessage = (message) =>{
  let chatId = getPrivateChatId(user.email, currentRecipient.id);
  let messageView = document.getElementById(chatId);
  if(!messageView){
    messageView = document.createElement('div');
    messageView.id = chatId;
    messageView.classList.add("message-view");
    messageContainer.appendChild(messageView);
  }
  let d = new Date();

  let divParent = document.createElement('div');
  let firstChild = document.createElement('div');
  let lastChild = document.createElement('div');

  divParent.classList.add('message-sent');
  firstChild.innerHTML = message;
  lastChild.innerHTML = getTime(d.getTime());

  divParent.appendChild(firstChild);
  divParent.appendChild(lastChild);

  messageView.appendChild(divParent);
  messageView.scrollTop = messageView.scrollHeight;
}*/

messageForm.addEventListener('submit', event =>{
  event.preventDefault();
  let message = messageConent.value;

  messageConent.value = '';

  if(message){
    if(currentRecipient.isGroup)
      sendGroupMessage(message);
    else sendPrivateMessage(message);
  }
});

const processImageMessage = (mes) =>{
  let img = document.createElement('img');
  img.src = mes.message;
  let divParent = document.createElement('div');
  divParent.id = mes.messageId;
  let lastChild = document.createElement('div');
  lastChild.innerHTML = getTime(mes.timeStamp);

  if(mes.sender === user.email)
    divParent.classList.add('message-sent');
  else{
    if(currentRecipient.isGroup){
      divParent.classList.add('group-message-received');
      let p = document.createElement('p');
      p.innerHTML = mes.sender;
      divParent.appendChild(p);
    }else divParent.classList.add('message-received');
  }
  divParent.appendChild(img);
  divParent.appendChild(lastChild);
  return divParent;
}

/*const displaySentImageMessage = (mes) =>{
  let messageView = document.getElementById(currentRecipient.chatId);
  if(messageView){
    let img = document.createElement('img');
    img.src = mes;
    let divParent = document.createElement('div');
    let lastChild = document.createElement('div');
    let d = new Date();
    lastChild.innerHTML = getTime(d.getTime());

    divParent.classList.add('message-sent');

    divParent.appendChild(img);
    divParent.appendChild(lastChild);
    messageView.appendChild(divParent);
  }
}*/

const sendImageMessage = (event) =>{
  event.preventDefault();

  var data = new FormData(imageForm);
  data.append("sender", user.email);
  data.append("recipient", currentRecipient.id);
  if(currentRecipient.isGroup)
    data.append('type', type.group);
  else data.append("type", type.private);
  data.append('mesType', messageType.image);

  $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "https://secret-brook-88276.herokuapp.com/messages/img",
        data: data,

        // prevent jQuery from automatically transforming the data into a query string
        processData: false,
        contentType: false,
        cache: false,
        timeout: 1000000,
        success: function(data, textStatus, jqXHR) {
          //displaySentImageMessage(data);
          console.log("image sent");
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log("lỗi rồi bà con ơi!!");

        }
    });
}

imageForm.addEventListener("submit", (event) => {
    sendImageMessage(event);
});

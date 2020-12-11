
function openGroupMessageTab(){
  let groupId = this.id;
};

function getGroupMessage(){
  let groupId = this.id;
//  console.log("groupId: "+groupId);
  chatArea.classList.remove('hide-d');
  welcomeBox.classList.add('hide-d');
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
    document.getElementById(currentRecipient.chatId).classList.add('hide-d');
    chatBox.classList.remove('hide-d');
    currentRecipient.chatId = 'message_'+groupId;
  }
}

function getPrivateMessage(){
  let recipient = this.id;
  let chatId = getPrivateChatId(user.email, recipient);
  let chatBox = document.getElementById(chatId);

  chatArea.classList.remove('hide-d');
  welcomeBox.classList.add('hide-d');

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

    if(document.getElementById(currentRecipient.chatId))
      document.getElementById(currentRecipient.chatId).classList.add('hide-d');

    if(data[0]){
      currentRecipient.chatId = 'message_'+data[0].groupId;
      console.log("data[0].groupId:  "+data[0].groupid);
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
              firstChild.innerHTML = item.sender;
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
      case 'PrivateMessage':
        displayNewPrivateMessage(data);
        break;
      case 'GroupMessage':
        displayGroupMessage(data);
        break;
      case 'Notification':
        displayNewNotification(data);
        break;
      default:
      console.log("Something wrong with the enum value :(((("+ "  "+data.type);
    }
}

const displayNewGroupMessage = (data) =>{
  let chatId = "message_"+data.groupId;
  let messageView = document.getElementById(chatId);

  if(!messageView){
    messageView = document.createElement('div');
    messageView.id = chatId;
    messageView.classList.add('message-view');
    messageView.classList.add('hide-d');
    messageContainer.appendChild(messageView);
  }

  let divParent = createElement('div');
  let firstChild = document.createElement('div');
  let lastChild = document.createElement('div');

  divParent.id = data.messageId;
  divParent.classList.add('message-received');
  firstChild.innerHTML = data.message;
  lastChild.innerHTML = getTime(data.timeStamp);

  divParent.appendChild(firstChild);
  divParent.appendChild(lastChild);

  messageView.appendChild(divParent);
  messageView.scrollTop = messageView.scrollHeight;
}

const displayNewPrivateMessage = (data) =>{
  let chatId = data.chatId;
  let messageView = document.getElementById(chatId);
  let divParent;
  if(!messageView){
    messageView = document.createElement('div');
    messageView.id = chatId;
    messageView.classList.add('message-view');
    messageView.classList.add('hide-d');
    messageContainer.appendChild(messageView);
  }
  if(data.mesType === messageType.image){
    divParent = processImageMessage(data);
  }else{
    divParent = document.createElement('div');
    let firstChild = document.createElement('div');
    let lastChild = document.createElement('div');

    divParent.id = data.messageId;
    divParent.classList.add('message-received');
    firstChild.innerHTML = data.message;
    lastChild.innerHTML = getTime(data.timeStamp);

    divParent.appendChild(firstChild);
    divParent.appendChild(lastChild);
  }

  messageView.appendChild(divParent);
  messageView.scrollTop = messageView.scrollHeight;
}

const displaySentGroupMessage = (message) =>{
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
}

const displaySentPrivateMessage = (message) =>{
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
}

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

const displaySentImageMessage = (mes) =>{
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
}

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
          displaySentImageMessage(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.log("lỗi rồi bà con ơi!!");

        }
    });
}

imageForm.addEventListener("submit", (event) => {
    sendImageMessage(event);
});

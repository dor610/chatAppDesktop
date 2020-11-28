
function openGroupMessageTab(){
  let groupId = this.id;
};

function getGroupMessage(){
  let groupId = this.id;
  $.ajax({
    type: "GET",
    url: "https://secret-brook-88276.herokuapp.com/app/groups/messages",
    headers: {email: user.email,
              groupId: currentGroup.groupId},
    success: (data) =>{
      displayGroupMessage(data);
      //console.log("Messages from "+ currentGroup.groupId+": "+data);
    },
    error: () => console.log('some errors is occurred when getting group messages!')
  });
}

function getPrivateMessage(){
  let recipient = this.id;

  $.ajax({
    type: "GET",
    url: "https://secret-brook-88276.herokuapp.com/app/users/messages",
    headers: {email: user.email,
              chatId: getPrivateChatId(user.email, recipient)},
    success: (data) =>{
      displayPrivateMessage(data);
      //console.log("Messages from "+ recipient+": "+data);
    },
    error: () => console.log('some errors is occurred when getting your messages!')
  });
}

const getPrivateChatId = (sender, recipient) =>{
  if(sender.localeCompare(recipient) > 0)
    return sender+recipient;
  else return recipient+sender;
}

const displayPrivateMessage = (data) =>{
  let messageView = document.createElement('div');
  messageView.classList.add("message-view");
  if(document.getElementById(data[0].chatId) === null){
    messageView.id = data[0].chatId;
    data.forEach((item, i) => {
      let divParent = document.createElement('div');
      let firstChild = document.createElement('div');
      let lastChild = document.createElement('div');
      divParent.id = item.messageId;
      if(item.sender === user.sender)
        divParent.classList.add('message-sent');
      else divParent.classList.add('message-received');
      firstChild.innerHTML = item.message;
      lastChild.innerHTML = getTime(item.timeStamp);

      divParent.appendChild(firstChild);
      divParent.appendChild(lastChild);
      messageView.appendChild(divParent);
    });
    messageContainer.appendChild(messageView);
    messageView.scrollTop = messageView.scrollHeight;
  }

}

  const displayGroupMessage = (data) =>{
    let messageView = document.createElement('div');
    messageView.classList.add("message-view");
    messageView.id = 'message_'+data[0].groupId;
    data.forEach((item, i) => {
      let divParent = document.createElement('div');
      let firstChild = document.createElement('div');
      let lastChild = document.createElement('div');
      divParent.id = item.messageId;
      if(item.sender === user.sender)
        divParent.classList.add('message-sent');
      else divParent.classList.add('message-received');
      firstChild.innerHTML = item.message;
      lastChild.innerHTML = getTime(item.timeStamp);

      divParent.appendChild(firstChild);
      divParent.appendChild(lastChild);
      if(!item.isRemove[user.email])
        messageView.appendChild(divParent);
    });
    messageContainer.appendChild(messageView);
    messageView.scrollTop = messageView.scrollHeight;
}

const getTime = (time) =>{
  let d = (new Date()).toLocaleTimeString();
  let date = (new Date()).toLocaleDateString();
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

        break;
      default:
      console.log("Something wrong with the enum value :(((("+ "  "+data.type);
    }
}

const displayNewPrivateMessage = (data) =>{
  let chatId = data.chatId;
  let messageView = document.getElementById(chatId);

  let divParent = document.createElement('div');
  let firstChild = document.createElement('div');
  let lastChild = document.createElement('div');

  divParent.id = data.messageId;
  if(data.sender === user.sender)
    divParent.classList.add('message-sent');
  else divParent.classList.add('message-received');
  firstChild.innerHTML = data.message;
  lastChild.innerHTML = getTime(data.timeStamp);

  divParent.appendChild(firstChild);
  divParent.appendChild(lastChild);

  messageView.appendChild(divParent);
  messageView.scrollTop = messageView.scrollHeight;
}
/*messageForm.addEventListener('submit', (event) =>{
  event.preventDefault();
}*/

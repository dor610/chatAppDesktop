let stompClient = null;

const connect = ()  => {

    var socket = new SockJS('https://secret-brook-88276.herokuapp.com/websocket-chat');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected, onError);
}


function onConnected() {
    // Subscribe to the Public Topic
  stompClient.subscribe('/user/queue/newMember',  (data) =>{
    onlineUser = data.body.slice(1, data.body.length-1).split(',');
    //console.log(Array.isArray(onlineUser));
    onlineUser.forEach((item, i) => {
      item = item.slice(1,item.length - 1);
      onlineUser[i] = item;
      //console.log(user.friends[item]);

      if(user.friends[item]){
        setOnlineFriend(item);
      }
    });

    setRecentChat();

  });

  stompClient.subscribe('/topic/newMember', data =>{
    let friend = data.body
    console.log(friend);
    if(onlineUser.indexOf(friend) === -1)
      onlineUser.push(friend);
    if(user.friends[friend]){
      setOnlineFriend(friend);
      let chatId = getPrivateChatId(user.email, friend);
      let messageView = document.getElementById(chatId);
      if(!messageView || messageView.classList.contains('hide-d')){
        showNotiBox('Friend','Your friend, '+user.friends[friend]+ " is online", true);
      }
    }
  });

  stompClient.subscribe('/topic/disconnect', data =>{
    let friend = data.body;
      if(user.friends[friend]){
        setOfflineFriend(friend);
        let chatId = getPrivateChatId(user.email, friend);
        let messageView = document.getElementById(chatId);
        setRecentChat();
        onlineUser.splice(onlineUser.indexOf(friend), 1);
        if(!messageView || messageView.classList.contains('hide-d')){
          //showNotiBox('Friend',user.friend[data]+ " is online");
        }
      }
  });


    // Tell your username to the server
  sendMessage('/app/register', user.email);

  stompClient.subscribe(`/user/${user.email}/msg`,  data =>{
    //console.log(`-------- received message:\n`+ data.body+`\n--------received message!!!!`);
    processArrivingMessage(data.body);
  });


}

function onError(error) {
    console.log('Could not connect to WebSocket server. Please refresh this page to try again!');
}

function sendMessage(url, message) {
    stompClient.send(url, {}, message);
}

//display group messageType
//display private message


const onDisconnect = () =>{
  sendMessage('/app/unregister', user.email);
  stompClient.disconnect();
}

const sendGroupMessage = (message) =>{

  if(message){
    sendMessage('/app/message', JSON.stringify({
      recipient: currentRecipient.id,
      sender: user.email,
      type: type.group,
      messageType: messageType.text,
      message: message
    }));
    //displaySentGroupMessage(message);
  }
};

const sendPrivateMessage = (message) =>{

  if(message){
    sendMessage('/app/message', JSON.stringify({
      recipient: currentRecipient.id,
      sender: user.email,
      type: type.private,
      messageType: messageType.text,
      message: message
    }));
    //displaySentPrivateMessage(message);
  }
};

let stompClient = null;

const connect = ()  => {

    var socket = new SockJS('https://secret-brook-88276.herokuapp.com/websocket-chat');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected, onError);
}


function onConnected() {
    // Subscribe to the Public Topic
  stompClient.subscribe('/user/queue/newMember',  (data) => console.log(data));

 stompClient.subscribe('/topic/newMember', data => console.log("data: " + data.body));



    // Tell your username to the server
  sendMessage('/app/register', user.email);

    stompClient.subscribe(`/user/${user.email}/msg`,  data =>{
    console.log(`-------- received message:\n`+ data.body+`\n--------received message!!!!`);
    processArrivingMessage(data.body);
    //displayMessage(data);
  });


}

function onError(error) {
    console.log('Could not connect to WebSocket server. Please refresh this page to try again!');
}

function sendMessage(url, message) {
    stompClient.send(url, {}, message);
}


const displayMessage = data =>{
let mess = JSON.parse(data.body);
console.log(" jhdsjfldsk:  "+mess);
//receive.innerHTML = `from: `+mess.sender+`\n message: `+ mess.message+"\n to: "+mess.recipient;
}

//display group messageType
//display private message


const onDisconnect = () =>{
  sendMessage('/app/unregister', user.email);
  stompClient.disconnect();
}

const sendGroupMessage = () =>{
  let message = messageConent.value;

  if(message){
    sendMessage('/app/message', JSON.stringify({
      recipient: currentRecipient.id,
      sender: user.email,
      type: type.group,
      messageType: messageType.text,
      message: message
    }));
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
    displaySentPrivateMessage(message);
  }
};


//logout.addEventListener('click', onDisconnect);

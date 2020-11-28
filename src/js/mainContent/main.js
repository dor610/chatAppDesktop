//navigation bar
const friendsBtn = document.getElementById('friends');
const groupsBtn = document.getElementById('groups');
const notiBtn = document.getElementById('notification');

const friendsTab = document.getElementById('friends-tab');
const groupsTab = document.getElementById('groups-tab');
const notiTab = document.getElementById('noti-tab');
const recentChat = document.getElementById('recent-chat');


//database.js
const userInfor = document.getElementById('user-info');
const userAvatarLetter = document.getElementById('user-avatar-letter');
const userName = document.getElementById('user-name');
const loginBtn = document.getElementById('login');
const loading = document.getElementById('loading-box');

const friendsContent = document.getElementById('friends-content');
const groupsContent = document.getElementById('groups-content');
const recentChatContent = document.getElementById('recent-chat-content');

//header.js
const recipientInfo = document.getElementById('recipient-info');
const recipientAvatar = document.getElementById('recipient-avatar-letter');
const recipientName = document.getElementById('recipient-name');

//group.js
const groupInfoTab = document.getElementById('group-info-tab');
const groupInfoView = document.getElementById('group-info');
const groupMember = document.getElementById('group-member');
const addGroupMember = document.getElementById('add-group-member');
const groupInfoOther = document.getElementById('group-info-other');

const closeGroupInfoTabBtn = document.getElementById('group-info-close');
const groupInfoContent = document.getElementById('group-info-content');
const groupMemberContent = document.getElementById('group-member-content');
const addGroupMemberContent = document.getElementById('add-group-member-content');
const groupOtherContent = document.getElementById('group-other-content');

//message
const chatArea = document.getElementById('chat-area')
const messageConent = document.getElementById('message-content');
const messageContainer = document.getElementById('message-view-container');
const sendImage = document.getElementById('send-image');
const sendEmoji = document.getElementById('send-emoji');
const sendFIle = document.getElementById('send-file');
const messageFunction = document.getElementById('message-func');
const messageForm = document.getElementById('messages-form');
const messageSendBtn = document.getElementById('message-send-btn');

const user = {
  email: '',
  userName: '',
  friends: '',
  groups: '',
  receivedFriendRequest: '',
  friendRequest: '',
  gender: '',
  age: ''
}

const currentGroup = {
  groupId: '',
  members: '',
  admin: '',
  groupName: ''
};

const currentRecipient = {
  id: '',
  name: ''
};

const type ={
  group: 'GroupMessage',
  private: 'PrivateMessage',
  notification: 'Notification'
};

const messageType = {
  acceptFriendRequest: 'AcceptFriendRequest',
  friendRequest: 'FriendRequest',
  image: 'Image',
  text: 'Text'
};

notiBtn.addEventListener('click', () =>{
  openNotiTab();
});

const openNotiTab = () =>{
  groupsTab.classList.add('hide-d');
  friendsTab.classList.add('hide-d');
  notiTab.classList.remove('hide-d');
  recentChat.classList.add('hide-d');
  friendRequestTab.classList.add('hide-d');
};

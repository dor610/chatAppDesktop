//navigation bar
const friendsBtn = document.getElementById('friends');
const groupsBtn = document.getElementById('groups');
const notiBtn = document.getElementById('notification');

const friendsTab = document.getElementById('friends-tab');
const groupsTab = document.getElementById('groups-tab');
const notiTab = document.getElementById('noti-tab');


//database.js
const userInfor = document.getElementById('user-info');
const userAvatarLetter = document.getElementById('user-avatar-letter');
const userName = document.getElementById('user-name');
const loginBtn = document.getElementById('login');
const loading = document.getElementById('loading-box');

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
const groupsContent = document.getElementById('groups-content');

const closeGroupInfoTabBtn = document.getElementById('group-info-close');
const groupInfoContent = document.getElementById('group-info-content');
const groupMemberContent = document.getElementById('group-member-content');
const addGroupMemberContent = document.getElementById('add-group-member-content');
const groupOtherContent = document.getElementById('group-other-content');


//friend
const friendsContent = document.getElementById('friends-content');
const onlineFriend = document.getElementById('online-friend');
const offlineFriend = document.getElementById('offline-friend');


//message
const chatArea = document.getElementById('chat-area')
const messageContainer = document.getElementById('message-view-container');
/*const sendImage = document.getElementById('send-image');
const sendEmoji = document.getElementById('send-emoji');
const sendFIle = document.getElementById('send-file');*/
const imageForm = document.getElementById('image-form');
const messageFunction = document.getElementById('message-func');
const messageForm = document.getElementById('message-form');
const messageConent = document.getElementById('message-content');
const messageSendBtn = document.getElementById('message-send-btn');

//Search
const searchBox = document.getElementById('search-box');
const searchKeyWord = document.getElementById('search-key-word');
const searchButton = document.getElementById('search-button');
const searchResult = document.getElementById('search-result');
const friendSearchResult = document.getElementById('friend-search-result');
const groupSearchResult = document.getElementById('group-search-result');
const noFriendFound = document.getElementById('no-friend-found');
const noGroupFound = document.getElementById('no-group-found');
const newFriend = document.getElementById('new-friend');
const otherPeople = document.getElementById('other-people');
const noNewPeopleFound = document.getElementById('no-new-people-found');

//Welcome
const welcomeBox = document.getElementById('welcome-box');


//setting tab
const userProfileOption = document.getElementById('user-profile');
const userAccountOption = document.getElementById('user-account');
const editProfileOption = document.getElementById('edit-profile');
const aboutOption = document.getElementById('about');
const helpOption = document.getElementById('help');

const userProfileContent = document.getElementById('user-profile-content');
const userAccountContent = document.getElementById('user-account-content');
const editProfileContent = document.getElementById('edit-profile-content');
const aboutContent = document.getElementById('about-content');
const helpContent = document.getElementById('help-content');

const settingTab = document.getElementById('setting-tab');

const settingCloseBtn = document.getElementById('setting-close');

const settingBtn = document.getElementById('setting');

const editForm = document.getElementById('edit-form');
const newUserName = document.getElementById('new-user-name');
const newPassword = document.getElementById('new-password');
const newAge = document.getElementById('new-age');

const deleteAccountBtn = document.getElementById('delete-account');

//Notification
const notiContent = document.getElementById('noti-content');

const notiBox = document.getElementById('notification-box');
const notiTitle = document.getElementById('notification-title');
const notiMessage = document.getElementById('notification-message');

const confirmBox = document.getElementById('confirm-box');
const confirmTitle = document.getElementById('confirm-title');
const confirmMessage = document.getElementById('confirm-message');
const confirmedBtn = document.getElementById('confirmed-btn');
const cancelConfirm = document.getElementById('cancel-confirm-btn');

let confirmValue = false;

//recent chat
const recentChat = document.getElementById('recent-chat');
const recentChatContent = document.getElementById('recent-chat-content');
const friendRecentChats = document.getElementById('friend-recent-chat');
const groupRecentChats = document.getElementById('group-recent-chat');


let onlineUser = '';

const user = {
  email: '',
  userName: '',
  friends: '',
  groups: '',
  receivedFriendRequest: '',
  friendRequest: '',
  gender: '',
  age: '',
  friendRecentChats: '',
  groupRecentChats: ''
};

const userGroupMember = {};

const currentGroup = {
  groupId: '',
  members: '',
  admin: '',
  groupName: '',
  removedMember: ''
};

const currentRecipient = {
  id: '',
  name: '',
  isGroup: false,
  chatId: ''
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
  text: 'Text',
  newGroup: 'NewGroup'
};

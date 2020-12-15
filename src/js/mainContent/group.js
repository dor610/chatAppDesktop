const createGroupTab = document.getElementById('create-group-tab');
const createGroupName = document.getElementById('create-group-name');
const newGroupNameIn = document.getElementById('new-group-name');
const newGroupNameBtn = document.getElementById('new-group-name-btn');

const createGroupMember = document.getElementById('create-group-member');
const memberFromFriend =document.getElementById('member-from-friend');

const openCreateGroupBtn = document.getElementById('create-group');
const closeCreateGroupBtn = document.getElementById('create-group-close');

const createGroupBtn = document.getElementById('create-group-btn');

const groupNameError = document.getElementById('group-name-error');

const leaveGroupBtn = document.getElementById('leave-group-btn');
const deleteGroupBtn = document.getElementById('delete-group-btn');


let newGroupName = '';
let newGroupMember = '';
let memberEmailArr = [];
let newMembers = '';

//group info Tab

function openGroupInfoTab(){
  currentGroup.groupId = this.id.substring(5, this.id.length);//remove "open_"
  groupInfoTab.classList.remove('hide-d');
  loadGroupInfo();
  openGroupInfoView();
  closeGroupMember();
  closeAddGroupMemberContent();
  closeGroupOtherContent();
};

const closeGroupInfoTab = () =>{
  groupInfoTab.classList.add('hide-d');
  currentGroup.groupName = '';
  currentGroup.members = '';
  currentGroup.admin = '';
  memberEmailArr = [];
  newMembers = '';

};

const setGroupInfoView = () =>{
  groupInfoContent.innerHTML = '';

  let p = document.createElement('p');
  p.classList.add('user-avatar-letter');
  p.innerHTML = currentGroup.groupName[0].toUpperCase();

  groupInfoContent.appendChild(p);

  let content = ['groupName', 'groupId', 'members', 'admin'];

  content.forEach((item, i) => {
      let divParent = document.createElement('div');
      let firstChild = document.createElement('div');
      switch (item) {
        case 'groupName':
            firstChild.innerHTML = 'Name';
          break;
        case 'groupId':
            firstChild.innerHTML = 'Group Id';
          break;
        case 'members':
            firstChild.innerHTML = 'Members';
          break;
        default:
          firstChild.innerHTML = 'Administrator';
      }

      let lastChild = document.createElement('div');
      if(item === 'members')
        lastChild.innerHTML = Object.keys(currentGroup[item]).length;
      else{
        lastChild.innerHTML = currentGroup[item];
      }

      divParent.appendChild(firstChild);
      divParent.appendChild(lastChild);
      groupInfoContent.appendChild(divParent);
  });
  setGroupMember();
  setAddGroupMemberFromFriend();
};

const setGroupMember = () =>{
  let memberEmail = Object.keys(currentGroup.members);

  groupMemberContent.innerHTML = '';

  let p = document.createElement('p');
  p.innerHTML = "Group's Members";
  groupMemberContent.appendChild(p);

  memberEmail.forEach((item, i) => {
    let divParent = document.createElement('div');
    let firstChild = document.createElement('div');
    firstChild.innerHTML = currentGroup.members[item][0].toUpperCase();
    let secondChild = document.createElement('div');
    secondChild.innerHTML = currentGroup.members[item];

    divParent.appendChild(firstChild);
    divParent.appendChild(secondChild);

    if(currentGroup.admin === user.email){
      let lastChild = document.createElement('button');
      lastChild.title = 'Remove';
      lastChild.id = "remove_"+item;
      lastChild.addEventListener('click', removeGroupMember);
      let i = document.createElement('i');
      i.classList.add('fa-times');
      i.classList.add('fas');
      lastChild.appendChild(i);
      divParent.appendChild(lastChild);
    }
    groupMemberContent.appendChild(divParent);
  });

}

const setAddGroupMemberFromFriend = () =>{
  addGroupMemberContent.innerHTML = '';

  let p = document.createElement('p');
  p.innerHTML = 'Add members';

  addGroupMemberContent.appendChild(p);

  let button = document.createElement('button');
  button.innerHTML = 'Add';
  button.addEventListener('click', addNewMembers);
  addGroupMemberContent.appendChild(button);

  let memberList = Object.keys(currentGroup.members);
  let friendEmail = Object.keys(user.friends);

  friendEmail.forEach((item, i) => {
    if(memberList.indexOf(item) === -1){
      let divParent = document.createElement('div');
      let firstChild = document.createElement('div');
      let lastChild = document.createElement('div');

      divParent.id = item;
      divParent.addEventListener('click', setMemberEmailOnClick);

      firstChild.innerHTML = user.friends[item][0].toUpperCase();
      lastChild.innerHTML = user.friends[item];

      divParent.appendChild(firstChild);
      divParent.appendChild(lastChild);
      addGroupMemberContent.appendChild(divParent);
    }
  });
};

function removeGroupMember() {
  let memberEmail = this.id.substring(7, this.id.length);
  currentGroup.removedMember = memberEmail;
  showConfirmBox("Remove Group's Member","Are you sure you want to remove "+currentGroup.members[memberEmail]+" from "+currentGroup.groupName+"?",
                  ()=>{
                    $.ajax({
                      type: "DELETE",
                      url: 'https://secret-brook-88276.herokuapp.com/app/groups/delete/members',
                      headers: {email: user.email},
                      data: 'groupId='+currentGroup.groupId+"&member="+currentGroup.removedMember,
                      success: () =>{
                        showNotiBox('Group',currentGroup.members[currentGroup.removedMember]+" has been removed from "+currentGroup.groupName+"!");
                        loadGroupMember();
                      }
                    });
                    confirmValue = false;
                  }, () =>{
                    console.log("cancel");
                  });
}


const loadGroupInfo = () =>{
  $.ajax({
    type: "GET",
    url: 'https://secret-brook-88276.herokuapp.com/groups/profile/'+currentGroup.groupId,
    success: (data) =>{
      currentGroup.groupName = data.groupName;
      currentGroup.members = data.members;
      currentGroup.admin = data.manager;
      setGroupInfoView();
    }
  })
}

const loadGroupMember = () => {
  $.ajax({
    type: "GET",
    url: 'https://secret-brook-88276.herokuapp.com/groups/members/'+currentGroup.groupId,
    success: (data) =>{
      currentGroup.members = data;
      setGroupMember();
      setAddGroupMemberFromFriend();
      setGroupInfoView();
    }
  })
}

//--------------------
const openGroupsTap = () =>{
  groupsTab.classList.remove('hide-d');
  friendsTab.classList.add('hide-d');
  notiTab.classList.add('hide-d');
  recentChat.classList.add('hide-d');
  friendRequestTab.classList.add('hide-d');
  searchResult.classList.add('hide-d');
  if(user.email === currentGroup.admin)
    deleteGroupBtn.classList.remove('hide-d');
  else deleteGroupBtn.classList.add('hide-d');
  };

const setUserGroups = () =>{
  let userGroupId = Object.keys(user.groups);

  groupsContent.innerHTML = '';
  userGroupId.forEach((item, i) => {
    let divParent = document.createElement('div');
    divParent.id = item;
    divParent.addEventListener('click', setGroupRecipientInfo);
    divParent.addEventListener('click', getGroupMessage);
    let divChild = document.createElement('div');
    divChild.innerHTML = user.groups[item][0].toUpperCase();
    let pChild = document.createElement('p');
    pChild.innerHTML = user.groups[item];

    divParent.appendChild(divChild);
    divParent.appendChild(pChild);
    groupsContent.appendChild(divParent);
    });
};

const getNewGroupName = () =>{
  if(newGroupNameIn.value){
    newGroupName = newGroupNameIn.value;
    createGroupName.classList.add('hide-d');
    createGroupMember.classList.remove('hide-d');
    createGroupBtn.classList.remove('hide-d');
  }else{
    groupNameError.classList.remove('hide-v');
    setTimeout(()=>{
      groupNameError.classList.add('hide-v');
    },3000);
  }
}

const closeCreateGroupTab = () =>{
  createGroupName.classList.remove('hide-d');
  createGroupMember.classList.add('hide-d');
  createGroupBtn.classList.add('hide-d');
  createGroupTab.classList.add('hide-d');
  newGroupName = '';
  newGroupMember = '';
  memberEmailArr = [];
  newGroupNameIn.value = null;
};

const openCreateGroupTab = () =>{
  createGroupTab.classList.remove('hide-d');
  setMemberListFromFriend();
};

const setMemberListFromFriend = () =>{

       let friendList = user.friends;
       let friendEmail = Object.keys(friendList);

       memberFromFriend.innerHTML = '';

       friendEmail.forEach((item, i) => {
         let divParent = document.createElement('div');
         divParent.id = item;
         divParent.addEventListener('click', setMemberEmailOnClick);
         let firstChild = document.createElement('div');
         firstChild.classList.add('user-avatar-letter');
         firstChild.innerHTML = friendList[item][0].toUpperCase();
         let lastChild = document.createElement("div");
         lastChild.classList.add('user-name');
         lastChild.innerHTML = friendList[item];

         divParent.appendChild(firstChild);
         divParent.appendChild(lastChild);
         memberFromFriend.appendChild(divParent);
       });
};

function setMemberEmailOnClick(){
  this.classList.toggle('active-option');
  let memberEmail = this.id;
  if(memberEmailArr.indexOf(memberEmail) === -1){
    memberEmailArr.push(memberEmail);
  }else{
    memberEmailArr.splice(memberEmailArr.indexOf(memberEmail),1);
  }
  console.log(memberEmailArr);
}

const createGroup = () =>{
  if(memberEmailArr.length !== 0){
    if(memberEmailArr.length === 1){
      newGroupMember += memberEmailArr[0];
    }else{
      newGroupMember += memberEmailArr[0]
      memberEmailArr.splice(0,1);
      memberEmailArr.forEach((item, i) => {
        newGroupMember += "_"+item;
      });
    }
  }else newGroupMember = "NONE";
    $.ajax({
      type: "POST",
      url: "https://secret-brook-88276.herokuapp.com/app/groups/create",
      headers: {email: user.email},
      data: "newGroupName="+newGroupName+"&members="+newGroupMember,
      success: (data) => {
          loadUserGroup();
          console.log(data);
      },
      error: () => console.log('error')
    })
};

const addNewMembers = () =>{
  console.log('hihi');
  if(memberEmailArr.length !== 0){
    if(memberEmailArr.length === 1){
      newMembers += memberEmailArr[0];
    }else{
      newMembers += memberEmailArr[0]
      memberEmailArr.splice(0,1);
      memberEmailArr.forEach((item, i) => {
        newMembers += "_"+item;
      });
    }
  }else newMembers = 'NONE';

  console.log(newMembers);
  $.ajax({
    type: "POST",
    url: 'https://secret-brook-88276.herokuapp.com/app/groups/add',
    headers: {email: user.email},
    data: 'groupId='+currentGroup.groupId+'&newMembers='+newMembers,
    success: (data) =>{
      loadGroupMember();
      console.log(data);
    },
    error: () => console.log('error')
  });
};

const loadUserGroup = () =>{
  $.ajax({
    type: "GET",
    url: "https://secret-brook-88276.herokuapp.com/app/groups",
    headers: {email: user.email},
    success: (data) =>{
      user.groups = data;
      setUserGroups();
    }
  });
}

const leaveGroup = () =>{
  showConfirmBox("Leave Group","Are you sure you want to leave "+currentGroup.groupName+"?",
                ()=>{
                  $.ajax({
                    type: "POST",
                    url: 'https://secret-brook-88276.herokuapp.com/app/groups/leave',
                    headers: {email: user.email},
                    data: 'groupId='+currentGroup.groupId,
                    success: (data) =>{
                      console.log(data);
                      loadUserGroup();
                      showNotiBox('Group',"You has left "+currentGroup.groupName+"!", true);
                      closeGroupInfoTab();
                    },
                    error: () => console.log('error'),
                  });
                  confirmValue = false;
                }, () =>{
                  console.log("cancel");
                })
}

const deleteGroup = () =>{
  if(user.email === currentGroup.admin){
    showConfirmBox("Delete Group","Are you sure you want to delete this group?",
                  () =>{
                    $.ajax({
                      type: "DELETE",
                      url: 'https://secret-brook-88276.herokuapp.com/app/groups/delete',
                      headers: {email: user.email},
                      data: 'groupId='+currentGroup.groupId,
                      success: (data) =>{
                        console.log(data);
                        loadUserGroup();
                        showNotiBox('Group',currentGroup.groupName+" has been deleted!",true);
                        closeGroupInfoTab();
                      }
                    });
                    confirmValue = false;
                  }, () =>{
                    console.log("cancel");
                  });
  }else{
    //hiện thông báo
    console.log('access denied!');
  }
}

const getGroup = () =>{
  $.ajax({
    type: 'GET',
    url: 'https://secret-brook-88276.herokuapp.com/app/groups',
    headers: {email: user.email},
    success: (data) =>{
      user.groups = data;
      setUserGroups();
    },
    error: () =>{
      console.log("Some error has occurred when getting user's group");
    }
  });
}

const getGroupMember = () =>{
  let groupIds = Object.keys(user.groups);

  groupIds.forEach((item, i) => {
    $.ajax({
      type: "GET",
      url: 'https://secret-brook-88276.herokuapp.com/groups/members/'+item,
      success: (data) =>{
        //console.log(item);
        userGroupMember[item] = data;
        //console.log(userGroupMember[item]);
      },
      error: () =>{
        console.log('Could not get ' + item + ' information!');
      }
    });
  });

}
//-------------------
groupsBtn.addEventListener('click', () =>{
  openGroupsTap();
});

newGroupNameBtn.addEventListener('click', () =>{
  getNewGroupName();
});

closeCreateGroupBtn.addEventListener('click', () =>{
  closeCreateGroupTab();
});

openCreateGroupBtn.addEventListener('click', () =>{
  openCreateGroupTab();
});

createGroupBtn.addEventListener('click', () =>{
  createGroup();
});

groupInfoView.addEventListener('click', () =>{
  openGroupInfoView();
  closeGroupMember();
  closeAddGroupMemberContent();
  closeGroupOtherContent();
});

groupMember.addEventListener('click', () =>{
  openGroupMember();
  closeGroupInfoView();
  closeAddGroupMemberContent();
  closeGroupOtherContent();
});

addGroupMember.addEventListener('click', () =>{
  openAddGroupMemberContent();
  closeGroupInfoView();
  closeGroupMember();
  closeGroupOtherContent();
});

groupInfoOther.addEventListener('click',() =>{
  openGroupOtherContent();
  closeGroupInfoView();
  closeGroupMember();
  closeAddGroupMemberContent();
});

closeGroupInfoTabBtn.addEventListener('click', closeGroupInfoTab);

deleteGroupBtn.addEventListener('click', deleteGroup);

leaveGroupBtn.addEventListener('click', leaveGroup);
//------------------------------------

const openGroupInfoView = () =>{
    groupInfoContent.classList.remove('hide-d');
    groupInfoView.classList.add('active-option');
};

const closeGroupInfoView = () =>{
  groupInfoContent.classList.add('hide-d');
  groupInfoView.classList.remove('active-option');
};

const openGroupMember = () =>{
  groupMemberContent.classList.remove('hide-d');
  groupMember.classList.add('active-option');
};

const closeGroupMember = () =>{
  groupMemberContent.classList.add('hide-d');
  groupMember.classList.remove('active-option');
};

const openAddGroupMemberContent = () =>{
  addGroupMemberContent.classList.remove('hide-d');
  addGroupMember.classList.add('active-option');
};

const closeAddGroupMemberContent = () =>{
  addGroupMemberContent.classList.add('hide-d');
  addGroupMember.classList.remove('active-option');
};

const openGroupOtherContent = () =>{
  groupOtherContent.classList.remove('hide-d');
  groupInfoOther.classList.add('active-option');
};

const closeGroupOtherContent = () =>{
  groupOtherContent.classList.add('hide-d');
  groupInfoOther.classList.remove('active-option');
};

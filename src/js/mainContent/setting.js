settingBtn.addEventListener('click', () =>{
  openSettingTab();
}, true);

settingCloseBtn.addEventListener('click', () =>{
  closeSettingTab();
},true);

userProfileOption.addEventListener('click', () => {
  openUserProfile();
  closeHelp();
  closeAbout();
  closeEditProfile();
  closeUserAccount();
}, true);

userAccountOption.addEventListener('click', () => {
  openUserAccount();
  closeUserProfile();
  closeEditProfile();
  closeHelp();
  closeAbout();
}, true);

editProfileOption.addEventListener('click', () => {
  openEditProfile();
  closeHelp();
  closeAbout();
  closeUserAccount();
  closeUserProfile();
}, true);

aboutOption.addEventListener('click', () => {
  openAbout();
  closeHelp();
  closeUserAccount();
  closeUserProfile();
  closeEditProfile();
}, true);

helpOption.addEventListener('click', () => {
  openHelp();
  closeAbout();
  closeEditProfile();
  closeUserAccount();
  closeUserProfile();
}, true);


const openSettingTab = () =>{
  settingTab.classList.remove('hide-d');
}

const closeSettingTab = () =>{
  settingTab.classList.add('hide-d');
  newUserName.value = '';
  newPassword.value = '';
  newAge.value = '';
}



const openUserProfile = () =>{
  userProfileOption.classList.add('active-option');
  userProfileContent.classList.remove('hide-d');
}

const openUserAccount = () =>{
  userAccountOption.classList.add('active-option');
  userAccountContent.classList.remove('hide-d');
}

const openEditProfile = () =>{
  editProfileOption.classList.add('active-option');
  editProfileContent.classList.remove('hide-d');
}

const openHelp = () =>{
  helpOption.classList.add('active-option');
  helpContent.classList.remove('hide-d');
}

const openAbout = () =>{
  aboutOption.classList.add('active-option');
  aboutContent.classList.remove('hide-d');
}





const closeUserProfile = () =>{
  userProfileOption.classList.remove('active-option');
  userProfileContent.classList.add('hide-d');
}

const closeUserAccount = () =>{
  userAccountOption.classList.remove('active-option');
  userAccountContent.classList.add('hide-d');
}

const closeEditProfile = () =>{
  editProfileOption.classList.remove('active-option');
  editProfileContent.classList.add('hide-d');
}

const closeHelp = () =>{
  helpOption.classList.remove('active-option');
  helpContent.classList.add('hide-d');
}

const closeAbout = () =>{
  aboutOption.classList.remove('active-option');
  aboutContent.classList.add('hide-d');
}




//-------------------------------------------


const setUserProfile = () =>{

  userProfileContent.innerHTML ='';

  let p = document.createElement('p');
  p.classList.add('user-avatar-letter');
  p.innerHTML = user.email[0].toUpperCase();

  userProfileContent.appendChild(p);

  let content = ['userName','email', 'gender', 'age'];

  content.forEach((item, i) => {
    let divParent = document.createElement('div');
    let firstChild = document.createElement('div');
    if(item === 'userName')
      firstChild.innerHTML = 'Name';
    else
    firstChild.innerHTML = item.charAt(0).toUpperCase() + item.slice(1);
    let lastChild = document.createElement('div');

    if(item === 'email')
    lastChild.innerHTML = user[item].replaceAll("__",".");
    else
    lastChild.innerHTML = user[item][0] + user[item].slice(1).toLowerCase();

    divParent.appendChild(firstChild);
    divParent.appendChild(lastChild);
    userProfileContent.appendChild(divParent);
  });
  let logoutBtn = document.createElement('button');
  logoutBtn.innerHTML = 'Logout';
  logoutBtn.addEventListener('click',logout);
  logoutBtn.classList.add('logout');

  userProfileContent.appendChild(logoutBtn);
}


//-------------------------------

editForm.addEventListener('submit', e =>{
  e.preventDefault();

  showConfirmBox("Edit User's Profile","Save changes?", () =>{
    $.ajax({
      type: "PUT",
      url: "https://secret-brook-88276.herokuapp.com/app/users/edit",
      headers: {email: email},
      data: $('#edit-form').serialize(),
      success: () =>{
        console.log("edit succeed!");
        removeUserInfo();
        getUserInfo();
        setTimeout(() =>{
          readUserInfo();
        },2000);
        setTimeout(()=>{
          showNotiBox('Account',"Your profile war updated!", true);
          closeEditProfile();
          openUserProfile();
          newUserName.value = '';
          newPassword.value = '';
          newAge.value = '';
        }, 2500);
      },
      error: () =>{
        showNotiBox('Account',"Some error has occurred!", true, true);
        console.log("edit error!");
      }
    });
    confirmValue = false;
  }, () =>{
    console.log('cancel');
  });
});

deleteAccountBtn.addEventListener('click', () =>{
  showConfirmBox("Delete Account","Are you sure you want to delete your account?", () =>{
    $.ajax({
      type: "DELETE",
      url: "https://secret-brook-88276.herokuapp.com/app/users/delete",
      headers: {email: user.email},
      success: () =>{
        showNotiBox("Account","Your account has been deleted!", true);
        removeUserInfo();
        setTimeout(() =>{
          loginBtn.click();
        }, 3000);
      },
      error: () =>{
        showNotiBox("Account","Some error has occurred!", true, true);
      }
    });
    confirmValue = false;
  }, () =>{
    console.log('cancel');
  });
});

const logout = () =>{
  removeDB();

  $.ajax({
    type: "GET",
    url: "https://secret-brook-88276.herokuapp.com/logout",
    headers: {logout: "cry"},
    success: () =>{
      console.log("succeed");
      removeUserInfo();
      loginBtn.click();
    },
    error: () =>{
      console.log("error!!");
    }
  });
};

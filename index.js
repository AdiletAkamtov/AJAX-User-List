const apiUrl ="https://jsonplaceholder.typicode.com";
const usersListEl = document.querySelector(".users-list");
const userInfoEl = document.querySelector('.user-info')


usersListEl.addEventListener("click", (e) => {
  e.preventDefault();

  if(e.target.dataset.userId){
    console.log(e.target.dataset.userId);
    getUserInfoHTTP(e.target.dataset.userId, onGetUserInfoCallBack)
  }
});



function getUsersHTTP(cb){
  const xhr = new XMLHttpRequest();

  xhr.open('GET', `${apiUrl}/users`);

  xhr.addEventListener("load", () => {
    // console.log(xhr.responseText);
    if(xhr.status !== 200){
      console.log('Error', xhr.status);
      return; 
    }
    const res = JSON.parse(xhr.responseText);
    cb(res);
  });

  xhr.send();
}

function getUserInfoHTTP(id, cb){
  const xhr = new XMLHttpRequest();

  xhr.open('GET', `${apiUrl}/users/${id}`);

  xhr.addEventListener("load", () => {
    // console.log(xhr.responseText);
    if(xhr.status !== 200){
      console.log('Error', xhr.status);
      return; 
    }
    const res = JSON.parse(xhr.responseText);
    cb(res);
  });

  xhr.send();
}

function onGetUserInfoCallBack(user){
  console.log(user);
  if(!user.id){
    console.log('User not');
    return;
  }
  renderUserInfo(user);
}

function onGetUsersCallBack(users){
  if(!users.length){
    return;
  }

  renderUserList(users);  
}

function renderUserList(users){
  const fragment = users.reduce(
    (acc,user) => acc + userListTempalte(user),
    ""
    );
    usersListEl.insertAdjacentHTML('afterbegin', fragment);
}

function renderUserInfo(user){
  userInfoEl.innerHTML = '';

  const template = renderUserInfoTemplate(user);

  userInfoEl.insertAdjacentHTML ("afterbegin" , template);
}


function userListTempalte(user){
  return `<button type="button" class="list-group-item list-group-item-action" data-user-id="${user.id}">
    ${user.name}
    </button>`;
}

function renderUserInfoTemplate(user){
  return `
  <div class="card border-dark mb-3">
  <div class="card-header"> ${user.name}</div>
  <div class="card-body text-dark">
    <h5 class="card-title"> ${user.email}</h5>
    <ul class="list-group list-grouop-flush">
      <li class="list-group-item"><b>Nickname:</b> ${user.username}</li>
      <li class="list-group-item"><b>WebSite:</b> ${user.website}</li>
      <li class="list-group-item"><b>Company:</b> ${user.company.name}</li>
      <li class="list-group-item"><b>City:</b> ${user.address.city}</li>
      <li class="list-group-item"><b>Street:</b> ${user.address.street}</li>
      <li class="list-group-item"><b>Zipcode:</b> ${user.address.zipcode}</li>
    
    </ul>
    <div class="card-footer bg-transparent border-dark"><b>Phone:</b>${user.phone}</div>
  </div>
</div>
  `;
}

getUsersHTTP(onGetUsersCallBack);



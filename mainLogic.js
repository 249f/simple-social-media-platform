function login() {
  let username = document.getElementById("input-username").value;
  let password = document.getElementById("input-password").value;
  axios
    .post("https://tarmeezacademy.com/api/v1/login", {
      username: username,
      password: password,
    })
    .then((response) => {
      localStorage.token = response.data.token;
      localStorage.user = JSON.stringify(response.data.user);
      turnoff("login-popup-all");
      let timer = setTimeout(function () {
        alert("login Success");
      }, 1000);
      checkLogin();
    })
    .catch((err) => alert(err.response.data.message));
}

function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  location.reload();
}

function register() {
  let name = document.getElementById("register-input-name").value;
  let username = document.getElementById("register-input-username").value;
  let password = document.getElementById("register-input-password").value;
  let pfpimg = document.getElementById("uploaded-pfp-img").files[0];

  let formdata = new FormData();
  formdata.append("username", username);
  formdata.append("password", password);
  formdata.append("name", name);
  formdata.append("image", pfpimg);
  axios
    .post("https://tarmeezacademy.com/api/v1/register", formdata)
    .then((response) => {
      let data = response.data;
      // console.log(data);
      localStorage.token = data.token;
      localStorage.user = JSON.stringify(data.user);
      turnoff("register-popup-all");
      checkLogin();
      let timer = setTimeout(() => {
        alert("user created");
      }, 1000);
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
}

function checkLogin() {
  let token = localStorage.token;
  let navLoginbtn = document.getElementById("nav-login-btn");
  let navRegisterbtn = document.getElementById("nav-register-btn");
  let navBtnHolder = document.getElementById("nav-btn-holder");

  if (token == null) {
    console.log("not logged in");
  } else {
    let user = JSON.parse(localStorage.user);
    // console.log(user.profile_image);
    let plusbtn = document.getElementById("plus-btn");
    if (plusbtn != null) {
      plusbtn.classList.remove("hidden");
    }
    if (navLoginbtn != null && navRegisterbtn != null && navBtnHolder != null) {
      navLoginbtn.style.visibility = "hidden";
      navRegisterbtn.style.visibility = "hidden";
      navBtnHolder.innerHTML = `
      <div class = "nav-profile">
        <!-- add real pfp image later -->
        <img src="${user.profile_image}" alt="pfp image"> 
        <span>@${user.username}<span>
        </div>
        <button onClick = "logout()" id = "sign-out-btn">Sign Out</button>
        `;
    }
  }
} 
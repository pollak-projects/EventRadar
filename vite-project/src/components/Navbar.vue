<script setup>
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const loggedin = ref(!!localStorage.getItem("accessToken"));

const user = ref();

const loginmodal = ref();
function loginmodalbe() {
  if (loginmodal.value.style.cssText == "display: block;") {
    loginmodal.value.style.display = "none";
  } else {
    loginmodal.value.style.display = "block";
  }
}

const regmodal = ref();
function regmodalbeki() {
  if (regmodal.value.style.cssText == "display: block;") {
    regmodal.value.style.display = "none";
  } else {
    regmodal.value.style.display = "block";
  }
}

const forgotpass = ref();
function forgotpassbeki() {
  console.log(forgotpass);
  if (forgotpass.value.style.cssText == "display: block;") {
    forgotpass.value.style.display = "none";
  } else {
    forgotpass.value.style.display = "block";
  }
}

function GetUserById() {
  fetch(
    `http://localhost:3300/user/getUserById/${localStorage.getItem("userId")}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(async (res) => {
      const data = await res.json();
      user.value = data;
    })
    .catch((error) => console.log("error", error));
}

console.log(localStorage.getItem("userId"));

const regData = defineModel({
  default: {
    username: "",
    password1: "",
    password2: "",
    email: "",
    groupsNeve: "User",
    pfp: "'/person-fill.svg'",
    password: "",
    loginUser: "",
  },
});


function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userId");
  location.reload();
}

function login() {
  console.log(
    JSON.stringify({
      username: regData.value.loginUser,
      password: regData.value.password,
    })
  );
  fetch("http://localhost:3300/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: regData.value.loginUser,
      password: regData.value.password,
    }),
  })
    .then(async (result) => {
      const data = await result.json();
      console.log(data);
      if (data.access_token != undefined) {
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("refreshToken", data.refresh_token);
        localStorage.setItem("userId", data.user_id);
        loggedin.value = true;
        
        document.getElementById('successModal').style.display = 'block';
        setTimeout(() => {
          document.getElementById('successModal').style.display = 'none';
          location.reload()
        }, 2000);
      } else {
        document.getElementById('failedModalLogin').style.display = 'block';
        setTimeout(() => {
          document.getElementById('failedModalLogin').style.display = 'none';
        }, 2000);
      }
    })
    .catch((error) => console.log("error", error));
}


function register() {
  console.log(regData.value);
  if (regData.value.password1 == regData.value.password2) {
    fetch(`http://localhost:3300/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: regData.value.username,
        password1: regData.value.password1,
        password2: regData.value.password2,
        email: regData.value.email,
        groupsNeve: regData.value.groupsNeve,
        pfp: regData.value.pfp,
      }),
    })
      .then(async (result) => {
        document.getElementById('successModalReg').style.display = 'block';
        setTimeout(() => {
          document.getElementById('successModalReg').style.display = 'none';
          location.reload()
        }, 2000);
      })
      .catch((error) => console.log("error", error));
  } else {
    document.getElementById('failedModalReg').style.display = 'block';
        setTimeout(() => {
          document.getElementById('failedModalReg').style.display = 'none';
        }, 2000);
  }
}

onMounted(() => {
  GetUserById();
});
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <RouterLink to="/">
        <img src="/eventradarlogo.png" alt="" class="logo" />
      </RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse navi" id="navbarNavAltMarkup">
        <hr
          class="vonal"
          style="
            width: 100%;
            transform: translate(-5px, 0);
            margin-bottom: 7px;
            margin-top: 1px;
          "
        />
        <div class="navbar-nav">
          <RouterLink
            class="nav-link"
            :class="{ active: route.name == 'Home' }"
            aria-current="page"
            to="/"
            >Főoldal</RouterLink
          >
          <RouterLink
            class="nav-link"
            :class="{
              active: route.name == 'Events' || route.name == 'Information',
            }"
            to="/events"
            >Események</RouterLink
          >
          <RouterLink
            class="nav-link"
            :class="{ active: route.name == 'Creation' }"
            to="/creation"
            >Létrehozás</RouterLink
          >
          <RouterLink
            v-if="user?.groupsNeve == 'Admin'"
            class="nav-link"
            :class="{ active: route.name == 'Admin' }"
            to="/Admin"
            >Admin</RouterLink
          >
          <RouterLink
            class="nav-link signinmobile"
            type="button"
            @click="loginmodalbe"
            to="#"
            v-if="!loggedin"
          >
            Bejelentkezés
          </RouterLink>
          <RouterLink
            class="nav-link signinmobile"
            to="/Profile"
            aria-current="page"
            >Adataim</RouterLink
          >
          <RouterLink
            class="nav-link signinmobile"
            type="button"
            @click="logout()"
            to="#"
            v-if="loggedin"
          >
            Kijelentkezés
          </RouterLink>
        </div>
      </div>
      <button
        class="btn signin"
        type="button"
        @click="loginmodalbe"
        style="width: auto"
        v-if="!loggedin"
      >
        Bejelentkezés
      </button>

      <div class="dropdown logoutdropdown">
        <button
          class="btn profileicon"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          v-if="loggedin"
        >
          <img src="/person-fill.svg" height="30px" width="30px" alt="" />
        </button>
        <ul class="dropdown-menu">
          <li>
            <RouterLink class="dropdown-item" to="/Profile" aria-current="page"
              >Adataim</RouterLink
            >
          </li>
          <li>
            <button class="dropdown-item" @click="logout()" v-if="loggedin">
              Kijelentkezés
            </button>
          </li>
        </ul>
      </div>
      <div class="modal" ref="loginmodal">
        <form
          class="modal-content animate"
          method="post"
          onSubmit="return checkPassword(this)"
        >
          <div class="imgcontainer">
            <span @click="loginmodalbe()" class="close" title="Close Modal"
              >&times;</span
            >
            <img src="/eventradarlogo.png" alt="Avatar" class="signinpic" />
          </div>

          <div class="container">
            <label for="uname"><b>Felhasználónév</b></label>
            <input
              type="text"
              placeholder=" "
              name="uname"
              v-model="regData.loginUser"
              required
            />

            <label for="psw"><b>Jelszó</b></label>
            <input
              type="password"
              placeholder=""
              v-model="regData.password"
              name="psw"
              required
            />

            <button
              class="btn btn-primary"
              type="button"
              style="margin-top: 15px; width: 100%"
              @click="login()"
            >
              Bejelentkezés
            </button>

            <span class="psw"
              ><a style="text-decoration: underline; color: #0000EE; cursor: pointer;"
                @click="
                  loginmodalbe();
                  forgotpassbeki();
                "
              >
                Elfelejtetted a jelszavadat?
          </a></span
            >
          </div>

          <div
            class="container"
            style="
              background-color: #f1f1f1;
              align-items: center;
              align-content: center;
            "
          >
            <span
              @click="
                loginmodalbe();
                regmodalbeki();
              "
              >Nincs fiókod? <a style="text-decoration: underline; color: #0000EE; cursor: pointer;">Regisztráció</a></span
            >
          </div>
        </form>
      </div>
      <div id="successModal" class="success-modal" style="display: none;">
  <div class="modal-content">
    <span @click="closeModal" id="closeModal" class="close">&times;</span>
    <h2>Sikeres bejelentkezés!</h2>
    <p>Gratulálunk, sikeresen bejelentkeztél!</p>
  </div>
</div>
<div id="failedModalLogin" class="failed-modal" style="display: none;">
  <div class="modal-content">
    <span @click="closeModal" id="closeModal" class="close">&times;</span>
    <h2>Sikertelen belépés!</h2>
    <p>Hibás felhasználónév / jelszó!</p>
  </div>
</div>

      <div ref="regmodal" class="modal">
        <form class="modal-content" :onsubmit="register" method="post">
          <div class="imgcontainer">
            <span @click="regmodalbeki()" class="close" title="Close Modal"
              >&times;</span
            >
            <img src="/eventradarlogo.png" alt="Avatar" class="signinpic" />
          </div>

          <div class="container">
            <label for="uname"><b>Felhasználónév</b></label>
            <input
              v-model="regData.username"
              type="text"
              name="uname"
              ref="username"
              required
            />

            <label for="uname"><b>E-mail</b></label>
            <input type="text" v-model="regData.email" name="email" required />

            <label for="psw"><b>Jelszó</b></label>
            <input
              type="password"
              v-model="regData.password1"
              name="psw1"
              required
            />

            <label for="psw"><b>Jelszó újra</b></label>
            <input
              type="password"
              v-model="regData.password2"
              name="psw2"
              required
            />

            <button
              class="btn btn-primary"
              type="button"
              style="margin-top: 15px; width: 100%"
              @click="register()"
            >
              Regisztráció
            </button>
          </div>

          <div
            class="container"
            style="
              background-color: #f1f1f1;
              align-items: center;
              align-content: center;
            "
          >
            <span
              @click="
                regmodalbeki();
                loginmodalbe();
              "
              >Van fiókod? <a style="text-decoration: underline; color: #0000EE; cursor: pointer;">Bejelentkezés</a></span
            >
          </div>
        </form>
      </div>
      <div id="successModalReg" class="success-modal" style="display: none;">
  <div class="modal-content">
    <span @click="closeModal" id="closeModal" class="close">&times;</span>
    <h2>Sikeres regisztráció!</h2>
    <p>Üdv az EventRadar oldalon!</p>
  </div>
</div>
<div id="failedModalReg" class="failed-modal" style="display: none;">
  <div class="modal-content">
    <span @click="closeModal" id="closeModal" class="close">&times;</span>
    <h2>Sikertelen regisztráció!</h2>
    <p>A két jelszó nem egyezik!</p>
  </div>
</div>

      <div class="modal" ref="forgotpass">
        <form
          class="modal-content animate"
          method="post"
          onSubmit="return checkPassword(this)"
        >
          <div class="imgcontainer">
            <span @click="forgotpassbeki()" class="close" title="Close Modal"
              >&times;</span
            >
            <img src="/eventradarlogo.png" alt="Avatar" class="signinpic" />
          </div>

          <div class="container">
            <label for="uname"><b>E-mail</b></label>
            <input type="text" placeholder=" " name="uname" required />

            <button
              class="btn btn-primary"
              type="submit"
              style="margin-top: 15px; width: 100%"
            >
              Küldés
            </button>
          </div>
        </form>
      </div>
    </div>
  </nav>
</template>

<style scoped>

.success-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex; 
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease-in-out; 
  margin-top: -90px;
}


@keyframes fadeIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.success-modal .modal-content {
  background-color: #28a745; 
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2); 
  text-align: center;
  width: 30%; 
  max-width: 400px; 
  font-family: 'Arial', sans-serif;
  color: white;
}

.success-modal .close {
  color: #fff;
  font-size: 28px;
  font-weight: bold;
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
}

.success-modal .close:hover,
.success-modal .close:focus {
  color: #ddd; 
  text-decoration: none;
}


.failed-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex; 
  justify-content: center;
  align-items: center;
  animation: fadeInError 0.3s ease-in-out;
  margin-top: -90px;
}

@keyframes fadeInError {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.failed-modal .modal-content {
  background-color: #dc3545; 
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 30%; 
  max-width: 400px; 
  font-family: 'Arial', sans-serif;
  color: white;
}


.failed-modal .close {
  color: #fff;
  font-size: 28px;
  font-weight: bold;
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
}

.failed-modal .close:hover,
.failed-modal .close:focus {
  color: #ddd; 
  text-decoration: none;
}


@media only screen and (max-width: 768px) {
  .success-modal {
    margin-top: 0;
    align-items: flex-start;
    padding: 10px; 
  }

  .success-modal .modal-content {
    width: 90%; 
    max-width: 350px; 
    padding: 20px; 
    border-radius: 10px; 
    font-size: 1rem; 
    text-align: center;
  }

  .success-modal .close {
    font-size: 24px; 
    position: absolute;
    top: 5px; 
    right: 10px; 
  }
  .failed-modal {
    margin-top: 0;
    align-items: flex-start; 
    padding: 10px;
  }

  .failed-modal .modal-content {
    width: 90%; 
    max-width: 350px; 
    padding: 20px;
    border-radius: 10px;
    font-size: 1rem;
    text-align: center;
  }

  .failed-modal .close {
    font-size: 24px;
    position: absolute;
    top: 5px;
    right: 10px;
  }
}



.logo {
  padding-top: 5px;
  -webkit-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
  height: 40px;
  width: auto;
}
.navi {
  display: auto;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 25px;
  transform: translate(-30px, 0);
  margin-top: 10px;
  font-family: "MonumentRegular", sans-serif;
}
.event-container {
  display: flex;
  justify-content: center;
  margin: 20px;
  flex-wrap: wrap;
}
.event-card {
  background: #f8f8f8;
  padding: 15px;
  margin: 10px;
  width: 200px;
  height: 300px;
  border-radius: 10px;
}
.kep {
  width: 100%;
}

.active {
  font-weight: bold;
}

.comment-section {
  padding-top: 10px;
  padding-bottom: 10px;
  background: #eee;
}

.comment-section .user {
  width: 50px;
  border-radius: 40%;
  margin-right: 10px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.signin {
  background-color: #f44336;
  color: #000;
  font-weight: bold;
  padding: 14px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  width: auto;
  margin-right: 20px;
}

.signin:hover {
  background-color: #cc1104;
}

.profileicon {
  color: #000;
  font-weight: bold;
  padding: 14px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  width: auto;
  margin-right: 20px;
  margin-top: 5px;
}

button:hover {
  opacity: 0.8;
}

.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
  position: relative;
}

.signinpic {
  width: 250px;
  height: auto;
  margin-top: 40px;
}

.container {
  padding: 16px;
  border-bottom-right-radius: 10%;
  border-bottom-left-radius: 10%;
  font-family: "MonumentRegular", sans-serif;
  font-size: 16px;
}

span.psw {
  float: right;
  padding-top: 16px;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  padding-top: 60px;
}

.modal-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto;
  border: 1px solid #888;
  width: 380px;
}

.close {
  position: absolute;
  right: 10px;
  top: -30px;
  color: #000;
  font-size: 35px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: red;
  cursor: pointer;
}

.animate {
  -webkit-animation: animatezoom 0.6s;
  animation: animatezoom 0.6s;
}

@-webkit-keyframes animatezoom {
  from {
    -webkit-transform: scale(0);
  }
  to {
    -webkit-transform: scale(1);
  }
}

@keyframes animatezoom {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

@media only screen and (max-width: 600px) {
  .signin {
    display: none;
  }
  .navi {
    display: auto;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 25px;
    transform: translate(+5px, 0);
    margin-top: 10px;
  }
  .logoutdropdown {
    display: none;
  }
}

@media only screen and (min-width: 600px) {
  .signinmobile {
    display: none;
  }
  .vonal {
    display: none;
  }
}
.regularfont {
  font-family: "MonumentRegular", sans-serif;
}

.navbar-nav {
  align-content: center;
}
.dropdown-menu {
  transform: translateX(-80px);
}
</style>

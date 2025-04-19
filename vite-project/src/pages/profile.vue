<script setup>
import Navbar from "../components/Navbar.vue";
import { RouterLink } from "vue-router";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const rawImg = ref();
const imgs = ref();
const reader = new FileReader();
const imga = ref();
const email = ref("");
const username = ref("");
const id = ref();
const isLoggedIn = ref(false);

onMounted(() => {
  const userId = localStorage.getItem("userId");
  if (userId) {
    isLoggedIn.value = true;
    GetUser();
  } else {
    isLoggedIn.value = false;
  }
});


function Save() {
  const fileInput = imgs.value;
  const megengedettFormatum = fileInput.files[0].name.includes("jpg");
  if (megengedettFormatum) {
    reader.onload = async function (e) {
      rawImg.value = reader.result;
      //console.log(rawImg.value);
      await FileUpload(rawImg.value);
    };

    if (fileInput && fileInput.files[0]) {
      reader.readAsDataURL(fileInput.files[0]);
    }
  } else {
    document.getElementById("failedModalProfile").style.display = "flex";
    setTimeout(() => {
      document.getElementById("failedModalProfile").style.display = "none";
    }, 2000);
  }
}

async function FileUpload(file) {
  console.log(file);
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3300/user/postImages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        file: file,
        id: Number(localStorage.getItem("userId")),
      }),
    })
      .then((response) => {
        if (response.ok) {
          document.getElementById("successModalProfile").style.display =
            "flex";
          setTimeout(() => {
            document.getElementById("successModalProfile").style.display =
              "none";
            resolve(response);
            
            location.reload();
          }, 2000);
        } else {
          alert("Sikertelen feltöltés");
        }
      })
      .catch((error) => console.error("Hiba kijelentkezés közben:", error));
  });
}

async function GetTaskThree(kapottTipus) {
  var requestOptions = {
    method: "GET",
  };
  return new Promise((resolve, reject) => {
    fetch(
      `http://localhost:3300/user/getImages?kapottTipus=${kapottTipus}`,
      requestOptions
    )
      .then(async (result) => {
        const res = await result.text();
        const valasz = JSON.parse(res);
        resolve(valasz);
      })
      .catch((error) => console.log("error", error));
  });
}

const user = ref();
const route = useRoute();

function GetUser() {
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
      id.value = user.value.id;
      username.value = user.value.username;
      email.value = user.value.email;

      if (!data.profilkep) {
        imga.value = "/public/user2.jpg"; // Alapértelmezett kép elérési útja
      } else {
        imga.value = data.profilkep; // Egyébként használd a felhasználó profilképét
      }
    })

    .catch((error) => console.log("error", error));
}

const password = ref("");
const passwordUpdate1 = ref("");
const passwordUpdate2 = ref("");

async function passwordUpdate() {
  if (passwordUpdate1.value === passwordUpdate2.value) {
    fetch(
      `http://localhost:3300/user/passwordChange/${localStorage.getItem("userId")}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password.value,
          passwordReset1: passwordUpdate1.value,
          passwordReset2: passwordUpdate2.value,
        }),
      }
    )
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        if (data.success) {
         
          const loginData = await login(username.value, passwordUpdate1.value); 
          localStorage.setItem("access_token", loginData.access_token);
          localStorage.setItem("refresh_token", loginData.refresh_token);
          
        }
      })
      .catch((error) => console.log("Hiba jelszó módosításkor:", error));
  } else {
          document.getElementById("failedModalProfile2").style.display = "flex";
        setTimeout(() => {
          document.getElementById("failedModalProfile2").style.display = "none";
        }, 2000);
  }
}
function UpdateUser() {
  const fileInput = imgs.value;
  if (fileInput && fileInput.files[0]) Save();

  fetch(`http://localhost:3300/user/update/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id.value,
      email: email.value,
      username: username.value,
    }),
  })
    .then(async (res) => {
      const data = await res.json();
      console.log(data);
      user.value = data;
    })

    .catch((error) => console.log("error", error));
}

function showFileDialog() {
  document.getElementById("file").click();
}

onMounted(async () => {
  GetUser();
  imga.value = await GetTaskThree(1);
  console.log(user.value);
});

function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
</script>

<template>
  <Navbar />
  <br />
  <div class="event-form">
    <h2>Profil adatai</h2>
    <form @submit.prevent="handleSubmit">
      <div
        alt=""
        id="prof-img"
        @click="showFileDialog()"
        :style="'background-image: url(' + imga + ');' + (isLoggedIn ? '' : ' pointer-events: none;') "
        
      ></div>
      <div class="form-group">
        <label for="event-name">Név:</label>
        <input type="text" id="event-name" v-model="username" :disabled="!isLoggedIn" required />
      </div>
      <div class="form-group">
        <label for="location">Email cím:</label>
        <input type="text" id="location" v-model="email" :disabled="!isLoggedIn" required />
      </div>

      <div class="form-group" style="display: none">
        <label for="image-upload">Kép feltöltése:</label>
        <input type="file" id="file" accept="image/jpeg" ref="imgs"  />
      </div>
      <button type="submit" @click="UpdateUser">Módosítás</button>
    </form>
  </div>
  <br />
  <div class="event-form">
    <h2>Jelszó módosítás</h2>
    <form>
      <div class="form-group">
        <label for="event-name">Eredeti jelszó:</label>
        <input
          type="password"
          id="event-name"
          :value="password"
          @change="(event) => (password = event.target.value)"
          :disabled="!isLoggedIn"
        />
      </div>
      <div class="form-group">
        <label for="event-name">Új jelszó:</label>
        <input type="password" id="event-name"  :value="passwordUpdate1"
          @change="(event) => (passwordUpdate1 = event.target.value)"
          :disabled="!isLoggedIn"/>
      </div>
      <div class="form-group">
        <label for="location">Jelszó újra:</label>
        <input type="password" id="location" :value="passwordUpdate2"
          @change="(event) => (passwordUpdate2 = event.target.value)"
          :disabled="!isLoggedIn"/>
      </div>
      <button type="button" @click="passwordUpdate()">Módosítás</button>
    </form>
  </div>
  <div id="successModalProfile" class="success-modal" style="display: none">
    <div class="modal-content">
      <h2>Változtatások mentve!</h2>
    </div>
  </div>
  <div id="failedModalProfile" class="failed-modal" style="display: none">
    <div class="modal-content">
      <h2>Nem támogatott fájl formátum!</h2>
    </div>
  </div>
  <div id="failedModalProfile2" class="failed-modal" style="display: none">
    <div class="modal-content">
      <h2>A két jelszó nem egyezik!</h2>
    </div>
  </div>
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
  align-items: flex-start;
  animation: fadeIn 0.3s ease-in-out;
  margin-top: 80px;
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
  font-family: "Arial", sans-serif;
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
.success-modal .modal-content h2,
.success-modal .modal-content p {
  color: white;
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
  align-items: flex-start;
  animation: fadeIn 0.3s ease-in-out;
  margin-top: 80px;
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

.failed-modal .modal-content {
  background-color: #df1919;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 30%;
  max-width: 400px;
  font-family: "Arial", sans-serif;
  color: white;
}

.failed-modal .modal-content h2,
.failed-modal .modal-content p {
  color: white;
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
}

#prof-img {
  width: 150px;
  height: 150px;
  cursor: pointer;
  border-radius: 50%;
  border: 3px solid white;
  display: block;
  margin: 0 auto;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
#prof-img:hover::before {
  content: "Kép csere";
  position: relative;
  font-size: larger;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  backdrop-filter: blur(5px);
}
.event-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: url(/moderndik2.png);
  border-radius: 8px;
  font-family: "MonumentBold";
  background-size: cover;
  margin-bottom: 20px;
}

h2 {
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
  font-family: "MonumentRegular";
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

input,
select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #cc1104;
}
</style>

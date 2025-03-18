<script setup>
import Navbar from '../components/Navbar.vue';
import { RouterLink } from 'vue-router';
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { jsx } from "vue/jsx-runtime";

const rawImg = ref();
const imgs = ref();
const reader = new FileReader();

function Save() {
    reader.onload = async function (e) {
        rawImg.value = reader.result;
        console.log(rawImg.value);
        await FileUpload(rawImg.value);
    };
    const fileInput = imgs.value
    if (fileInput && fileInput.files[0]) {
        reader.readAsDataURL(fileInput.files[0]);
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
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Sikeres feltöltés");
          resolve(response);
        } else {
          alert("Sikertelen feltöltés");
        }
      })
      .catch((error) => console.error("Hiba kijelentkezés közben:", error));
  });
}

const user = ref();
const route = useRoute();




function GetUser() {
  fetch(`http://localhost:3300/user/getUserById/${localStorage.getItem("userId")}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      const data = await res.json();
      console.log(data);
      user.value = data
    })
    .catch((error) => console.log("error", error));
}

onMounted(() => {
  GetUser()
})

</script>

<template>
  <Navbar/>
  <br>
  <div class="event-form">
    <h2>Profil adatai</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="event-name">Név:</label>
        <input type="text" id="event-name" :value="user?.username" required disabled/>
      </div>

      
      <div class="form-group">
        <label for="location">Email cím:</label>
        <input type="text" id="location" :value="user?.email" disabled required />
      </div>

      <div class="form-group">
        <label for="event-date">Regisztráció dátuma:</label>
        <input type="date" id="event-date" :value="user?.create_date" disabled required />
      </div>

  
      <div  class="form-group">
        <label for="image-upload">Kép feltöltése:</label>
        <input type="file" id="image-upload" />
      </div>

      <input type="file" ref="imgs" />

      <button type="submit" @click="Save">Esemény mentése</button>
    </form>
  </div>
</template>

<style scoped>
.event-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: url(/moderndik2.png);
  border-radius: 8px;
  font-family: 'MonumentBold';
  background-size: cover;
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

input, select {
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

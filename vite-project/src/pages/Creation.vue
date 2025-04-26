<script setup>
import Navbar from "../components/Navbar.vue";
import { ref, watch } from "vue"; // <--- watch-ot is importáljuk

const fileInputVisible = ref(false);
const today = new Date().toISOString().split("T")[0];

const eventData = defineModel({
  default: {
    kategoria: [
      "Koncert",
      "Túrázás",
      "Színház",
      "Kiállítás",
      "Workshop",
      "Egyéb",
    ],
    esemeny_nev: "",
    esemeny_date: "",
    kezdetido: "",
    hossz: "",
    helyszin: "",
    selectedKategoria: ref(""),
    leiras: "",
    maxfo: "",
  },
});

// ===== Itt figyeljük az eventData.maxfo-t =====
watch(
  () => eventData.value.maxfo,
  (newVal) => {
    if (newVal !== "" && Number(newVal) < 1) {
      eventData.value.maxfo = 1;
    }
  }
);
// ===============================================

function creation() {

  if (
    !eventData.value.esemeny_nev ||
    !eventData.value.esemeny_date ||
    !eventData.value.kezdetido ||
    !eventData.value.hossz ||
    !eventData.value.helyszin ||
    !eventData.value.selectedKategoria.value ||
    !eventData.value.leiras
  ) {
    return;
  }

  let foszam = eventData.value.maxfo;
 
  if(foszam == "")
  {
    foszam = null  
  }

  console.log(foszam)
  console.log(eventData.value);
  fetch(`http://localhost:3300/event/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: Number(localStorage.getItem("userId")),
      esemeny_nev: eventData.value.esemeny_nev,
      leiras: eventData.value.leiras,
      helyszin: eventData.value.helyszin,
      esemeny_date: eventData.value.esemeny_date,
      kezdetido: eventData.value.kezdetido,
      hossz: eventData.value.hossz,
      kategoria: eventData.value.selectedKategoria.value,
      foszam: foszam,
    }),
  })
    .then(async (result) => {
      document.getElementById("successModalCreation").style.display = "flex";
        setTimeout(() => {
          document.getElementById("successModalCreation").style.display = "none";
          location.reload();
        }, 2000);
    })
    .catch((error) => console.log("error", error));
}

const handleCategoryChange = (event) => {
  console.log(event.target.value);
  eventData.value.selectedKategoria.value = event.target.value;
  if (event.target.value == "Egyéb") {
    fileInputVisible.value = true;
  } else {
    fileInputVisible.value = false;
  }
};

const handleSubmit = () => {
  console.log({});
};
</script>

<template>
  <Navbar />
  <br />
  <div class="event-form">
    <h2 style="color: black">Új esemény hozzáadása</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="event-name">Esemény neve:</label>
        <input
          type="text"
          id="event-name"
          v-model="eventData.esemeny_nev"
          maxlength="191"
          required
        />
      </div>

      <div class="form-group">
        <label for="event-date">Dátum:</label>
        <input
          type="date"
          id="event-date"
          v-model="eventData.esemeny_date"
          :min="today"
          required
        />
      </div>

      <div class="form-group">
        <label for="start-time">Óra (kezdet):</label>
        <input
          type="time"
          id="start-time"
          v-model="eventData.kezdetido"
          required
        />
      </div>

      <div class="form-group">
        <label for="end-time">Esemény becsült hossza óraban:</label>
        <input type="number" id="end-time" v-model="eventData.hossz" required />
      </div>

      <div class="form-group">
        <label for="end-time">Max létszám:</label>
        <input
          type="number"
          min="1"
          id="end-time"
          v-model="eventData.maxfo"
          placeholder="Opcionális"
          required
        />
      </div>

      <div class="form-group">
        <label for="location">Helyszín:</label>
        <input
          type="text"
          id="location"
          v-model="eventData.helyszin"
          maxlength="191"
          required
        />
      </div>

      <div class="form-group">
        <label for="leiras">Leirás:</label>
        <input type="text" id="leiras" v-model="eventData.leiras" maxlength="191" required />
      </div>

      <div class="form-group">
        <label for="category">Kategória:</label>
        <select
          id="category"
          v-model="selectedKategoria"
          @change="handleCategoryChange"
        >
          <option v-for="cat in eventData.kategoria" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>
      <div v-if="fileInputVisible" class="form-group">
        <label for="image-upload">Kép feltöltése:</label>
        <input type="file" id="image-upload" />
      </div>
      <div style="text-align: center">
        <button type="button" @click="creation()">Esemény mentése</button>
      </div>
    </form>
  </div>
  <div id="successModalCreation" class="success-modal" style="display: none">
        <div class="modal-content">
          <h2>Sikeresen létrehoztad az eseményt!</h2>
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
.success-modal .modal-content h2,
.success-modal .modal-content p {
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

  .success-modal .close {
    font-size: 24px; 
    position: absolute;
    top: 5px; 
    right: 10px; 
  }
}

.event-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: url(/moderndik2.png);
  border-radius: 8px;
  font-family: "MonumentBold";
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
  color: #353232;
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
  width: 60%;
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

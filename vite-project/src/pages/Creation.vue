<script setup>
import Navbar from "../components/Navbar.vue";
import { ref } from "vue";

const fileInputVisible = ref(false);

const eventData = defineModel({
  default: {
    kategoria: [
      "Koncert",
      "Túrázás",
      "Színház",
      "Kiállítás",
      "Szűk körű rendezvény",
      "Egyéb",
    ],
    esemeny_nev: "",
    esemeny_date: "",
    kezdetido: "",
    vegeido: "",
    helyszin: "",
    selectedKategoria: ref(""),
    kezdetido: "",
    vegeido: "",
    leiras: "",
    maxfo: ""
  },
});


function creation() {
  console.log(eventData.value);
  fetch(`http://localhost:3300/event/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: Number(localStorage.getItem("userId")),
      esemeny_nev: eventData.value.esemeny_nev,
      leiras : eventData.value.leiras,
      helyszin: eventData.value.helyszin,
      esemeny_date: eventData.value.esemeny_date,
      kezdetido: eventData.value.kezdetido,
      vegeido: eventData.value.vegeido,
      kategoria: eventData.value.selectedKategoria.value,
      foszam: eventData.value.maxfo
    }),
  })
    .then(async (result) => {
      alert("Siker");
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
    <h2 style="color:black;">Új esemény hozzáadása</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="event-name">Esemény neve:</label>
        <input
          type="text"
          id="event-name"
          v-model="eventData.esemeny_nev"
          required
        />
      </div>

      <div class="form-group">
        <label for="event-date">Dátum:</label>
        <input
          type="date"
          id="event-date"
          v-model="eventData.esemeny_date"
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
        <label for="end-time">Óra (befejezés):</label>
        <input type="time" id="end-time" v-model="eventData.vegeido" required />
      </div>

      <div class="form-group">
        <label for="end-time">Max létszám</label>
        <input type="number" id="end-time" v-model="eventData.maxfo" required />
      </div>

      <div class="form-group">
        <label for="location">Helyszín:</label>
        <input
          type="text"
          id="location"
          v-model="eventData.helyszin"
          required
        />
      </div>


      <div class="form-group">
        <label for="leiras">Leirás:</label>
        <input
          type="text"
          id="leiras"
          v-model="eventData.leiras"
          required
        />
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
      <div style="text-align: center;">
        <button type="button"  @click="creation()">Esemény mentése</button>
      </div>

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

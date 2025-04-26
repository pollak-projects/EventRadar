<script setup>
import { useRoute } from "vue-router";
import Navbar from "../components/Navbar.vue";
import { onMounted, ref, watch, toRaw } from "vue"; // <--- watch-ot is importáljuk

const nev = ref("");
const leiras = ref("");
const hossz = ref("");
const datum = ref("");
const kezdetido = ref("");
const helyszin = ref("");
const maxfo = ref("");


const fileInputVisible = ref(false);

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
    selectedKategoria: ref("")
  },
});

// ===== Itt figyeljük az eventData.maxfo-t =====
/*watch(
  () => eventData.value.maxfo,
  (newVal) => {
    if (newVal !== "" && Number(newVal) < 1) {
      eventData.value.maxfo = 1;
    }
  }
);*/
// ===============================================
const events = ref();
const szam = ref();
const route = useRoute();

function GetEvent() {
  fetch(`http://localhost:3300/event/getId/${route.params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      const data = await res.json();
      events.value = data;


      const event = toRaw(events.value[0]);
      console.log(event)
      nev.value = event.esemeny_nev;
      leiras.value = event.leiras;
      hossz.value = event.hossz;
      datum.value = event.esemeny_date?.substring(0, 10);
      kezdetido.value = event.kezdetido?.substring(11, 16);
      console.log(kezdetido)
      maxfo.value = event.foszam;
      helyszin.value = event.helyszin;

      szam.value = event.foszam;
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

onMounted(() => {
  console.log("jhbuh");
  GetEvent();
});
</script>
<template>
  <Navbar />
  <br />


  <div class="event-form">
    <h2 style="color: black">Esemény módosítása</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="event-name">Esemény neve:</label>
        <input
          type="text"
          id="event-name"
          v-model="nev"
        />
      </div>

      <div class="form-group">
        <label for="event-date">Dátum:</label>
        <input
          type="date"
          id="event-date"
          v-model="datum"
          required
        />
      </div>

      <div class="form-group">
        <label for="start-time">Óra (kezdet):</label>
        <input type="time" id="start-time" v-model="kezdetido" required />
      </div>

      <div class="form-group">
        <label for="end-time">Esemény becsült hossza óraban:</label>
        <input type="number" id="end-time" v-model="hossz" required />
      </div>

      <div class="form-group">
        <label for="end-time">Max létszám</label>
        <input
          type="number"
          min="1"
          id="end-time"
          placeholder="Opcionális"
          required
          v-model="maxfo"
        />
      </div>

      <div class="form-group">
        <label for="location">Helyszín:</label>

        <input type="text" id="location" required v-model="helyszin" />
      </div>

      <div class="form-group">
        <label for="leiras">Leirás:</label>
        <input type="text" id="leiras" v-model="leiras" required />
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
  background: url(/alma.jpg);
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
  background-color: #2f3757;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #3e476d;
}
</style>

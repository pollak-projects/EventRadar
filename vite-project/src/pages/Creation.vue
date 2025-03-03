<script setup>
import Navbar from '../components/Navbar.vue';
import { ref } from 'vue';

const eventData = defineModel({
  default: { 
    categories: ['Koncert', 'Túrázás', 'Színház', 'Kiállítás', 'Szűk körű rendezvény', 'Egyéb'],
    eventName: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    location: "",
    category: ref(categories[0]),
    fileInputVisible: ref(false),
  },  
});

function creation() {
  console.log(eventData.value)
  fetch ('http://localhost:3300/esemenyek/create', {
    method: "POST",
    headers: {
      "content-type" : "application/json",
    },
    body: JSON.stringify ({
      eventName: eventData.value.eventName,
      eventDate: eventData.value.eventDate,
      startTime: eventData.value.startTime,
      endTime: eventData.value.endTime,
      location: eventData.value.location,
      categories: eventData.value.location,
      fileInputVisible: fileInputVisible.value.fileInputVisible
    })
  })
  .then(async (result) => {
      alert("Siker");
      location.reload()
    })
    .catch((error) => console.log("error", error));

}


const handleCategoryChange = () => {
  if (category.value === 'Egyéb') {
    fileInputVisible.value = true;
  } else {
    fileInputVisible.value = false;
  }
};

const handleSubmit = () => {
  console.log({
    eventName: eventName.value,
    eventDate: eventDate.value,
    startTime: startTime.value,
    endTime: endTime.value,
    location: location.value,
    category: category.value,
  });
};
</script>

<template>
  <Navbar/>
  <br>
  <div class="event-form">
    <h2>Új esemény hozzáadása</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="event-name">Esemény neve:</label>
        <input type="text" id="event-name" v-model="eventName" required />
      </div>

      <div class="form-group">
        <label for="event-date">Dátum:</label>
        <input type="date" id="event-date" v-model="eventDate" required />
      </div>

      <div class="form-group">
        <label for="start-time">Óra (kezdet):</label>
        <input type="time" id="start-time" v-model="startTime" required />
      </div>

      <div class="form-group">
        <label for="end-time">Óra (befejezés):</label>
        <input type="time" id="end-time" v-model="endTime" required />
      </div>

      <div class="form-group">
        <label for="location">Helyszín:</label>
        <input type="text" id="location" v-model="location"  required />
      </div>

      <div class="form-group">
        <label for="category">Kategória:</label>
        <select id="category" v-model="category" @change="handleCategoryChange">
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

  
      <div v-if="fileInputVisible" class="form-group">
        <label for="image-upload">Kép feltöltése:</label>
        <input type="file" id="image-upload" />
      </div>

      <button type="submit" @click="creation()">Esemény mentése</button>
    </form>
  </div>
</template>

<style scoped>
.event-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ebd3b3;
  border-radius: 8px;
  font-family: 'MonumentBold';
  
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

<script setup>
import Navbar from '../components/Navbar.vue';
import { ref } from 'vue';

const categories = ['Koncert', 'Túrázás', 'Színház', 'Kiállítás', 'Szűk körű rendezvény', 'Egyéb'];
const eventName = ref('');
const eventDate = ref('');
const startTime = ref('');
const endTime = ref('');
const location = ref('');
const category = ref(categories[0]);
const fileInputVisible = ref(false);


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

      <button type="submit">Esemény mentése</button>
    </form>
  </div>
</template>

<style scoped>
.event-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
}

h2 {
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
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

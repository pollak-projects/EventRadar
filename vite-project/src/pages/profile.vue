<script setup>
import Navbar from '../components/Navbar.vue';
import { RouterLink } from 'vue-router';
</script>

<template>
  <Navbar/>
  <br>
  <div class="event-form">
    <h2>Profil adatai</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="event-name">Név:</label>
        <input type="text" id="event-name" v-model="eventName" required />
      </div>

      
      <div class="form-group">
        <label for="location">Email cím:</label>
        <input type="text" id="location" v-model="location"  required />
      </div>

      <div class="form-group">
        <label for="event-date">Regisztráció dátuma:</label>
        <input type="date" id="event-date" v-model="eventDate" required />
      </div>

  
      <div  class="form-group">
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

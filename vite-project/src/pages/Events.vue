<script setup>
import { RouterLink } from "vue-router";
import Navbar from "../components/Navbar.vue";
</script>

<template>
  <Navbar />
<div class="cards">
  <div class="card">
    <h1>asd</h1>
    <h2>2025.02.05.</h2>
    <RouterLink class="info-button" to="/information" style="text-decoration: none;">
      Információk
      <span class="info-icon"></span>
    </RouterLink>
  </div>

    <div class="card">
    <h1>asd</h1>
    <h2>2025.02.05.</h2>
    <RouterLink class="info-button" to="/information" style="text-decoration: none;">
      Információk
      <span class="info-icon"></span>
    </RouterLink>
  </div>

    <div class="card">
    <h1>asd</h1>
    <h2>2025.02.05.</h2>
    <RouterLink class="info-button" to="/information" style="text-decoration: none;">
      Információk
      <span class="info-icon"></span>
    </RouterLink>
  </div>
  
  <div class="card">
    <h1>asd</h1>
    <h2>2025.02.05.</h2>
    <RouterLink class="info-button" to="/information" style="text-decoration: none;">
      Információk
      <span class="info-icon"></span>
    </RouterLink>
  </div>

  <div class="card">
    <h1>asd</h1>
    <h2>2025.02.05.</h2>
    <RouterLink class="info-button" to="/information" style="text-decoration: none;">
      Információk
      <span class="info-icon"></span>
    </RouterLink>
  </div>
</div>
  
</template>

<style scoped>
.cards{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
}

.card {
  margin: 30px;
  padding: 30px;
  width: 500px;
  height: 250px;
  border-radius: 20px;
  overflow: hidden;
  background: url("./conecrt.jpg") no-repeat center center/cover;
  position: relative;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-repeat: no-repeat;
}


.card::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: inherit;
  filter: blur(10px);
  z-index: -1;
}

.card h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: bold;
}

.card h2 {
  margin: 5px 0 20px;
  font-size: 1.2rem;
  font-weight: normal;
}

.info-button {
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 15px;
  padding: 8px 16px;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  width: 25%;
  justify-content: center;
  border:  #ffffff 100px;
}


.info-icon {
  width: 16px;
  height: 16px;
  background: url("info-icon.svg") no-repeat center center/contain;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 50px;
  left: 0;
  background-color: #ffffff;
  color: #333;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 200px;
  padding: 10px;
  z-index: 1;
}

.dropdown-menu a {
  display: block;
  padding: 8px 12px;
  text-decoration: none;
  color: #333;
  font-size: 1rem;
}

.dropdown-menu a:hover {
  background-color: #f0f0f0;
}
.show-dropdown {
  display: block;
}

@media only screen and (max-width: 600px) {

    .card {
        margin: 15px auto;
        padding: 30px;
        width: 370px;
        height: 210px;
        border-radius: 20px;
        overflow: hidden;
        background: url("./conecrt.jpg") no-repeat center center/cover;
        position: relative;
        color: #ffffff;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        background-repeat: no-repeat;
    }
}

</style>

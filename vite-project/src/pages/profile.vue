<script setup>
import Navbar from '../components/Navbar.vue';
import { RouterLink } from 'vue-router';
</script>

<template>
<Navbar/>
<div class="divecske">
<form >
   <div class="mb-3 ">
    <label for="exampleInputEmail1" class="form-label">Név</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
  </div>
  <div class="mb-3 ">
    <label for="exampleInputEmail1" class="form-label">Email cím</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
  </div>
    <div class="mb-3 ">
    <label for="exampleInputEmail1" class="form-label">Regisztráció ideje</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
  </div>
  <button type="submit" class="btn btn-primary">Mentés</button>
</form>
</div>
</template>

<style scoped>
.divecske{
    width: 800px;
    margin: auto;
    margin-top: 100px;
    background-color: aquamarine;
    padding: 20px ;
}   
</style>
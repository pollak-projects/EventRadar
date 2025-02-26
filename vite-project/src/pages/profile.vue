<script setup>
import Navbar from '../components/Navbar.vue';
import { RouterLink } from 'vue-router';
</script>

<template>
<Navbar/>
<div class="divecske">
    <form action="upload.php" method="post" enctype="multipart/form-data">
    <label for="fileToUpload">
  <div class="profile-pic" style="background-image: url('https://randomuser.me/api/portraits/med/men/65.jpg');">
      <span class="glyphicon glyphicon-camera"></span>
  </div>
  </label>
  <input type="File" name="fileToUpload" id="fileToUpload">
</form>
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

.profile-pic {
    border-radius: 50%;
    height: 150px;
    width: 150px;
    background-size: cover;
    background-position: center;
    background-blend-mode: multiply;
    vertical-align: middle;
    text-align: center;
    color: transparent;
    transition: all .3s ease;
    text-decoration: none;
    cursor: pointer;
}

.profile-pic:hover {
    background-color: rgba(0,0,0,.5);
    z-index: 10000;
    color: #fff;
    transition: all .3s ease;
    text-decoration: none;
}

.profile-pic span {
    display: inline-block;
    padding-top: 4.5em;
    padding-bottom: 4.5em;
}

form input[type="file"] {
          display: none;
          cursor: pointer;
 }
</style>
<script setup>
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router';

const route = useRoute();


</script>

<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid ">
        <RouterLink to="/">
        <img src="/public/eventradarlogo.png" alt="" class="logo" >
        </RouterLink>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse navi" id="navbarNavAltMarkup">
       <hr class="vonal" style="width:100%;transform: translate(-5px, 0);margin-bottom: 7px; margin-top: 1px;">
      <div class="navbar-nav">
        <RouterLink class="nav-link" :class="{ active: route.name == 'Home' }" aria-current="page" to="/">Főoldal</RouterLink>
        <RouterLink class="nav-link" :class="{ active: route.name == 'Events' }" to="/events" >Események</RouterLink>
        <RouterLink class="nav-link" >Létrehozás</RouterLink>
        <RouterLink class="nav-link " href="#" >Disabled</RouterLink>
        <RouterLink class="nav-link signinmobile" type="button"  onclick="document.getElementById('id01').style.display='block'" href="#">Bejelentkezés</RouterLink>
      </div>
    </div>
      <button class="btn btn-primary signin" type="button"  onclick="document.getElementById('id01').style.display='block'" style="width:auto;" >Bejelentkezés</button>
  <div id="id01" class="modal"> 
  <form class="modal-content animate"  method="post">
    <div class="imgcontainer" >
      <span onclick="document.getElementById('id01').style.display='none'"  class="close" title="Close Modal">&times;</span>
      <img src="/eventradarlogo.png" alt="Avatar"  class="signinpic" >
    </div>

    <div class="container">
      <label for="uname"><b>E-mail</b></label>
      <input type="text" placeholder=" " name="uname" required>

      <label for="psw"><b>Jelszó</b></label>
      <input type="password" placeholder="" name="psw" required>
        
      <button class="btn btn-primary" type="submit" style="margin-top: 15px;width: 100%;">Bejelentkezés</button>

            <span class="psw"><RouterLink href="#">Elfelejtetted a jelszavadat?</RouterLink></span>
    </div>

    <div class="container" style="background-color:#f1f1f1;align-items: center;align-content: center;">
      <span>Nincs fiókod? <RouterLink >Regisztráció</RouterLink></span>
    </div>
  </form>
</div>
  </div>
</nav>
</template>

<style scoped>

.logo {
  padding-top: 5px;
  -webkit-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
  height: 40px;
  width: auto;
}
.navi {
  display: auto;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 25px;
  transform: translate(-30px, 0);
  margin-top: 10px;
}
.hero {
  text-align: center;
  background: url('/conecrt.jpg') ;
  background-repeat:no-repeat ;
  background-size: cover;
  color: black;
  font-size: 24px;
  padding: 450px 0;
  word-break: break-all;
  width: 100%;
  font-family: "CustomFont";
}
.event-container {
  display: flex;
  justify-content: center;
  margin: 20px;
  flex-wrap: wrap;
}
.event-card {
  background: #f8f8f8;
  padding: 15px;
  margin: 10px;
  width: 200px;
  height: 300px;
  border-radius: 10px;
}
.kep {
  width: 100%; 
}

.active{
  font-weight:bold;
}

.footerlogo{
  width: 150px;
}
.slide{
  width: fit-content;
  padding: 50px;
}

.slidecards{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.header{
  width: 100%;
}

.comment-section {
  padding-top: 10px;
  padding-bottom: 10px;
  background: #eee;
}

.comment-section .user  {
  width: 50px;
  border-radius: 40%;
  margin-right: 10px;
}

input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.signin {
  background-color: #f44336;
  color: #000;
  font-weight: bold;
  padding: 14px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  width: auto;
  margin-right: 20px;
}

button:hover {
  opacity: 0.8;
}

.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
  position: relative;
}

.signinpic{
  width: 250px;
  height: auto;
  margin-top: 40px;
}

.container {
  padding: 16px;
  border-bottom-right-radius: 10%;
  border-bottom-left-radius: 10%;
}

span.psw {
  float: right;
  padding-top: 16px;
}


.modal {
  display: none; 
  position: fixed; 
  z-index: 1; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%; 
  overflow: auto; 
  background-color: rgb(0,0,0); 
  background-color: rgba(0,0,0,0.4); 
  padding-top: 60px;
}

.modal-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto; 
  border: 1px solid #888;
  width: 380px; 
}

.close {
  position: absolute;
  right: 10px;
  top: -30px;
  color: #000;
  font-size: 35px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: red;
  cursor: pointer;
}

.animate {
  -webkit-animation: animatezoom 0.6s;
  animation: animatezoom 0.6s
}

@-webkit-keyframes animatezoom {
  from {-webkit-transform: scale(0)} 
  to {-webkit-transform: scale(1)}
}
  
@keyframes animatezoom {
  from {transform: scale(0)} 
  to {transform: scale(1)}
}

@media only screen and (max-width: 600px) {

  .signin{
    display: none;
  }
  .navi {
    display: auto;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 25px;
    transform: translate(+5px, 0);
    margin-top: 10px;
  }
}

@media only screen and (min-width: 600px) {
  .signinmobile{
    display: none;
  }
  .vonal{
    display: none;
  }
}

</style>
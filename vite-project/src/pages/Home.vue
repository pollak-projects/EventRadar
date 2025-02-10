<script setup>
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
</script>

<template >
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid ">
        <a href="">
        <img src="/public/eventradarlogo.png" alt="" class="logo" >
        </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse navi" id="navbarNavAltMarkup">
       <hr class="vonal" style="width:100%;transform: translate(-5px, 0);margin-bottom: 7px; margin-top: 1px;">
      <div class="navbar-nav">
        <a class="nav-link active" aria-current="page" href="">Főoldal</a>
        <a class="nav-link" href="Events">Események</a>
        <a class="nav-link" href="#">Létrehozás</a>
        <a class="nav-link " href="#" >Disabled</a>
        <a class="nav-link signinmobile" type="button"  onclick="document.getElementById('id01').style.display='block'" href="#">Bejelentkezés</a>
      </div>
    </div>
      <button class="btn btn-primary signin" type="button"  onclick="document.getElementById('id01').style.display='block'" style="width:auto;" >Bejelentkezés</button>
  <div id="id01" class="modal"> 
  <form class="modal-content animate" action="/action_page.php" method="post">
    <div class="imgcontainer">
      <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
      <img src="/eventradarlogo.png" alt="Avatar" class="signinpic" >
    </div>

    <div class="container">
      <label for="uname"><b>E-mail</b></label>
      <input type="text" placeholder="Enter Username" name="uname" required>

      <label for="psw"><b>Jelszó</b></label>
      <input type="password" placeholder="Enter Password" name="psw" required>
        
      <button class="btn btn-primary" type="submit" style="margin-top: 15px;width: 100%;">Bejelentkezés</button>

            <span class="psw"><a href="#">Elfelejtetted a jelszavadat?</a></span>
    </div>

    <div class="container" style="background-color:#f1f1f1;align-items: center;align-content: center;">
      <span>Nincs fiókod? <a href="">Regisztráció</a></span>
    </div>
  </form>
</div>
  </div>
</nav>

<div class="header">
    <div class="hero">
        <h1>Hirdesd nálunk az eseményeid</h1>
    </div>
</div>

<div class="slidecards">
<div id="carouselExample" class="carousel slide">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <div class="event-card">
            <img src="/grinder.jpg" alt="kis tekerés" class="kep">
            <h3><i>kis tekerés</i></h3>
            <p><b>2025.03.12</b></p>
            <button>fasz</button>
        </div>
    </div>
    <div class="carousel-item">
            <div class="event-card">
            <img src="/user.jpg" alt="kis tekerés" class="kep">
            <h3><i>kis majom</i></h3>
            <p><b>2025.03.12</b></p>
            <button>fasz</button>
        </div>
    </div>
    <div class="carousel-item">
            <div class="event-card">
            <img src="/conecrt.jpg" alt="kis tekerés" class="kep">
            <h3><i>kis peti</i></h3>
            <p><b>2025.03.12</b></p>
            <button>fasz</button>
        </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16" style="color: black;" aria-hidden="true">
      <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
    </svg>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next" style="color: black;">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16" aria-hidden="true">
      <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
    </svg>
  </button>
</div>
</div>
    <div class="comment-section d-flex justify-content-center">
        <img src="/user.jpg" alt="User" class="user" >
        <p><i>nagyon tetszik ez az oldal itt fogom mindig hirdetni az eseményeimet! 😊</i></p>
    </div>
    
  <footer class="d-flex flex-wrap justify-content-between align-items-center p-3 my-4 border-top">
    <p class="col-md-4 mb-0 text-muted">© 2024 EventRadar, Inc</p>
  </footer>
    
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
  font-weight: bold;
  word-break: break-all;
  width: 100%;
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

/* Full-width input fields */
input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for all buttons */
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

/* Center the image and position the close button */
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

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  padding-top: 60px;
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
  border: 1px solid #888;
  width: 380px; /* Could be more or less, depending on screen size */
}

/* The Close Button (x) */
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

/* Add Zoom Animation */
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
<script setup>
import Navbar from '../components/Navbar.vue';
var modal = document.getElementById('id01');


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
</script>

<template >
<Navbar/>
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







</style>
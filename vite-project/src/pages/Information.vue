<script setup>
import Navbar from '../components/Navbar.vue';
import { RouterLink } from 'vue-router';
</script>

<template>
<div class="hatter">
<Navbar/>

<div class="keret">
    
    <div class="leiras">
        <h1 class="cim">Kis tekerés Petivel</h1>
        <h3 style="width: 500px; transform: translateX(-20px);">2025.01.01 15 órától 17 óráig</h3>
        <h5 style="padding-top: 15px;">Lorem ipsum odor amet, consectetuer adipiscing elit. Primis pharetra pellentesque sem nisi commodo nec torquent. Auctor posuere faucibus placerat, curae bibendum dapibus. Varius leo faucibus eget elementum velit mi. Malesuada pretium sodales maecenas erat himenaeos class libero. Eu sem hac viverra ridiculus elit dapibus. Dignissim odio fringilla eleifend primis mauris. Eget montes nullam bibendum ipsum venenatis rutrum.</h5>
        <h4 style="padding-top: 30px; transform: translateX(-25px); width: 500px;"><img style="height: 50px;width: 50px;  object-fit: cover; object-position: center ; border-radius: 50%;" src="/user.jpg" alt=""> Rózsa Péter</h4>
        <button style="width: 300px; height: 80px;">Jelentkezés</button>
    </div>
    <img class="kep" src="/conecrt.jpg" alt="">
</div>

</div>

</template>

<style scoped>
.keret{
    margin: 100px;
    display: flex;
}
.cim{
font-size: 300%;
}
.leiras{
    padding-left: 30px;
    padding-top:10px ;
    width: 350px;
}
.cim{
    transform: translateX(-30px);
    padding-top:10px ;
    width: 600px;
}
.kep{
    height:500px;
    width: auto;
    padding-left: 250px;
}
.hatter{
    background: url("/moderndik3.png");
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
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
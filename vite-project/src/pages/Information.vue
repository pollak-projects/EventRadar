<script setup>
import Navbar from '../components/Navbar.vue';
import { RouterLink } from 'vue-router';
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { jsx } from "vue/jsx-runtime";

const events = ref();
const route = useRoute();




function GetEvent() {
  fetch(`http://localhost:3300/event/getId/${route.params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      const data = await res.json();
      console.log(data);
      events.value = data
    })
    .catch((error) => console.log("error", error));
}

onMounted(() => {
   GetEvent()
})

</script>

<template>
<div class="hatter">
<Navbar/>

<div class="mobil">
<div class="keret">
    <div class="leiras" v-for="event in events">
        <h1 class="cim" >{{ event?.esemeny_nev }}</h1>
        <img class="kep" src="/conecrt.jpg" alt="">
        <h3 style="width: 200px;">2025.01.01 15 órától 17 óráig</h3>
        <h5 style="padding-top: 15px;">{{ event.leiras  }}</h5>
        <h4 style="padding-top: 30px; width: 200px;"><img style="height: 50px;width: 50px;  object-fit: cover; object-position: center ; border-radius: 50%;" src="/user.jpg" alt=""> Rózsa Péter</h4>
        <button style="width: 300px; height: 80px;">Jelentkezés</button>
    </div>
</div>
</div>
<div class="asztaligep">
<div class="keret"> 
    <div class="leiras asztaligep" v-for="event in events">
        <h1 class="cim" >{{ event?.esemeny_nev }}</h1>
        <h3 style="width: 500px; transform: translateX(-20px);">{{ event?.esemeny_date }} {{ event?.kezdetido }} {{ event?.vegeido }}</h3>
        <h5 style="padding-top: 15px;">{{ event.leiras  }}</h5>
        <h4 style="padding-top: 30px; transform: translateX(-25px); width: 500px;"><img style="height: 50px;width: 50px;  object-fit: cover; object-position: center ; border-radius: 50%;" src="/user.jpg" alt=""> Rózsa Péter</h4>
        <button style="width: 300px; height: 80px;">Jelentkezés</button>
    </div>
    <img class="kep" src="/conecrt.jpg" alt="">
</div>
</div>
</div>

</template>

<style scoped>

.hatter{
    background: url("/moderndik3.png");
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
}

button:hover {
  background-color: #cc1104;
}

@media only screen and (min-width: 600px) {
  .asztaligep{
    display: block;
  }
    .mobil{
    display: none;
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
.keret{
    margin: 100px;
    display: flex;
}

}

@media only screen and (max-width: 600px) {
  .asztaligep{
    display: none;
  }
    .mobil{
    display: block;
  }
  .kep{
    height: 200px;
    width: auto;
  }
  button {
  width: 100px;
  padding: 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}
  .keret{
    margin-top: 100px;
    justify-content: center;
    align-items: center;
    display: flex;
  }
  .cim{
    padding-bottom:10px ;
}
}
</style>
<script setup>
import Navbar from '../components/Navbar.vue';
import { RouterLink } from 'vue-router';
</script>

<template>
<Navbar/>
<div class="keret">
    <h1 class="cim">Kis tekerés Petivel</h1>
    <div class="leiras">
        <h5>Lorem ipsum odor amet, consectetuer adipiscing elit. Primis pharetra pellentesque sem nisi commodo nec torquent. Auctor posuere faucibus placerat, curae bibendum dapibus. Varius leo faucibus eget elementum velit mi. Malesuada pretium sodales maecenas erat himenaeos class libero. Eu sem hac viverra ridiculus elit dapibus. Dignissim odio fringilla eleifend primis mauris. Eget montes nullam bibendum ipsum venenatis rutrum.</h5>
    </div>
</div>

</template>

<style scoped>
.keret{
    margin: 100px;
    background-image: url(/informbg.png);
    background-size: 100%;
    background-repeat: no-repeat;
}
.cim{
font-size: 300%;
}
</style>
<script setup>
import Navbar from '../components/Navbar.vue';
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";
import { ref } from "vue";

function listAllUser()
{
    fetch("http://localhost:3300/user/getAll", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    }).then(async (res) => {
        const data = await res.json()
        console.log(data)
    })
}

</script>

<template>
<Navbar/>
<button
        class="btn signin"
        type="button"
        @click="listAllUser()"
        style="width: auto">
        Kijelentkezés
</button>

</template>

<style scoped>

</style>
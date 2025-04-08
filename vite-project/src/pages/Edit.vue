<script setup>
import { RouterLink } from "vue-router";
import Navbar from "../components/Navbar.vue";
import { ref, onMounted } from "vue";

onMounted(() => {
  console.log("test");
});
</script>
<template>
  <Navbar />
</template>
<style scoped>
</style>

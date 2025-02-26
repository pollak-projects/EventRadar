<script setup>
import Navbar from "../components/Navbar.vue";
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";

const user = ref();
const loggedin = ref(!!localStorage.getItem("accessToken"));

function GetUserById(valami) {
  fetch(
    `http://localhost:3300/user/getUserById/${valami}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(async (res) => {
      const data = await res.json();
      user.value = data;
    })
    .catch((error) => console.log("error", error));
}

const adat = ref();

function listAllUser() {
  try {
    fetch("http://localhost:3300/user/getAll", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      const data = await res.json();
      console.log(data);
      adat.value = data;
    });
  } catch {
    location.replace("/");
  }
}

onMounted(() => {
  GetUserById(localStorage.getItem("userId"));
  if (localStorage.getItem("userId") == null) {
    location.replace("/");
  }
});
</script>

<template v-if="user.value.groupsNeve == 'Admin'">
  <Navbar />
  <div class="nyuszi">
  <button
    class="btn signin"
    type="button"
    @click="listAllUser()"
    style="width: auto"
  >
    Felhasználók kiírása
  </button>
  </div>

  <table class="table">
    <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">username</th>
        <th scope="col">email</th>
        <th scope="col">create_date</th>
        <th scope="col">updated_date</th>
        <th scope="col">groups</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in adat">
        <td>{{ item.id }}</td>
        <td>{{ item.username }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.create_date ?? "ures" }}</td>
        <td>{{ item.updated_date ?? "ures" }}</td>
        <td>{{ item.groupsNeve }}</td>
      </tr>
    </tbody>
  </table>

  <input type="text">

</template>

<style scoped>

.nyuszi {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
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

.signin:hover {
  background-color: #cc1104;
}
</style>

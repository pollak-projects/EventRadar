<script setup>
    import { RouterLink } from "vue-router";
    import Navbar from "../components/Navbar.vue";
    import {ref, onMounted} from "vue"

    const events = ref();
    const loggedin = localStorage.getItem("userId");
    const user = ref();

    const showDeleteModal = ref(false);
    const eventToDelete = ref(null);

    function EventDelete(id) {
     eventToDelete.value = id; 
     showDeleteModal.value = true; 
}

function confirmDelete() {
  fetch(`http://localhost:3300/event/delete`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: eventToDelete.value,
    }),
  })
    .then(async (result) => {
      showDeleteModal.value = false;
      location.reload();
    })
    .catch((error) => console.log("Hiba:", error));
}

function cancelDelete() {
  showDeleteModal.value = false; 
}

    function getEvents() {
        fetch(`http://localhost:3300/event/getEventCreate/${localStorage.getItem("userId")}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            })
            .then(async (res) => {
                const data = await res.json();
                events.value = data
            })
            .catch ((error) => console.log("error", error))
        }
    

        function GetUserById() {
  fetch(
    `http://localhost:3300/user/getUserById/${localStorage.getItem("userId")}`,
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
onMounted(() => {
  GetUserById();
  getEvents();
});
</script>
<template>

<Navbar />

<div class="cards">
    <div v-for="event in events">
      <div class="card">
        <h1>{{ event.esemeny_nev }}</h1>
        <h2>{{ event.esemeny_date.split("T")[0] }}</h2>
        <RouterLink
          class="info-button"
          :to="'/information/' + event.id"
          style="text-decoration: none"
        >
          Információk
          <span class="info-icon"></span>
        </RouterLink>
        <button
              @click="EventDelete(event.id)"
              v-if="
                user?.groupsNeve == 'Admin' ||
                (event?.user == user?.id && loggedin)
              "
              class="csirke"
            >
              X
            </button>
      </div>
    </div>
  </div>
    <div v-if="showDeleteModal" class="deleteEvent-modal">
    <div class="modal-content">
      <h2>Biztosan törölni szeretnéd ezt az eseményt?</h2>
      <div class="modal-buttons">
        <button @click="confirmDelete" class="confirm-btn">Igen</button>
        <button @click="cancelDelete" class="cancel-btn">Nem</button>
      </div>
    </div>
  </div>

</template>
<style scoped>
.deleteEvent-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 10;
}

@keyframes fadeInUp {
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.deleteEvent-modal .modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 300px;
  animation: fadeInUp 0.5s ease-in-out;
}

.deleteEvent-modal .modal-buttons {
  margin-top: 20px;
}

.deleteEvent-modal .confirm-btn,
.deleteEvent-modal .cancel-btn {
  padding: 10px 20px;
  font-size: 16px;
  margin: 5px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
}

.deleteEvent-modal .confirm-btn {
  background-color: #28a745;
  color: white;
}

.deleteEvent-modal .cancel-btn {
  background-color: #dc3545; 
  color: white;
}

.deleteEvent-modal .confirm-btn:hover,
.deleteEvent-modal .cancel-btn:hover {
  opacity: 0.8;
}


@media only screen and (max-width: 768px) {
  .deleteEvent-modal .modal-content {
    width: 80%;
  }
}

.csirke {
  background-color: #cc1104;
  border-radius: 15px;
  padding: 8px 16px;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  align-items: center;
  gap: 5px;
  width: 15%;
  justify-content: center;
  border: #ffffff 100px;
  display: block;
  margin-left: auto;
}

.button1:hover {
  background-color: #cc1104;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background-color: #f0f0f0;
  font-family: Arial, sans-serif;
}

.accordion-button::after {
  background-image: url("/filter.svg");
}

.accordion-active-color {
  color: #ffffff;
}

.card {
  margin: 30px;
  padding: 30px;
  width: 500px;
  height: 250px;
  border-radius: 20px;
  overflow: hidden;
  background: url("./conecrt.jpg") no-repeat center center/cover;
  position: relative;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-repeat: no-repeat;
}

.card::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: inherit;
  filter: blur(10px);
  z-index: -1;
}

.card h1 {
  margin: 0;
  font-size: 1.8rem;
  font-weight: bold;
}

.card h2 {
  margin: 5px 0 20px;
  font-size: 1.2rem;
  font-weight: normal;
}

.info-button {
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 15px;
  padding: 8px 16px;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  width: 25%;
  justify-content: center;
  border: #ffffff 100px;
}

.info-icon {
  width: 16px;
  height: 16px;
  background: url("info-icon.svg") no-repeat center center/contain;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 50px;
  left: 0;
  background-color: #ffffff;
  color: #333;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 200px;
  padding: 10px;
  z-index: 1;
}

.dropdown-menu a {
  display: block;
  padding: 8px 12px;
  text-decoration: none;
  color: #333;
  font-size: 1rem;
}

.dropdown-menu a:hover {
  background-color: #f0f0f0;
}
.show-dropdown {
  display: block;
}

@media only screen and (max-width: 600px) {
  .card {
    margin: 15px auto;
    padding: 30px;
    width: 370px;
    height: 210px;
    border-radius: 20px;
    overflow: hidden;
    background: url("./conecrt.jpg") no-repeat center center/cover;
    position: relative;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
  }
  .filtergepes{
    display: block;
  }
  .button1 {
    width: 100px;
    padding: 10px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
}

@media only screen and (min-width: 600px) {
.filtergepes{
  display: flex;
  width: 800px;
} 

  .button1 {
    width: 100%;
    padding: 10px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
}
</style>

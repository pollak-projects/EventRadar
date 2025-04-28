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

  <div class="modal" ref="loginmodal">
    <form
      class="modal-content animate"
      method="post"
      onSubmit="return checkPassword(this)"
    >
      <div class="imgcontainer">
        <span @click="loginmodalbe()" class="close" title="Close Modal"
          >&times;</span
        >
        <img src="/eventradarlogo.png" alt="Avatar" class="signinpic" />
      </div>

      <div class="container">
        <label for="uname"><b>Felhasználónév</b></label>
        <input type="text" placeholder=" " name="uname" required />

        <label for="psw"><b>Jelszó</b></label>
        <input type="password" placeholder="" name="psw" required />

        <button
          class="btn btn-primary"
          type="button"
          style="margin-top: 15px; width: 100%"
          @click=""
        >
          Bejelentkezés
        </button>

        <span class="psw">
          <a
            style="text-decoration: underline; color: #0000ee; cursor: pointer"
            @click="loginmodalbe()"
            >Elfelejtetted a jelszavadat?</a
          >
        </span>
      </div>

      <div
        class="container"
        style="
          background-color: #f1f1f1;
          align-items: center;
          align-content: center;
        "
      >
        <span @click="loginmodalbe()"
          >Nincs fiókod?
          <a style="text-decoration: underline; color: #0000ee; cursor: pointer"
            >Regisztráció</a
          ></span
        >
      </div>
    </form>
  </div>

  <div class="container">
    <div class="row">
      <div class="accordion accordion-flush" id="accordionFlushExample">
        <div class="accordion-item" style="margin-top: 10px; ">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed accordion-btn-icon"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
              style="width: fit-content"
            ></button>
          </h2>
          <div
            id="flush-collapseOne"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
            style="border-bottom: 1px solid gray;margin-bottom: 10px;"
          >
            <button
              @click="handleReset"
              class="btn"
              role="button"
              data-bs-toggle="button"
              id="filterReset"
              style="margin-left: auto"
            >
              <img src="/filter-remove.png" style="width: 20px" alt="" />
            </button>
            <div class="accordion-body filtergepes filtermobilos">
              <label style="margin-right: 10px; font-weight: bold"
                >Kategória:</label
              >
              <select
                class="form-control select2"
                @change="handleCategoryChange"
                style="margin-right: 70px"
                v-model="Selected"
              >
                <option value="Válassz">Válassz</option>
                <option v-for="kategoria in kategoriak" :key="kategoria">
                  {{ kategoria }}
                </option>
              </select>

              <label style="margin-right: 10px; font-weight: bold"
                >Dátum:</label
              >
              <div class="form-group">
                <div>
                  <input
                  class="form-control"
                    type="date"
                    @change="handleDateChange"
                    v-model="selectedDate"
                  />
                </div>
              </div>
              <button
                @click="applyFilters = true"
                class="btn"
                role="button"
                data-bs-toggle="button"
                id="filterReset"
                style="margin-left: auto; transform: translateX(20px)"
              >
                <img src="/check-lg.svg" style="height: 25px" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <RouterLink
        class="button1"
        to="/MyEvent"
        aria-current="page"
        style="
          text-decoration: none;
          margin-left: auto;
          text-align: center;
          margin-right: 15px;
        "
      >
        Saját Eseményeim
      </RouterLink>
    </div>
  </div>
  <div class="cards">
    <div v-for="event in events" :key="event.id">
      <div
        v-if="
          !applyFilters ||
          ((event.kategoria === Selected || Selected === 'Válassz') &&
            (event.esemeny_date.split('T')[0] === selectedDate ||
              !selectedDate))
        "
      >
        <div class="card" :style=" 'background-image: url(' + (event.Eventcat.image || 'public/user2.jpg') + ');'" >
          <h1>{{ event.esemeny_nev }}</h1>
          <h2>{{ event.esemeny_date.split("T")[0] }}</h2>
          <div class="fill">
            <RouterLink
              class="info-button"
              :to="'/information/' + event.id"
              style="text-decoration: none"
            >
              Információk
              <span class="info-icon"></span>
            </RouterLink>
            <RouterLink
              class="info-button csirke"
              :to="'/Edit/' + event.id"
              style="text-decoration: none"
              v-if="
                user?.groupsNeve == 'Admin' ||
                (event?.user == user?.id || loggedin)
              "
            >
              Edit
            </RouterLink>
            <button
              @click="EventDelete(event.id)"
              v-if="
                user?.groupsNeve == 'Admin' ||
                (event?.user == user?.id || loggedin)
              "
              class="csirke"
            >
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#filterReset {
  border: none !important;
  outline: 0;
  margin-left: auto; 
  display: block;
}
#filterReset:active,
#filterReset:focus-visible {
  border: none !important;
  outline: 0;
}
.fill {
  display: flex;
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
  .filtergepes {
    display: block;
  }
  .button1 {
    padding: 8px 16px;
    font-weight: bold;
    width: 110px;
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
  .filtergepes {
    display: flex;
    width: 800px;
    align-items: center;
        flex-direction: row;
  }

  .button1 {
    padding: 10px;
    background-color: #f44336;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    align-items: center;
    width: 15%;
    justify-content: center;
    display: block;
    margin-left: auto;
    text-align: center;
  }
}
</style>

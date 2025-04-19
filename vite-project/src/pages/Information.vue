<script setup>
import Navbar from "../components/Navbar.vue";
import { RouterLink, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { jsx } from "vue/jsx-runtime";

const userID = Number(localStorage.getItem("userId"));
const events = ref();
const route = useRoute();
const szam = ref();
const jelent = ref();
let data = [];

const loggedin = localStorage.getItem("userId");

const router = useRouter();

function already() {
  const user = loggedin; // például itt deklarálod

  fetch(`http://localhost:3300/user/already/${route.params.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  })
    .then(async (res) => {
      data = await res.json();
      console.log(data[0]);
      jelent.value = data.value;
    })
    .catch((err) => {
      console.error("Fetch error:", err);
    });
}

const loginmodal = ref();
function loginmodalbe() {
  if (loginmodal.value.style.cssText == "display: block;") {
    loginmodal.value.style.display = "none";
  } else {
    loginmodal.value.style.display = "block";
  }
}

function GetJelentkezes() {
  fetch(`http://localhost:3300/user/votes/${route.params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    const data = await res.json();
    console.log(data);
    jelent.value = data;
  });
}

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
      events.value = data;
      szam.value = events.value[0].foszam;
      console.log(data);
      maradek();
    })
    .catch((error) => console.log("error", error));
}

function maradek() {
  // GetJelentkezes();
  fetch(`http://localhost:3300/user/votes/${route.params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    const data = await res.json();
    console.log(data);
    console.log(events.value);

    console.log(szam.value);
    console.log(jelent.value);

    if (szam.value == null) {
      szam.value = "Nincs Limitálva";
    } else {
      if (data && !szam.value <= 0) {
        const hossz = data.length;
        console.log(hossz);
        szam.value = szam.value - hossz;
      }
    }
  });
}

function jelentkez() {
  const user_id = Number(localStorage.getItem("userId"));
  const esemenyek_id = Number(route.params.id);

  console.log("Küldött adatok:", { user_id, esemenyek_id });

  if (loggedin) {
    fetch("http://localhost:3300/user/jelentkez", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, esemenyek_id }), // Itt biztosítjuk a helyes kulcsokat!
    })
      .then(async (result) => {
        if (!result.ok) {
          const errorMessage = await result.text();
          throw new Error(`Hiba: ${errorMessage}`);
        }

        setTimeout(() => {
          router.back();
        }, 1000);
      })
      .catch((error) => console.log("Hiba:", error));
  } else {
          document.getElementById("failedModalInformation").style.display = "flex";
        setTimeout(() => {
          document.getElementById("failedModalInformation").style.display = "none";
        }, 3000);
  }
}

onMounted(() => {
  already();
  GetEvent();
});
</script>

<template>
  <div class="hatter">
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

          <span class="psw"
            ><a
              style="
                text-decoration: underline;
                color: #0000ee;
                cursor: pointer;
              "
              @click="loginmodalbe()"
            >
              Elfelejtetted a jelszavadat?
            </a></span
          >
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
            <a
              style="
                text-decoration: underline;
                color: #0000ee;
                cursor: pointer;
              "
              >Regisztráció</a
            ></span
          >
        </div>
      </form>
    </div>

    <div class="mobil">
      <div class="keret">
        <div class="leiras" v-for="event in events">
          <h1 class="cim">{{ event?.esemeny_nev }}</h1>
          <img class="kep" src="/conecrt.jpg" alt="" />
          <h3 class="date-box-mobil">
            {{
              new Date(event.esemeny_date).toLocaleDateString("hu-HU", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
            }}
            {{
              new Date(event.kezdetido).toLocaleTimeString("hu-HU", {
                hour: "2-digit",
                minute: "2-digit",
              })
            }}
           <h3>{{ event.hossz }}</h3>
          </h3>
          <h5 style="padding-top: 15px">{{ event?.leiras }}</h5>
          <h4 style="padding-top: 30px; width: 200px">
            <img
              style="
                height: 50px;
                width: 50px;
                object-fit: cover;
                object-position: center;
                border-radius: 50%;
              "
               :src="event.user_id.profilkep"
            />
            {{ event.user_id.username }}
          </h4>
          <h4>Jelentkezési Limit: {{ szam }}</h4>
          <button
            class="jelentkezes"
            v-if="!szam == 0 && event.user != userID && !data[0]"
            style="width: 200px"
          >
            Jelentkezés
          </button>
          <h3 v-if="event.user == userID">
            Nem tudsz jelentkezni a saját eseményedre :D
          </h3>
          <h3 v-if="szam == 0" style="width: 300px; height: 80px">
            Már nem lehet jelentkezni az eseményre!
          </h3>
        </div>
      </div>
    </div>
    <div class="asztaligep">
      <div class="keret">
        <div class="leiras-asztaligep" v-for="event in events">
          <h1 class="cim">{{ event?.esemeny_nev }}</h1>
          <h3 class="date-box">
            {{
              new Date(event.esemeny_date).toLocaleDateString("hu-HU", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
            }}
            {{
              new Date(event.kezdetido).toLocaleTimeString("hu-HU", {
                hour: "2-digit",
                minute: "2-digit",
              })
            }}
          </h3>
          <h3>{{ event.hossz }}</h3>
          <h5 style="padding-top: 15px">{{ event?.leiras }}</h5>
          <h4 class="jelentkezesi-limit">Jelentkezési Limit: {{ szam }}</h4>
          <h4
            style="
              padding-top: 30px;
              transform: translateX(-25px);
              width: 500px;
            "
          >
            <img
              style="
                height: 50px;
                width: 50px;
                object-fit: cover;
                object-position: center;
                border-radius: 50%;
              "
              :src="event.user_id.profilkep"
            />
             {{ event.user_id.username }}
          </h4>

          <button
            @click="jelentkez()"
            v-if="!szam == 0 && event.user != userID && !data[0]"
            style="width: 300px; height: 80px"
          >
            Jelentkezés
          </button>
         

          
          <h3 v-if="data[0]">Már jelentkeztél!</h3>
          <h3 v-if="event.user == userID">
            Nem tudsz jelentkezni a saját eseményedre :D
          </h3>
          <h3 v-if="szam == 0" style="width: 300px; height: 80px">
            Már nem lehet jelentkezni az eseményre!
          </h3>
        </div>
        <img class="kep" src="/conecrt.jpg" alt="" />
      </div>
    </div>
  </div> 
  <div id="failedModalInformation" class="failed-modal" style="display: none">
    <div class="modal-content">
      <h2>Jelentkezz be!</h2>
    </div>
  </div>
</template>

<style scoped>
.success-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease-in-out;
  margin-top: -90px;
}

@keyframes fadeIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.success-modal .modal-content {
  background-color: #28a745;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 30%;
  max-width: 400px;
  font-family: "Arial", sans-serif;
  color: white;
}

.failed-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  animation: fadeIn 0.3s ease-in-out;
  margin-top: 80px;
}

@keyframes fadeIn {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.failed-modal .modal-content {
  background-color: #df1919;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 30%;
  max-width: 400px;
  font-family: "Arial", sans-serif;
  color: white;
}

.failed-modal .modal-content h2,
.failed-modal .modal-content p {
  color: white;
}

.jelentkezesi-limit {
  background-color: rgba(110, 107, 107, 0.5); 
  padding: 5px 10px; 
  border-radius: 10px;
  display: inline-block;
}
.date-box {
  background-color: #d8461a;
  padding: 10px;
  border-radius: 5px;
  width: 360px;
  transform: translateX(-20px);
  color: white;
}

.date-box-mobil {
  background-color: #d8461a;
  padding: 10px;
  border-radius: 5px;
  width: 280px;
  margin-left: 60px;
  margin-top: 10px;
  transform: translateX(-20px);
  color: white;
}

.hatter {
  background: url("/moderndik3.png");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}

button:hover {
  background-color: #cc1104;
}

@media only screen and (min-width: 600px) {
  .asztaligep {
    display: block;
  }
  .mobil {
    display: none;
  }

  .leiras {
    padding-left: 30px;
    padding-top: 10px;
    width: 350px;
    background-color: white;
    border-radius: 10px; /* Lekerekített sarkok */
    display: inline-block; /* Méret igazítása a tartalomhoz */
  }
  .cim {
    transform: translateX(-30px);
    padding-top: 10px;
    width: 600px;
    font-size: 300%;
    color: rgb(100, 0, 0);
    padding-left: 10px;
  }

  .kep {
    height: 400px;
    width: auto;
  }
  button {
    width: 100%;
    padding: 10px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 25px;
  }
  .keret {
    margin: 100px;
    display: flex;
  }
}

@media only screen and (max-width: 600px) {
  .asztaligep {
    display: none;
  }
  .mobil {
    display: block;
  }
  .kep {
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
  .keret {
    margin-top: 100px;
    justify-content: center;
    align-items: center;
    display: flex;
  }
  .cim {
    padding-bottom: 10px;
  }
}
</style>

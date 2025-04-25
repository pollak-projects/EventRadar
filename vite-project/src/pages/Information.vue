<script setup>
import Navbar from "../components/Navbar.vue";
import { RouterLink, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { jsx } from "vue/jsx-runtime";
import ChatWindow from "./ChatWindow.vue";


const userID = Number(localStorage.getItem("userId"));
const events = ref();
const route = useRoute();
const szam = ref();
const jelent = ref();
let data = [];

const loggedin = localStorage.getItem("userId");
const showChatWindow = ref(Boolean(loggedin));
const router = useRouter();

function already() {
  const userId = loggedin;
  fetch(`http://localhost:3300/user/already/${route.params.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
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
      body: JSON.stringify({ user_id, esemenyek_id }),
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
    <ChatWindow v-if="showChatWindow" />

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
    <div class="leiras-asztaligep" v-for="event in events">
      <div
        class="event-header mobil-header"
        :style="{ backgroundImage: 'url(/conecrt.jpg)' }"
      >
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
        <h3 class="event-helyszin">Helyszín: {{ event.helyszin }}</h3>
        <h3 class="eventhossz-mobil">Az esemény hossza: {{ event.hossz }} óra.</h3>
      </div>

      <h5 class="event-leiras">{{ event?.leiras }}</h5>
      <h4 class="jelentkezesi-limit">📌 Jelentkezési Limit: {{ szam }}</h4>

      <h4 class="user-info">
        Az esemény létrehozója:
        <img :src="event.user_id.profilkep" alt="Profilkép" />
        <span>{{ event.user_id.username }}</span>
      </h4>

      <button
        @click="jelentkez()"
        v-if="!szam == 0 && event.user != userID && !data[0]"
        class="jelentkezes-btn"
      >
        ✅ Jelentkezés
      </button>

      <h3 class="already" v-if="data[0] && data[0].creatorId !== currentUserId">Már jelentkeztél!</h3>
      <h3 v-if="event.user == userID" class="self-event-alert">
        Nem tudsz jelentkezni a saját eseményedre!
      </h3>
      <h3 class="jelentkezes-befejezett" v-if="szam == 0">
        Már nem lehet jelentkezni az eseményre!
      </h3>
    </div>
  </div>
</div>





    <div class="asztaligep">
      <div class="keret">
        <div class="leiras-asztaligep" v-for="event in events">
          <div class="event-header">
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
          <h3 class="event-helyszin">Helyszín: {{ event.helyszin }}</h3>
          <h3 class="eventhossz-gep">Az esemény hossza: {{ event.hossz }} óra.</h3>
        </div>
          <h5 class="event-leiras">{{ event?.leiras }}</h5>
          <h4 class="jelentkezesi-limit">📌 Jelentkezési Limit: {{ szam }}</h4>
          <br>
          <h4 class="user-info">
            Az esemény létrehozója:
          <img :src="event.user_id.profilkep" alt="Profilkép" />
          <span>{{ event.user_id.username }}</span>
        </h4>
          <br>
          <button
          @click="jelentkez()"
          v-if="!szam == 0 && event.user != userID && !data[0]"
          class="jelentkezes-btn"
        >
          ✅ Jelentkezés
        </button>
      
        <h3 class="already" v-if="data[0] && data[0].creatorId !== currentUserId">Már jelentkeztél!</h3>
          <h3 v-if="event.user == userID" class="self-event-alert">
            Nem tudsz jelentkezni a saját eseményedre!
          </h3>
          <h3 class="jelentkezes-befejezett" v-if="szam == 0">
            Már nem lehet jelentkezni az eseményre!
          </h3>
        </div>
      </div>
      <img class="kep" src="/conecrt.jpg" alt=""/>
    </div>
  </div> 
  <div id="failedModalInformation" class="failed-modal" style="display: none">
    <div class="modal-content">
      <h2>Jelentkezz be!</h2>
    </div>
  </div>


</template>

<style scoped>


.hatter {
  background: url("/moderndik3.png");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
}

/* Gépes nézet */
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
    border-radius: 10px; 
    display: inline-block;
  }
  .cim {
  margin: 0;
  font-size: 1.8rem; 
  font-weight: 700;
  color: #912e1d;
  text-align: center;
  letter-spacing: 0.3px;
}

.date-box {
  background-color: rgba(255, 255, 255, 0.25);
  color: #3e2723;
  padding: 4px 12px; 
  font-size: 1.4rem; 
  font-weight: 600;
  border-radius: 16px;
  backdrop-filter: blur(4px);
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

.eventhossz-gep {
  font-size: 1.3rem;
  color: #5d4037;
  font-weight: 700;
  opacity: 0.8;
  margin-top: 2px; 
}
.event-header {
  margin: -20px; 
  margin-bottom: 0;
  background: linear-gradient(135deg, #f0bc69, #ffe0cc);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.06);
  width: calc(100% + 40px); 
  box-sizing: border-box;
}
.event-leiras {
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 1.3;
  color: #333;
  background: #fff7e6;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  width: 100%;         
  max-width: 100%;       
  margin-top: 20px;
  margin-left: 0;
  margin-right: 0;
}

.event-leiras::after {
  content: '';
  display: block;
  height: 10px;
  background: #ff9966;
  border-radius: 6px;
  margin-top: 10px;
  width: 60px;
}


.jelentkezesi-limit {
  display: inline-block;
  color: #f13a0c;
  padding: 10px 1px;
  
  font-size: 1.6rem;
  font-weight: 700;
  margin-top: 30px;
  width: fit-content;
}
.jelentkezes-befejezett {
  display: inline-block; 
  padding: 20px; 
  background: linear-gradient(135deg, #ff6a4d, #f5574b); 
  color: white;
  font-size: 1.4rem;
  font-weight: 600;
  text-align: center;
  line-height: 40px; 
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  margin-top: 20px;
  white-space: nowrap; 
}
  .kep {
  position: absolute;
  right: 30%;
  top: 40%;
  transform: translateY(-50%);
  max-width: 900px;
  height: auto;
  border-radius: 15px; 
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15); 
  border: 5px solid #f3f4f6; 
  padding: 10px; 
  background: rgba(255, 255, 255, 0.7); 
}

.kep:hover {
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2); 
}
  
.keret {
  margin: 50px 0; 
  padding: 20px;
  display: flex;
  flex-direction: column; 
  align-items: center;
  justify-content: center;
  width: 100%; 
  max-width: 550px; 
  background-color: #ffffff; 
  border-radius: 16px; 
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); 
  transition: all 0.3s ease-in-out;
  margin-left: 30px; 
  margin-right: auto; 
}

.keret:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  transform: translateY(-5px);
}
.user-info {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.6); 
  backdrop-filter: blur(6px);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateX(-10px);
  transition: transform 0.3s ease;
  width: fit-content;
  max-width: 100%;
}

.user-info:hover {
  transform: translateX(0);
}

.user-info img {
  height: 56px;
  width: 56px;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  border: 2px solid #d1d1d1;
  transition: border-color 0.3s ease;
}

.user-info:hover img {
  border-color: #6c63ff;
}

.user-info span {
  font-size: 1.3rem;
  font-weight: 700;
  color: #222;
  letter-spacing: 0.5px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}
.self-event-alert {
  display: inline-block;
  background: linear-gradient(90deg, #ffecd2 0%, #fcb69f 100%);
  color: #4b2c20;
  padding: 16px 24px;
  border-radius: 18px;
  font-size: 1.3rem;
  font-weight: 700;
  margin-top: 24px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  max-width: 100%;
  width: fit-content;
}
.jelentkezes-btn {
  width: 220px;
  height: 70px;
  background: linear-gradient(135deg, #6dbe20, #4c9b02);
  color: white;
  font-size: 1.6rem;
  font-weight: 600;  
  border: none;
  border-radius: 50px; 
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out; 
  margin-top: 20px;
}

.jelentkezes-btn:hover {
  transform: translateY(-4px); 
  box-shadow: 0 14px 30px rgba(255, 94, 98, 0.4); 
  background: linear-gradient(135deg, #66cc47, #3c7d21); 
}

.jelentkezes-btn:active {
  transform: scale(0.98) translateY(2px); 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
}
.already {
  color: red
}
}


/* Telefonos nézet */
@media only screen and (max-width: 600px) {
  .asztaligep {
    display: none;
  }

  .mobil {
    display: block;
    padding: 16px;
    box-sizing: border-box;
  }

  .leiras {
    padding: 16px;
    width: 90%;
    background-color: white;
    border-radius: 10px;
    display: block;
    margin: 0 auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .cim {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 700;
    color: #912e1d;
    text-align: center;
    letter-spacing: 0.3px;
  }

  .date-box {
    background-color: rgba(255, 255, 255, 0.25);
    color: #3e2723;
    padding: 4px 10px;
    font-size: 1.2rem;
    font-weight: 600;
    border-radius: 16px;
    backdrop-filter: blur(4px);
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    text-align: center;
    margin: 10px auto 0 auto;
    display: block;
    width: fit-content;
  }

  .eventhossz-mobil {
    font-size: 1.2rem;
    color: #5d4037;
    font-weight: 700;
    opacity: 0.8;
    text-align: center;
    margin-top: 4px;
  }

  .event-header {
  position: relative;
  background-image: url('/conecrt.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  border-top-left-radius: 16px;
  border-top-right-radius: 16px;

  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.06);
  width: 100%;
  box-sizing: border-box;

  color: white;
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.7); 
  margin: 0;
}

  .event-leiras {
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.4;
    color: #333;
    background: #fff7e6;
    padding: 18px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    margin: 20px auto 0 auto;
    width: 90%;
  }

  .event-leiras::after {
    content: '';
    display: block;
    height: 8px;
    background: #ff9966;
    border-radius: 6px;
    margin-top: 10px;
    width: 40px;
    margin-left: auto;
    margin-right: auto;
  }

  .jelentkezesi-limit {
    display: block;
    color: #f13a0c;
    padding: 8px;
    font-size: 1.4rem;
    font-weight: 700;
    margin-top: 24px;
    text-align: center;
  }

  .jelentkezes-befejezett {
    display: block;
    padding: 18px;
    background: linear-gradient(135deg, #ff6a4d, #f5574b);
    color: white;
    font-size: 1.3rem;
    font-weight: 600;
    text-align: center;
    line-height: 1.4;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }

  .kep {
    position: static;
    transform: none;
    width: 90%;
    height: auto;
    margin: 20px auto 0 auto;
    border-radius: 15px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    border: 5px solid #f3f4f6;
    padding: 10px;
    background: rgba(255, 255, 255, 0.7);
  }

  .kep:hover {
    transform: none;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  .keret {
    background-color: #ffffff;
    border-radius: 18px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    
  }

  .keret:hover {
    transform: none;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(6px);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin: 0 auto;
    width: fit-content;
    max-width: 90%;
  }

  .user-info img {
    height: 48px;
    width: 48px;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    border: 2px solid #d1d1d1;
  }

  .user-info span {
    font-size: 1.2rem;
    font-weight: 700;
    color: #222;
    letter-spacing: 0.5px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  .self-event-alert {
    display: block;
    background: linear-gradient(90deg, #ffecd2 0%, #fcb69f 100%);
    color: #4b2c20;
    padding: 16px;
    border-radius: 18px;
    font-size: 1.2rem;
    font-weight: 700;
    margin-top: 20px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
    text-align: center;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }

  .jelentkezes-btn {
    width: 90%;
    height: 60px;
    background: linear-gradient(135deg, #6dbe20, #4c9b02);
    color: white;
    font-size: 1.4rem;
    font-weight: 600;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-in-out;
    margin: 20px auto 0 auto;
    display: block;
  }

  .jelentkezes-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 14px 30px rgba(255, 94, 98, 0.4);
    background: linear-gradient(135deg, #66cc47, #3c7d21);
  }

  .jelentkezes-btn:active {
    transform: scale(0.98) translateY(2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
  .already {
    color: red;
  }

}


/* Modalok */
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
</style>

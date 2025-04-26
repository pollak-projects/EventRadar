<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { RouterLink } from "vue-router";
import Navbar from "../components/Navbar.vue";

const events = ref();
var modal = document.getElementById("id01");

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

document.body.addEventListener("pointermove", (e) => {
  const { currentTarget: el, clientX: x, clientY: y } = e;
  const { top: t, left: l, width: w, height: h } = el.getBoundingClientRect();
  el.style.setProperty("--posX", x - l - w / 2);
  el.style.setProperty("--posY", y - t - h / 2);
});

const currentIndex = ref(0);
let intervalId = null;

const startSlider = () => {
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % reviews.value.length;
  }, 5000);
};

const reviewData = defineModel({
  default: {
    nev: "",
    email: "",
    uzenet: "",
  },
});

function reviewSend() {
  if(
    !reviewData.value.nev ||
    !reviewData.value.email ||
    !reviewData.value.uzenet
  ) {
    return;
  }

  console.log(reviewData.value);
  fetch(`http://localhost:3300/contact/reviewsend`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nev: reviewData.value.nev,
      email: reviewData.value.email,
      uzenet: reviewData.value.uzenet,
    }),
  })
    .then(async (result) => {
      document.getElementById("successModalContact").style.display = "flex";
          setTimeout(() => {
          document.getElementById("successModalContact").style.display = "none";
          location.reload();
          }, 2000);
    })
    .catch((error) => console.log("error", error));
}

const reviews = ref([]);

function getAllEvents() {
  fetch(`http://localhost:3300/event/getAll`).then(async (res) => {
    const data = await res.json();
    console.log(data);
    events.value = data;
    
    const today = new Date().toISOString().split('T')[0];
    const futureEvents = data.filter(event => event.esemeny_date.split('T')[0] >= today);
    const sortedEvents = futureEvents.sort((a, b) => new Date(a.esemeny_date) - new Date(b.esemeny_date));
    events.value = sortedEvents.slice(0, 3);
  });
}

function getAllReviews() {
  fetch(`http://localhost:3300/contact/getreview`).then(async (res) => {
    const data = await res.json();
    reviews.value = data;
  });
}

onMounted(() => {
  getAllEvents();
  getAllReviews();
});

onMounted(() => {
  startSlider();
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <Navbar />
  <div class="header">
    <div class="body">
      <h1 class="felirat">
        HIRDESD NÁLUNK AZ <br class="szoveg" />
        ESEMÉNYEID!
      </h1>
    </div>
  </div>
  <div class="cim">
    <h1>Közelgő események</h1>
  </div>
  <div class="slidecards telefonslide">
    <div id="carouselExample" class="carousel slide">
      <div class="carousel-inner" >
        <div class="carousel-item active" v-for="event in events">
          <div class="event-card">
            <img :src="event.Eventcat.image" class="kep" />
            <h3><i>{{ event.esemeny_nev }}</i></h3>
            <p><b>{{ event.esemeny_date.split("T")[0] }}</b></p>
            <p><b>{{ truncateText(event.leiras, 80) }}</b></p>
            <RouterLink
          class="pirosgomb"
          :to="'/information/' + event.id"
          style="text-decoration: none"
        >
          Tovább
        </RouterLink>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev mutass"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-left"
          viewBox="0 0 16 16"
          style="color: black"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
          />
        </svg>
      </button>
      <button
        class="carousel-control-next mutass"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
        style="color: black"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-right"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
          />
        </svg>
      </button>
    </div>
  </div>
  <div class="slidecards szamitoslide">
    <div v-for="event in events">
    <div class="event-card">
      <img :src="event.Eventcat.image"  class="kep" />
      <h3><i>{{ event.esemeny_nev }}</i></h3>
      <p><b>{{ event.esemeny_date.split("T")[0] }}</b></p>
      <p><b>{{ truncateText(event.leiras, 80) }}</b></p>
      <RouterLink
          class="pirosgomb"
          :to="'/information/' + event.id"
          style="text-decoration: none"
        >
          Tovább
        </RouterLink>
    </div>
  </div>
</div>

  <div class="slider-container">
    <transition name="fade" mode="out-in">
      <div v-if="reviews.length" :key="currentIndex" class="review">
        <p>{{ reviews[currentIndex]?.uzenet }}</p>
        <span>- {{ reviews[currentIndex]?.nev }}</span>
      </div>
    </transition>
  </div>
  <br />
  <div class="container" style="">
    <div class="contact-card">
      <h2>Kapcsolat</h2>
      <form>
        <input
          type="text"
          v-model="reviewData.nev"
          placeholder="Név"
          required
        />
        <input
          type="email"
          v-model="reviewData.email"
          placeholder="Email"
          required
        />
        <select v-model="subject" class="subject-dropdown" required>
          <option value="targy" disabled>Válassz</option>
          <option value="">Vélemény írása</option>
          <option value="Általános érdeklődés">Hiba bejelentése</option>
          <option value="Egyéb">Egyéb</option>
        </select>
        <textarea
          v-model="reviewData.uzenet"
          placeholder="Üzenet"
          required
        ></textarea>
        <button type="button" class="pirosgomb" @click="reviewSend()">
          Küldés
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-send-fill"
            viewBox="0 0 16 16"
          >
            <path
              d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"
            />
          </svg>
        </button>
      </form>
      <div class="email-contact" style="margin-top: 20px; text-align: center; font-size: 0.9rem;">
      <p class="email-text">Szeretné inkább e-mailben felvenni velünk a kapcsolatot?</p>
      <p class="email-address">Az alábbi címen várjuk üzenetét: <strong>eventradar.project@gmail.com</strong></p>
    </div>
    </div>
  </div>
    <div id="successModalContact" class="success-modal" style="display: none">
        <div class="modal-content">
          <h2>Üzenet elküldve!</h2>
        </div>
      </div>

  <footer
    class="d-flex flex-wrap justify-content-between align-items-center p-3 my-4 border-top"
  >
    <p class="col-md-4 mb-0 text-muted">© 2024 EventRadar, Inc</p>
  </footer>
</template>

<style scoped>
.email-contact {
  margin-top: 30px;
  padding-top: 15px;
  border-top: 1px solid #ccc;
  text-align: center;
}

.email-text {
  font-size: 1.2rem;
  margin-bottom: 8px;
  color: #333;
}

.email-address {
  font-size: 1.2rem;
  font-weight: 500;
  color: #555;
}

.success-modal {
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

.success-modal .modal-content {
  background-color: #28a745;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 30%;
  max-width: 400px;
  font-family: 'Arial', sans-serif;
  color: white;
}

.success-modal .modal-content h2,
.success-modal .modal-content p {
  color: white;
}

.felirat {
  margin: auto;
  font-size: 55px;
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s forwards;
  color: rgba(0, 0, 0, 0.719);
  margin: auto;
}
@media only screen and (max-width: 768px) {
  .success-modal {
    margin-top: 50;
    align-items: flex-start;
    padding: 10px; 
  }

  .success-modal .modal-content {
    width: 90%; 
    max-width: 350px; 
    padding: 20px; 
    border-radius: 10px; 
    font-size: 1rem; 
    text-align: center;
  }
  
  .felirat {
    font-size: 34px;
    width: 100%;
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}


.slider-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: white;
  justify-content: center;
  margin: 0 auto;
  width: 700px;
  height: 150px;
  overflow: hidden;
  text-align: center;
  font-size: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.review {
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background: white;
  justify-content: center;
  background-image: url(/moderndik2.png);
  min-height: 80vh;
  max-width: 100vw;
}

.contact-card {
  width: 400px;
  padding: 30px;
  background: #fff;
  color: #333;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.subject-dropdown {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
  appearance: none;
  background-color: #fff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23333'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px top 50%;
  background-size: 16px;
}

.subject-dropdown:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
.contact-card h2 {
  margin-bottom: 20px;
  font-size: 24px;
}
.contact-card input,
.contact-card textarea {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
}
.contact-card textarea {
  min-height: 100px;
}
.contact-card .pirosgomb {
  width: 100%;
  padding: 12px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}
.contact-card .pirosgomb:hover {
  background: #d32f2f;
}
.hero {
  text-align: center;
  background: url("/informbg.png");
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  padding: 420px 0;
  word-break: break-all;
  width: 100%;
  font-family: "MonumentBold";
}

.slidecards {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  width: 100%;
  padding: 20px;
}

.event-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 300px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.event-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.event-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.event-card h3 {
  margin: 15px 0 5px;
  font-size: 1.4rem;
}

.event-card p {
  font-size: 1rem;
  color: #666;
  margin-bottom: 15px;
}

.event-card .pirosgomb {
  align-self: center; 
  background: #ff5a5f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  margin-bottom: 15px;
}

.event-card .pirosgomb:hover {
  background: #e0484d;
} 

.kep {
  width: 100%;
}

.footerlogo {
  width: 150px;
}
.slide {
  width: fit-content;
  padding: 50px;
}

.slidecards {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.cim {
  justify-content: center;
  align-items: center;
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
}

.header {
  width: 100%;
}

.comment-section {
  padding-top: 10px;
  padding-bottom: 10px;
  background: #eee;
  width: 600px;
}

.comment-section .user {
  width: 50px;
  border-radius: 40%;
  margin-right: 10px;
}

@media only screen and (max-width: 600px) {
  .hero h1 {
    font-size: 28px;
  }
  .szamitoslide {
    display: none;
  }
  .telefonslide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
}

@media only screen and (min-width: 600px) {
  .hero h1 {
    font-size: 60px;
  }
  .szoveg {
    display: none;
  }
  .telefonslide {
    display: none;
  }
  .szamitoslide {
    padding-top: 30px;
    padding-bottom: 30px;
    gap: 30px;
    display: flex;
    width: 100%;
  }
}

.body {
  height: 100vh;
  margin: 0;
  --x: calc(var(--posX, 0) * 0.1px);
  --y: calc(var(--posY, 0) * 0.1px);
  background-image: radial-gradient(
    circle at calc(50% + var(--x)) calc(50% + var(--y)),
    rgba(0, 0, 0, 0.692) 0%,
    #ffb366 30%,
    #ff6600 70%,
    black 100%
  );
  background-size: 100% 95%;
  background-repeat: no-repeat;
  text-align: center;
  color: white;
  padding: 420px 0;
  word-break: break-all;
  width: 100%;
  font-family: "MonumentBold";
}

@keyframes color-shift {
  0% {
    background: linear-gradient(to right, #ff5733, #ffc300);
  }
  50% {
    background: linear-gradient(to right, #ffc300, #ff5733);
  }
  100% {
    background: linear-gradient(to right, #ff5733, #ffc300);
  }
}

@media only screen and (max-width: 600px) {
  .slider-container {
    width: 90%;
    margin: 0 auto;
  }

  .review {
    font-size: 17px;
    padding: 10px;
    
  }

  .review span {
    font-size: 13px;
  }
}
</style>

<script>
export default {
  data() {
    return {
      text: "Ez egy hosszú szöveg, amit le kell rövidíteni, hogy ne legyen túl hosszú és ne sértse meg a dizájnt.",
    };
  },
  methods: {
    truncateText(value, maxLength) {
      return value.length > maxLength
        ? value.slice(0, maxLength) + "..."
        : value;
    },
  },
};
</script>

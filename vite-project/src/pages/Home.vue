<script setup>
import { onMounted } from "vue";
import Navbar from "../components/Navbar.vue";
var modal = document.getElementById("id01");

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

let slideIndex = 0;
onMounted(() => {
  showSlides();
});

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" activeka", "");
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
</script>

<template>
  <Navbar />
  <div class="header">
    <div class="hero">
      <h1>
        HIRDESD NÁLUNK AZ <br class="szoveg" />
        ESEMÉNYEID
      </h1>
    </div>
  </div>
  <div class="cim">
    <h1>Népszerű események</h1>
  </div>
  <div class="slidecards telefonslide">
    <div id="carouselExample" class="carousel slide">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="event-card">
            <img src="/grinder.jpg" alt="kis tekerés" class="kep" />
            <h3><i>kis tekerés</i></h3>
            <p><b>2025.03.12</b></p>
            <button>fasz</button>
          </div>
        </div>
        <div class="carousel-item">
          <div class="event-card">
            <img src="/user.jpg" alt="kis tekerés" class="kep" />
            <h3><i>kis majom</i></h3>

            <p><b>2025.03.12</b></p>
            <button>fasz</button>
          </div>
        </div>
        <div class="carousel-item">
          <div class="event-card">
            <img src="/conecrt.jpg" alt="kis tekerés" class="kep" />
            <h3><i>kis peti</i></h3>
            <p>{{ truncateText(text, 80) }}</p>

            <button>fasz</button>
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
    <div class="event-card">
      <img src="/grinder.jpg" alt="kis tekerés" class="kep" />
      <h3><i>kis tekerés</i></h3>
      <p><b>2025.03.12</b></p>
      <button>fasz</button>
    </div>
    <div class="event-card">
      <img src="/user.jpg" alt="kis tekerés" class="kep" />
      <h3><i>kis majom</i></h3>
      <p><b>2025.03.12</b></p>
      <button>fasz</button>
    </div>
    <div class="event-card">
      <img src="/conecrt.jpg" alt="kis tekerés" class="kep" />
      <h3><i>kis peti</i></h3>
      <p><b>2025.03.12</b></p>
      <button>fasz</button>
    </div>
  </div>

  <div class="justify-content-center"></div>

  <div
    id="carouselExampleSlidesOnly"
    class="carousel slide"
    data-bs-ride="carousel"
  >
    <div class="carousel-inner">
      <div class="carousel-item activeka">
        <div class="comment-section d-flex justify-content-center">
          <img src="/user.jpg" alt="User" class="user" />
          <p>
            <i
              >nagyon tetszik ez az oldal itt fogom mindig hirdetni az
              eseményeimet! 😊</i
            >
          </p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="..." class="d-block w-100" alt="..." />
      </div>
      <div class="carousel-item">
        <img src="..." class="d-block w-100" alt="..." />
      </div>
    </div>
  </div>

  <div class="slideshow-container">
    <div class="mySlides fade">
      <div class="numbertext">1 / 3</div>
      <img src="/moderndik1.png" style="width: 100%" />
      <div class="text">Caption Text</div>
    </div>

    <div class="mySlides fade">
      <div class="numbertext">2 / 3</div>
      <img src="/moderndik2.png" style="width: 100%" />
      <div class="text">Caption Two</div>
    </div>

    <div class="mySlides fade">
      <div class="numbertext">3 / 3</div>
      <img src="/moderndik3.png" style="width: 100%" />
      <div class="text">Caption Three</div>
    </div>
  </div>

  <div class="contact-div">
    <form class="contact-form">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
  <footer
    class="d-flex flex-wrap justify-content-between align-items-center p-3 my-4 border-top"
  >
    <p class="col-md-4 mb-0 text-muted">© 2024 EventRadar, Inc</p>
  </footer>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
body {
  font-family: Verdana, sans-serif;
}
.mySlides {
  display: none;
}
img {
  vertical-align: middle;
}

/* Slideshow container */
.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
}

/* Caption text */
.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* The dots/bullets/indicators */
.dot {
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.activeka {
  background-color: #717171;
}

/* Fading animation */
.fade {
  opacity: 1;
}

@keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}

/* On smaller screens, decrease text size */
@media only screen and (max-width: 300px) {
  .text {
    font-size: 11px;
  }
}

.contact-div {
  background-image: url(/moderndik2.png);
}
.contact-form {
  width: 800px;
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

.event-container {
  display: flex;
  justify-content: center;
  margin: 20px;
  flex-wrap: wrap;
}
.event-card {
  background: #f8f8f8;
  padding: 15px;
  margin: 10px;
  width: 200px;
  height: 300px;
  border-radius: 10px;
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

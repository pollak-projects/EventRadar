<script setup>

</script>

<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid ">
        <a href="">
        <img src="/public/eventradarlogo.png" alt="" class="logo" >
        </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse navi" id="navbarNavAltMarkup">
       <hr class="vonal" style="width:100%;transform: translate(-5px, 0);margin-bottom: 7px; margin-top: 1px;">
      <div class="navbar-nav">
        <a class="nav-link"  href="#">Főoldal</a>
        <a class="nav-link active" aria-current="page" href="#">Események</a>
        <a class="nav-link" href="#">Létrehozás</a>
        <a class="nav-link " href="#" >Disabled</a>
        <a class="nav-link signinmobile" type="button"  onclick="document.getElementById('id01').style.display='block'" href="#">Bejelentkezés</a>
      </div>
    </div>
      <button class="btn btn-primary signin" type="button"  onclick="document.getElementById('id01').style.display='block'" style="width:auto;" >Bejelentkezés</button>
  <div id="id01" class="modal"> 
  <form class="modal-content animate" method="post">
    <div class="imgcontainer">
      <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
      <img src="/eventradarlogo.png" alt="Avatar" class="signinpic" >
    </div>

    <div class="container">
      <label for="uname"><b>E-mail</b></label>
      <input type="text" placeholder="Enter Username" name="uname" required>

      <label for="psw"><b>Jelszó</b></label>
      <input type="password" placeholder="Enter Password" name="psw" required>
        
      <button class="btn btn-primary" type="submit" style="margin-top: 15px;width: 100%;">Bejelentkezés</button>

            <span class="psw"><a href="#">Elfelejtetted a jelszavadat?</a></span>
    </div>

    <div class="container" style="background-color:#f1f1f1;align-items: center;align-content: center;">
      <span>Nincs fiókod? <a href="">Regisztráció</a></span>
    </div>
  </form>
</div>
  </div>
</nav>
</template>

<style scoped>
.logo {
  padding-top: 5px;
  -webkit-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
  height: 40px;
  width: auto;
}
.navi {
  display: auto;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 25px;
  transform: translate(-30px, 0);
  margin-top: 10px;
} 

@media only screen and (max-width: 600px) {

  .signin{
    display: none;
  }
  .navi {
    display: auto;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 25px;
    transform: translate(+5px, 0);
    margin-top: 10px;
  }
}

@media only screen and (min-width: 600px) {
  .signinmobile{
    display: none;
  }
  .vonal{
    display: none;
  }
}

.active{
  font-weight:bold;
}
</style>
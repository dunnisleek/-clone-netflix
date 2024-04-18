<template>
  <body>
    <div class="wrapper">
      <!-- /navbar -->
      <!-- {{ movies }} -->
      <nav>
        <div>
          <!-- hamburger menu -->
          <img
            src="../images/menu icon.svg"
            alt=""
            width="30"
            @click="toggleNavigation"
          />

          <NuxtLink to="/">
            <img
              src="../images/Netflix_Logo_PMS.png"
              alt="netflix logo"
              width="100"
            />
          </NuxtLink>
        </div>

        <div><img src="../images/search.svg" alt="search" width="30" /></div>
      </nav>

      <!-- THIS IS THE USERNAME FIELD -->
      <div
       id="menu"
        class="menu-section"
        v-show="showNavigation"
        
        :class="showNavigation ? 'open-menu' : 'closed-menu'"
      >
        <div class="username">
          <div class="firstLine">
            <img src="../images/jagun.jpeg" alt="" width="30px" />
            <h3>Username</h3>
          </div>
          <!-- <div>  <h4>username</h4> </div> -->
          <div @click="closeNav">
            <img src="../images/sync-icon.svg" alt="" width="30" />
          </div>
        </div>

        <!-- THIS IS THE NOTIFY SECTION WITH ICONS -->
        <div class="notify">
          <img src="../images/notifications.svg" alt="" />Notification
        </div>
        <div class="downld">
          <img src="../images/download.icon.svg" alt="" />My Download
        </div>

        <!-- THIS IS THE MAIN MENU CONTENT -->
        <div class="main-nav">
          <NuxtLink to="">Home</NuxtLink>
          <NuxtLink to="">Dramas</NuxtLink>
          <NuxtLink to="">Independent</NuxtLink>
          <NuxtLink to="">Thriller</NuxtLink>
          <NuxtLink to="">Horror</NuxtLink>
          <NuxtLink to="">Kids & Family</NuxtLink>
          <NuxtLink to="">TV Shows</NuxtLink>
          <NuxtLink to="">Romance</NuxtLink>
        </div>
        <div class="footer">
          <NuxtLink to="">App Setting</NuxtLink>
          <NuxtLink to="">Account</NuxtLink>
          <NuxtLink to="">About</NuxtLink>
          <NuxtLink to="">Help</NuxtLink>
          <NuxtLink to="">Sign Out</NuxtLink>
        </div>
      </div>

      <!--MOVIE BANNER -->
      <div
        class="banner"
        :style="{ backgroundImage: 'url(' + currentMovie.Poster + ')' }"
      >
        <div class="leftText">
          <h2>{{ currentMovie.Title }}</h2>
          <p>{{ currentMovie.Plot }}</p>
          <div class="btns-banner">
            <button class="play">
              <img src="../images/play-icon.svg" />Play
            </button>
            <button class="moreInfo">
              <img src="../images/add-icon.svg" />My List
            </button>
          </div>
        </div>

        <div class="top"></div>
      </div>

      <!-- NEW RELEASE CAROUSEL -->
      <div class="carousel">
        <h2>New Releases</h2>
        <div class="carousel-inner">
          <div v-for="(mov, imdbID) in visibleMovies" :key="imdbID">
            <NuxtLink :to="`details/${mov.imdbID}`"
              ><img :src="mov.Poster" alt=""
            /></NuxtLink>
          </div>
        </div>
        <button class="left" @click="prevSlide"> <img src="../images/arrow_back.svg" alt="prev"/></button>
        <button class="right" @click="nextSlide"><img src="../images/arrow-next.svg" alt="next"/></button>
      </div>

      <!-- TRENDING NOW -->
      <div class="carousel trend">
        <h2>Trending Now</h2>
       <transition name="left">
        <div class="carousel-inner">
        
          <div v-for="(mov, imdbID) in visibleTrend" :key="imdbID">
            <!-- <img :src="mov.Poster" alt="" /> -->
           
              <NuxtLink :to="`details/${mov.imdbID}`">
              <img :src="mov.Poster" alt=""
            /></NuxtLink>
          
          </div>
       
        </div>
      </transition>
      </div>
      <button class="prev" @click="prevView"><img src="../images/arrow_back.svg" alt="prev"/></button>
      <button class="next" @click="nextTrendSlide"><img src="../images/arrow-next.svg" alt="next"/></button>
    </div>

  </body>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
import { ref, computed } from "vue";
import movies from "../store/movies.json";

//for the hamburger menu
const showNavigation = ref(false);

// Fetch movie data from the API
const mov = movies;
// const { data:movie} = await useFetch('https://freetestapi.com/api/v1/movies');

// Select the first movie from the movies array to display in the banner
const currentMovie = movies[8] || {};

// const title = 'Trending Now'; // Change title to 'Trending Now'



const currentIndex = ref(0);
const currentTrendIndex = ref(0);


//We use a computed property visibleMovies to dynamically
//determine which movies should be visible in the carousel based on the current index.
const visibleMovies = computed(() => {
  const start = currentIndex.value;
  const end = start + 5; //number of movies to display
  return movies.slice(start, end);
});

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1;
  } else {
    currentIndex.value = movies.length - 5;
  }
};

const nextSlide = () => {
  if (currentIndex.value < movies.length - 3) {
    currentIndex.value += 1;
  } else {
    currentIndex.value = 0;
  }
};

//TRENDING
const visibleTrend = computed(() => {
  const start = currentTrendIndex.value;
  const end = start + 5; //number of movies to display
  return movies.slice(start, end);
});
const prevView = () => {
  if (currentTrendIndex.value > 0) {
    currentTrendIndex.value -= 1;
  } else {
    currentTrendIndex.value = movies.length - 5;
  }
};

const nextTrendSlide = () => {
  if (currentTrendIndex.value < movies.length - 3) {
    currentTrendIndex.value += 1;
  } else {
    currentTrendIndex.value = 0;
  }
};

const toggleNavigation = () => {
  showNavigation.value = !showNavigation.value;
  
};
const closeNav = () => {
  showNavigation.value = false;
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap");

nav {
  display: flex;
  justify-content: space-between;
  padding: 5px 20px;
  margin: 0 auto;
  align-items: center;
  cursor: pointer;
}
nav div {
  display: flex;
  align-items: center;
}
.menu-section {
  background: #282828f1;
  width: 350px;
  height: 110%;
  position: absolute;
  top: 0;
  cursor: pointer;
  z-index: 999;
  
}
.menu-section.open {
  transform: translateX(0); /* Slide the menu into view */
}
.open-menu {
opacity: 1;
height: 110%;
transform: translateX(0);
}
.closed-menu {
opacity: 0;
height: 0;
padding: 0;
}
.username {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 2px solid black;
}
.username > .firstLine {
  display: flex;
  gap: 10px;
}
.menu-section a {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-left: 30px;
}

.menu-section > .notify {
  display: flex;
  border-bottom: 2px solid black;
  padding: 20px;
}
.menu-section > .downld {
  display: flex;
  border-bottom: 2px solid black;
  padding: 20px;
}
.main-nav {
  padding: 5px;
  border-bottom: 2px solid black;
}
.main-nav a {
  padding: 13px 15px;
  font-size: 18px;
  line-height: 22px;
}
.main-nav a:hover {
  border-left: 3px solid red;
  cursor: pointer;
  transition: all ease-in 0.2s;
}
.footer {
  padding: 5px;
}
.footer a {
  padding: 13px 15px;
  font-size: 18px;
  line-height: 22px;
}
.footer a:hover {
  border-left: 3px solid red;
  cursor: pointer;
  transition: all ease-in 0.2s;
}
body {
  margin: 0;
  box-sizing: border-box;
  background: #181818;
  width: 100%;
  max-width: calc(1440 - 170px);
}
.banner {
  /* background-image: url(../images/jagun.jpeg), linear-gradient(rgb(0, 0, 0),rgba(0, 0, 0, 0.95)); */
  background-size: cover;
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: space-between;
  gap: 50rem;
  align-items: center;
}
.leftText {
  padding: 0 5rem;
}
.leftText h2 {
  font-size: 75px;
  font-weight: 900;
  font-family: "Nunito Sans", sans-serif;
  color: #ffffff;
}
.leftText p {
  font-size: 16px;
}
.btns-banner {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}
.play {
  background: red;
  color: #ffffff;
  max-width: 150px;
  height: 5vh;
  padding: 5px 20px;
  border: none;
  border-radius: 2px;
  display: flex;
  /* align-content: center; */
  align-items: center;
}
.moreInfo {
  background: #1a1919;
  color: #ffffff;
  padding: 5px 20px;
  max-width: 150px;
  height: 5vh;
  border: none;
  border-radius: 2px;
  display: flex;
  /* align-content: center; */
  align-items: center;
}
/* popular */
.popular {
  color: #ffffff;
  padding: 2rem 4rem;
  overflow: hidden;
}

.carousel {
  padding: 3rem 10px;
}
.carousel h2 {
  font-size: 25px;
  padding-bottom: 10px;
}
.carousel {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.carousel-inner {
  display: flex;
  gap: 10px;
}

.carousel-slide {
  flex: 0 0 auto;
  margin-right: 10px;
}

.carousel-slide img {
  width: 300px;
  max-width: 100%;
}

/* Navigation buttons */
.left,
.right {
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
}
.left {
  left: 0;
}
.right {
  right: 0;
}
.trend {
  position: relative;
}

.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 190%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
}
.prev {
  left: 0;
}
.next {
  right: 0;
}

.left-enter-active{
 animation: leftInAnimation 0.4s ease-in-out;
}
.left-leave-active{
  animation: leftInAnimation 0.4s ease-in-out;
}
@keyframes leftInAnimation {
  from {transform : translateX(100%);}
  to {transform: translateX(0);}
}
@keyframes leftOutAnimation {
  from {transform : translateX(0);}
  to {transform: translateX(-100%);}
}
/* 
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
} */

</style>

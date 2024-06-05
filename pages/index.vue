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

        <div class='searchBox'>
          <img src="../images/search.svg" alt="search" width="30" />
        <input type="text" placeholder="search" v-model="searchQuery">
        </div>
      </nav>

      <!-- THIS IS THE USERNAME FIELD -->
      <transition enter-to-class="animate__animated animate__slideInLeft" leave-to-class="animate__animated animate__slideOutLeft">
      <div
        id="menu"
        class="menu-section"
        v-show="showNavigation"
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
    </transition > 
      <!--MOVIE BANNER -->
      <div
        class="banner overlay"
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
        <button class="left" @click="prevSlide">
          <img src="../images/arrow_back.svg" alt="prev" />
        </button>
        <button class="right" @click="nextSlide">
          <img src="../images/arrow-next.svg" alt="next" />
        </button>
      </div>

      <!-- TRENDING NOW -->
      <div class="carousel trend">
        <h2>Trending Now</h2>
        <transition name="left">
          <div class="carousel-inner">
            <div
              v-for="(mov, imdbID) in visibleTrend"
              :key="imdbID"
              class="fade"
            >
              <!-- <img :src="mov.Poster" alt="" /> -->

              <NuxtLink :to="`details/${mov.imdbID}`">
                <img :src="mov.Poster" alt=""
              /></NuxtLink>
            </div>
         
          
          </div>
        </transition>
        <button class="prev" @click="prevView">
        <img src="../images/arrow_back.svg" alt="prev" />
      </button>
      <button class="next" @click="nextTrendSlide">
        <img src="../images/arrow-next.svg" alt="next" />
      </button>
      </div>
     
     
    </div>
  </body>
</template>

<script setup lang="ts">
//SEO
useSeoMeta({
  title: 'dunni Amazing Site',
  ogTitle: 'dunni Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
//end of SEO

import { ref, computed, onMounted } from "vue";
import movies from "../store/movies.json";

//for the hamburger menu
const showNavigation = ref(false);

// Fetch movie data from the API
const mov = movies;

// Select the first movie from the movies array to display in the banner
const currentMovie = movies[2] || {};


const currentIndex = ref(0);
const currentTrendIndex = ref(0);
const searchQuery = ref('') // Data property to store the search query


// Adjust the visibleMovies to handle wrapping logic.
const visibleMovies = computed(() => {
  // Filter movies based on search query
  const filteredMovies = movies.filter(movie =>
    movie.Title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  
  const visibleCount = 6;
  const totalMovies = filteredMovies.length;

  // Wrap around logic
  let start = currentIndex.value;
  let end = start + visibleCount;

  if (end <= totalMovies) {
    return filteredMovies.slice(start, end);
  } else {
    return [
      ...filteredMovies.slice(start, totalMovies),
      ...filteredMovies.slice(0, end % totalMovies)
    ];
  }
});

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1;
  } else {
    currentIndex.value = movies.length - 1;
  }
};

const nextSlide = () => {
  if (currentIndex.value < movies.length - 1) {
    currentIndex.value += 1;
  } else {
    currentIndex.value = 0;
  }
};

//TRENDING // Functions for navigating through movies and trending movies
// Adjust the visibleMovies to handle wrapping logic.



// Adjust the visibleTrend to handle wrapping logic.
const visibleTrend = computed(() => {
  const filteredMovies = movies.filter(movie =>
    movie.Title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  
  const visibleCount = 6;
  const totalMovies = filteredMovies.length;

  // Wrap around logic
  let start = currentTrendIndex.value;
  let end = start + visibleCount;

  if (end <= totalMovies) {
    return filteredMovies.slice(start, end);
  } else {
    return [
      ...filteredMovies.slice(start, totalMovies),
      ...filteredMovies.slice(0, end % totalMovies)
    ];
  }
});

const nextTrendSlide = () => {
  if (currentTrendIndex.value < movies.length - 1) {
    currentTrendIndex.value++;
  } else {
    currentTrendIndex.value = 0;
  }
};

const prevView = () => {
  if (currentTrendIndex.value > 0) {
    currentTrendIndex.value--;
  } else {
    currentTrendIndex.value = movies.length - 1;
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
.animate__animated animate__slideInLeft,.animate__animated animate__slideOutLeft{
  /* animation-duration: 0.5s; */
}
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
/* this is style for the search icon at Nav */
.searchBox{
  background:rgba(255, 0, 0, 0.553);
  cursor:pointer;
  display:flex;
  align-items: center;
  padding:6px;
  border-radius:3px;
}

.searchBox:hover input{
  width:300px;
 
}
.searchBox input{
  width:0;
  border:none;
  outline:none;
  transition:0.3s;
  background:transparent;
}
.searchBox input::placeholder{
  color:#ffffff;
}
/* this is end style for the search icon at Nav */
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
  transition:transform 0.5s ease;
  scroll-behavior: smooth;
}

.carousel-inner img{
  width:300px;
 
}

.carousel-slide {
  flex: 0 0 auto;
  margin-right: 10px;
}
.carousel-slide:target{
  border-color:red;
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
  overflow: hidden;
}

.prev,
.next {
  cursor: pointer;
  position:absolute;
  height: 50px;
  top: calc(50% - 20px);
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
.fade img{
  width:300px;
}



@media only screen and (max-width: 1024px){
   
  .banner{
    height:60vh;
    gap:0rem;
  }
  .leftText p {
    max-width: 400px;
  }
  .play , .moreInfo{
    height:3.5vh;
  }
  /* .prev,.next{
  top:107%;
  /* transform: translateY(-150%); 
} */
}

@media only screen and (max-width: 820px){
  /* .prev,.next{
  top:107%;
 
} */
}
@media only screen and (max-width: 768px){
  .banner{
    height:60vh;
    gap:0rem;
  }
  .leftText h2 {
    font-size: 55px;
    line-height: 60px;
  }
  .leftText p {
    max-width: 400px;
  }
  .trend{
    padding-bottom:290px;
  }
/* .prev,.next{
  top:115%;
  transform: translateY(-150%);
} */

}
@media only screen and (max-width: 600px){
	/*Big smartphones [426px -> 600px]*/
  .play , .moreInfo{
    height:5vh;
  }
  .leftText {
    padding: 0 3rem;
}
.carousel-inner img{
  max-width:150px;
}
.trend{
    padding-bottom:190px;
  }
/* .prev,.next{
  top:120%;
} */
}

@media only screen and (max-width: 425px){
	/*Small smartphones [325px -> 425px]*/
  .banner{
    height:50vh;
    background-blend-mode: overlay;
  }
  .leftText h2 {
    font-size: 45px;
    line-height: 60px;
  }
  .trend{
    padding-bottom:100px;
  }
  .carousel-inner img{
  max-width:150px;
}
/* .prev,.next{
  top:120%;
} */

}


@media only screen and (max-width:360px){
  .trend{
    padding-bottom:100px;
  }

/* .prev,.next{
  top:135%;
} */
.carousel-inner img{
  max-width:150px;
}
}
</style>

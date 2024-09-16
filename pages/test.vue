<template>
       <div>
<!-- NEW RELEASE CAROUSEL -->
<div class="carousel">
  <h2>New Releases</h2>
  
  <div class="carousel-inner">
    <div v-for="(group, index) in groupedMovies" :key="index" class="carousel-slide-group">
      <div v-for="movie in group" :key="movie.imdbID" class="carousel-slide">
        <NuxtLink :to="`/details/${movie.imdbID}`">
          <img :src="movie.Poster" alt="Movie Poster" />
        </NuxtLink>
      </div>
    </div>
  </div>
  
  <button class="left" @click="prevSlide">
    <img src="../images/arrow_back.svg" alt="prev" />
  </button>
  <button class="right" @click="nextSlide">
    <img src="../images/arrow-next.svg" alt="next" />
  </button>
</div>


       </div>
</template>

<script setup>
import movies from "../store/movies.json";
const groupedMovies = computed(() => {
  const groups = [];
  for (let i = 0; i < movies.length; i += 5) {
    groups.push(movies.slice(i, i + 5));
  }
  return groups;
});

const currentGroupIndex = ref(0);

const nextSlide = () => {
  const carouselInner = document.querySelector('.carousel-inner');
  const slideWidth = carouselInner.clientWidth; // Width of one group of slides
  carouselInner.scrollBy({ left: slideWidth, behavior: 'smooth' });

  currentGroupIndex.value = (currentGroupIndex.value + 1) % groupedMovies.value.length;
};

const prevSlide = () => {
  const carouselInner = document.querySelector('.carousel-inner');
  const slideWidth = carouselInner.clientWidth; // Width of one group of slides
  carouselInner.scrollBy({ left: -slideWidth, behavior: 'smooth' });

  currentGroupIndex.value = (currentGroupIndex.value - 1 + groupedMovies.value.length) % groupedMovies.value.length;
};

</script>

<style scoped>
.carousel-inner {
  display: flex;
  overflow-x: hidden;
}

.carousel-slide-group {
  display: flex;
  flex-shrink: 0;
  width: 100%; /* Adjust this based on your layout */
}

.carousel-slide {
  flex: 1;
}

</style>
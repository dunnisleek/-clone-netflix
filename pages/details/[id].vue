<template>
  <header>
    <nav>
      <NuxtLink to="/">
        <div>
          <img src="/images/arrow-back.svg" alt="arrow-back" />
        </div>
      </NuxtLink>

      <div>
        <img src="/images/share.svg" alt="share" />
        <img src="/images/search.svg" alt="search" />
      </div>
    </nav>
  </header>

  <div class="content-wrap">
    <div class="section">
      <img class="posterbg" :src="movie.Poster" alt="" />
    </div>
    <div class="section contentbox">
      <h2>{{ movie.Title }}</h2>
      <div>
        <p class="ratingGreen">{{ movie.imdbRating }} Match</p>
        <p>{{ movie.Year }}</p>
        <p>{{ movie.Runtime }}</p>
      </div>
      <p class="plot-para">{{ movie.Plot }}</p>
      <h4>Director: {{ movie.Director }}</h4>

      <div class="socialicons">
        <span><img src="/images/add-icon.svg" alt="add" /> My List </span>
        <span><img src="/images/thumb_up.svg" alt="rate" /> Rate </span>
        <span>
          <img src="/images/download.icon.svg" alt="download" /> Download
        </span>
      </div>
    </div>
  </div>

  <!-- RELATED MOVIES -->
  <div class="related-movie">
    <div>
    <h2>
      More Like :  {{ movie.Title }}
    </h2>
  </div>
    <!-- display movies -->
    <div class="relatedflex">
    <div v-for="relatedMovie in newMovies" :key="relatedMovie.imdbID" class="related-movie-item">
      <NuxtLink :to="`${relatedMovie.imdbID}`"><img :src="relatedMovie.Poster" alt=""/>
      </NuxtLink>
   </div>
</div>
  </div>
</template>

<script>
import movies from "../../store/movies.json";


export default {
  data(){
    return{
      // THIS IS FOR THE RELATED MOVIES DISPLAY
      newMovies :movies
    }
  },
  computed: {
    movie() {
      // return movies[this.$route.params.id];
      const movieId = this.$route.params.id;
      // Find the movie by IMDb ID
      return movies.find(movie => movie.imdbID === movieId);
    }
  }
 
};
</script>
<style scoped>
header {
  background: #000000;
  height: 7vh;
  margin-top: -1rem;
  align-content: center;
  align-items: center;
}
nav {
  display: flex;
  
}
nav div{
  gap:20px;
}
.content-wrap{
  display: flex;
  gap: 40px;
  margin: 0;
}
.section {
  flex: 1;
}
.posterbg {
  object-fit: cover;
  width: 100%;
  height: 70vh;
}
.contentbox {
  display: flex;
  flex-direction: column;
  padding-top: 7rem;
  gap:20px;
}
.contentbox h2 {
  font-size: 40px;
}
.contentbox div{
  display: flex;
  gap:20px;
}
.ratingGreen {
  color: rgb(8, 251, 8);
}
.plot-para {
  max-width: 600px;
}
.socialicons {
  display: flex;
  padding-top: 4rem;
  gap: 5rem;
}
.socialicons span {
  color: #989898;
}

.related-movie{
  padding:20px 30px;
  /* display: flex;
  flex-direction: column; */
}
.related-movie h2{
  font-size:25px;
  padding-bottom:20px;
}
.relatedflex{
  display:flex;
  flex-wrap:wrap;/* Allow items to wrap to next line */
  gap:20px;
 
}

.related-movie-item{

}
</style>

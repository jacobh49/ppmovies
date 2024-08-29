const apiKey = "853c77bd76b2772ab88ab049ad08d610";

async function getpopular() {
   const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

   try {
      const response = await fetch(url);
      const data = await response.json();
      displaypopular(data.results);
   } catch (error) {
      console.error('Error fetching popular movies:', error);
   }
}

function displaypopular(movies) {
   const popularDiv = document.getElementById('popular');
   popularDiv.innerHTML = '';
   movies.forEach(movie => {
      popularDiv.innerHTML += `
            <div class="movie" onclick="embedMovie('${movie.id}')">
                <h2>${movie.title}</h2>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster">
            </div>
        `;
   });
}

function embedMovie(movieId) {
   const embedUrl = `https://moviesapi.club/movie/${movieId}`;
   const player = document.getElementById('player');
   const overlay = document.getElementById('dicknballs');

   player.src = embedUrl;
   overlay.style.display = 'flex';
}

function closeOverlay() {
   const overlay = document.getElementById('dicknballs');
   overlay.style.display = 'none';
   document.getElementById('player').src = ''; // stop video
}

// load popular movies when page loads
getpopular();

async function searchMovie() {
   const movie = document.getElementById('movie').value;
   const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movie)}`;

   try {
      const response = await fetch(url);
      const data = await response.json();
      hidepopular();
      displayResults(data.results);
   } catch (error) {
      console.error('Error fetching data:', error);
   }
}

function hidepopular() {
   const popularDiv = document.getElementById('popular');
   popularDiv.style.display = 'none';
}

function displayResults(movies) {
   const resultsDiv = document.getElementById('results');
   resultsDiv.innerHTML = ''; // clear previous
   resultsDiv.style.display = 'grid'; // grid check

   movies.forEach(movie => {
      resultsDiv.innerHTML += `
            <div class="movie" onclick="embedMovie('${movie.id}')">
                <h2>${movie.title}</h2>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster">
            </div>
        `;
   });
}
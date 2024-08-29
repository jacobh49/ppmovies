const apiKey = "853c77bd76b2772ab88ab049ad08d610";

async function getpopular() {
   const url = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`;

   try {
      const response = await fetch(url);
      const data = await response.json();
      displaypopular(data.results);
   } catch (error) {
      console.error('Error fetching popular TV shows:', error);
   }
}

function displaypopular(shows) {
   const popularDiv = document.getElementById('popular');
   popularDiv.innerHTML = '';
   shows.forEach(show => {
      popularDiv.innerHTML += `
            <div class="movie" onclick="embedMovie('${show.id}')">
                <h2>${show.name}</h2>
                <img src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${show.name} poster">
            </div>
        `;
   });
}

function embedMovie(showId) {
   const embedUrl = `https://autoembed.cc/embed/tv/${showId}`;
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

// load popular TV shows when page loads
getpopular();

async function searchMovie() {
   const show = document.getElementById('movie').value;
   const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(show)}`;

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

function displayResults(shows) {
   const resultsDiv = document.getElementById('results');
   resultsDiv.innerHTML = ''; // clear previous
   resultsDiv.style.display = 'grid'; // grid check

   shows.forEach(show => {
      resultsDiv.innerHTML += `
            <div class="movie" onclick="embedMovie('${show.id}')">
                <h2>${show.name}</h2>
                <img src="https://image.tmdb.org/t/p/w500${show.poster_path}" alt="${show.name} poster">
            </div>
        `;
   });
}

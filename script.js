const apiKey = "853c77bd76b2772ab88ab049ad08d610";
console.log(apiKey)

async function searchMovie() {
    const movieName = document.getElementById('movieName').value;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayResults(data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function displayResults(movies) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    movies.forEach(movie => {
        resultsDiv.innerHTML += `
             <div class="movie" onclick="embedMovie('${movie.id}')">
                 <h2>${movie.title} (${movie.release_date})</h2>
                 <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} poster">
             </div>
         `;
    });
}

function embedMovie(movieId) {
    const embedUrl = `https://moviesapi.club/movie/${movieId}`;
    const videoPlayer = document.getElementById('videoPlayer');
    const overlay = document.getElementById('fullScreenOverlay');

    videoPlayer.src = embedUrl;
    overlay.style.display = 'flex';
}

function closeOverlay() {
    const overlay = document.getElementById('fullScreenOverlay');
    overlay.style.display = 'none';
    document.getElementById('videoPlayer').src = ''; // Stop the video
}
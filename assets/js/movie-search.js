var searchMethod = localStorage.getItem("search-use");
if (searchMethod === "search-button") {
    displayMovieSearch();
} else {
    displayGenreSearch();
}




function displayGenreSearch() {
    var resultList = document.querySelector(".movie-search-result");
    // Clears any pre-existing text
    resultList.innerHTML = ""

    var genreSearchResults = JSON.parse(localStorage.getItem("genre-search")).results;
    console.log(genreSearchResults)
    console.log(genreSearchResults.length)

    // Runs for loop of all available data
    for (var i = 0; i < genreSearchResults.length; i++) {
        var movieId = genreSearchResults[i]
        // Checks for picture, skips movie if not available
        if (movieId.poster_path === null) {
            continue;
        }

        movie = document.createElement("section")
        movie.setAttribute("class", "search-display column is-6");
        resultList.appendChild(movie);

        movieTitle = document.createElement("h3");
        moviePoster = document.createElement("img");

        movieTitle.textContent = movieId.title;
        moviePoster.src = "https://image.tmdb.org/t/p/w500" + movieId.poster_path;

        movie.appendChild(movieTitle);
        movie.appendChild(moviePoster);
    }
}

function displayMovieSearch() {
    var resultList = document.querySelector(".movie-search-result");
    // Clears any pre-existing text
    resultList.innerHTML = ""

    var movieSearchResults = JSON.parse(localStorage.getItem("movie-search"));
    console.log(movieSearchResults)
    console.log(movieSearchResults.length)

    // Runs for loop of all available data
    for (var i = 0; i < movieSearchResults.length; i++) {
        var movieId = movieSearchResults[i]
        // Checks for picture, skips movie if not available
        if (movieId.poster_path === null) {
            continue;
        }

        movie = document.createElement("section")
        movie.setAttribute("class", "search-display column is-6");
        resultList.appendChild(movie);

        movieTitle = document.createElement("h3");
        moviePoster = document.createElement("img");

        movieTitle.textContent = movieId.title;
        moviePoster.src = "https://image.tmdb.org/t/p/w500" + movieId.poster_path;

        movie.appendChild(movieTitle);
        movie.appendChild(moviePoster);
    }

}

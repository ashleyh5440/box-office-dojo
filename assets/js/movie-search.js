
// Checks which method was used to search before running the appropriate function
var searchMethod = localStorage.getItem("search-use");
if (searchMethod === "search-button") {
    displayMovieSearch();
} else {
    displayGenreSearch();
}

// Displays searched movies from a genre button
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

        // Creates new element for each movie and adds a title and the movie poster
        movie = document.createElement("section")
        movie.setAttribute("class", "search-display column is-6");
        resultList.appendChild(movie);

        movieTitle = document.createElement("h3");
        movieLink = document.createElement("a");
        moviePoster = document.createElement("img");

        movieTitle.textContent = movieId.title;
        moviePoster.src = "https://image.tmdb.org/t/p/w500" + movieId.poster_path;
        moviePoster.value = movieId.id
        moviePoster.setAttribute("class", "movie-poster")
        console.log(moviePoster.value)

        movie.appendChild(movieTitle);
        movie.appendChild(movieLink)
        movieLink.appendChild(moviePoster);
    }

    // Uses JQuery for event delegation
    $(resultList).on("click", ".movie-poster", displayMovieDetails);
}

// Displays searched movies from search bar input
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

        // Creates new element for each movie and adds a title and the movie poster
        movie = document.createElement("section")
        movie.setAttribute("class", "search-display column is-6");
        resultList.appendChild(movie);

        movieTitle = document.createElement("h3");
        movieLink = document.createElement("a");
        moviePoster = document.createElement("img");

        movieTitle.textContent = movieId.title;
        moviePoster.src = "https://image.tmdb.org/t/p/w500" + movieId.poster_path;
        moviePoster.value = movieId.id
        moviePoster.setAttribute("class", "movie-poster")

        movie.appendChild(movieTitle);
        movie.appendChild(movieLink);
        movieLink.appendChild(moviePoster);
    }

    // Uses JQuery for event delegation
    $(resultList).on("click", ".movie-poster", displayMovieDetails);
}

// Displays details of individually selected movies
function displayMovieDetails(event) {

    var resultList = document.querySelector(".movie-search-result");

    // Grabs ID for API use while it still exists
    var searchResultsId = event.target.value;
    console.log(moviePoster.value)
    // Clears any pre-existing text
    resultList.innerHTML = ""
   
    getMovieDetailsUrl = "https://api.themoviedb.org/3/movie/" + searchResultsId + "?language=en-us&region=US&api_key=f73119f46966c54d15a0614dc6b82103"
    fetch(getMovieDetailsUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        // Creates section on left for poster and title
        movie = document.createElement("section");
        movie.setAttribute("class", "search-display column is-6");
        resultList.appendChild(movie);
    
        movieTitle = document.createElement("h3");
        moviePoster = document.createElement("img");
    
        movieTitle.textContent = data.title;
        moviePoster.src = "https://image.tmdb.org/t/p/w500" + data.poster_path;
        moviePoster.setAttribute("class", "movie-poster");
        moviePoster.value = data.id
    
        movie.appendChild(movieTitle);
        movie.appendChild(moviePoster);

        // Creates section on right for movie details
        movieDetail = document.createElement("section");
        movieDetail.setAttribute("class", "search-display column is-6");
        resultList.appendChild(movieDetail);

        movieSummary = document.createElement("p");
        movieTime = document.createElement("p");
        addBtn = document.createElement("button");

        movieSummary.textContent = data.overview;
        movieTime.textContent = data.runtime + " minutes";
        
        addBtn.textContent = "+ Add to Watch List";
        addBtn.setAttribute("id", "add-button");

        movieSummary.setAttribute("color", "white");

        movieDetail.appendChild(movieSummary);
        movieDetail.appendChild(movieTime);
        movieDetail.appendChild(addBtn)

        // Uses JQuery for event delegation
        $(resultList).on("click", "#add-button", addToList);

        // Insert GIPHY addition below in new appended section

    })
}

// Gets streaming services for movies
function getStreamingServices() {
    var streamingServices = "https://api.themoviedb.org/3/movie/{movie_id}/watch/providers?api_key=f73119f46966c54d15a0614dc6b82103"

    streamingServices = "https://api.themoviedb.org/3/movie/11/watch/providers?api_key=f73119f46966c54d15a0614dc6b82103"
    fetch(streamingServices)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
}

// Adds movie to watch list
function addToList() {
    // Creates empty array for movie list
    var movieList = []

    movieList = movieList.concat(JSON.parse(localStorage.getItem("watch-list")));

    // Removes null element
    if (movieList[0] === null) {
        movieList.pop();
    }

    // Ensures the same movie cannot be added multiple times 
    if (movieList.includes(movieTitle.textContent)) {
        return;
    }

    movieList.unshift(movieTitle.textContent);
  

    localStorage.setItem("watch-list", JSON.stringify(movieList));
}
var searchMovieUrl = "https://api.themoviedb.org/3/search/movie?query=star+wars&api_key=f73119f46966c54d15a0614dc6b82103"
var getMovieDetailsUrl = "https://api.themoviedb.org/3/movie/9479?api_key=f73119f46966c54d15a0614dc6b82103"
var searchGenreUrl = "https://api.themoviedb.org/3/discover/movie?genre={genre-name}&api_key=f73119f46966c54d15a0614dc6b82103"
var genreListUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=f73119f46966c54d15a0614dc6b82103"

getGenreList();
setGenreBtns();

var submitButton = document.querySelector(".submitBtn");
var movieInput = document.querySelector("#movieInput");

submitButton.addEventListener("click", searchMovie);
// Searches for movie based on user text input
function searchMovie() {
    searchMovieUrl =  "https://api.themoviedb.org/3/search/movie?query=" + movieInput.value + "&language=en-us&region=US&api_key=f73119f46966c54d15a0614dc6b82103"
    fetch(searchMovieUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // Logs details for all possible listings of the searched movie
            searchResults = []
            for (var i = 0; i < data.results.length; i++) {
                // console.log(data.results[i].id);
                console.log(data.results[i].original_title);
                searchResultsId = data.results[i].id;
                searchResults.push(data.results[i]);
                localStorage.setItem("movie-search", JSON.stringify(searchResults));
                // Moves to movie search page
                window.location.href = "movie-search.html"
            }
            
        })
}

// Gets specific details for individual movies to be used later
function getMovieDetails() {
    getMovieDetailsUrl = "https://api.themoviedb.org/3/movie/" + searchResultsId + "?language=en-us&region=US&api_key=f73119f46966c54d15a0614dc6b82103"
    fetch(getMovieDetailsUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

    })
}

// Sets values for genre buttons and adds click event listeners
function setGenreBtns() {
    //Selects individual genre buttons
    var horrorBtn = document.querySelector("#horror");
    var actionBtn = document.querySelector("#action");
    var comedyBtn = document.querySelector("#comedy");
    var romanceBtn = document.querySelector("#romance");
    var historyBtn = document.querySelector("#historical");
    var sciBtn = document.querySelector("#sci-fi");
    var fantasyBtn = document.querySelector("#fantasy");
    var thrillerBtn = document.querySelector("#thriller");

    // Prevents error when navigating to a page without genre buttons
    if (horrorBtn) {
        // Assigns genre buttons values to match IMDB API
        horrorBtn.value = 27;
        actionBtn.value = 28;
        comedyBtn.value = 35;
        romanceBtn.value = 10749;
        historyBtn.value = 36;
        sciBtn.value = 878;
        fantasyBtn.value = 14; 
        thrillerBtn.value = 53;

        // Selects all genre buttons to apply an event listener to each
        var genreButtons = [
            horrorBtn,
            actionBtn,
            comedyBtn,
            romanceBtn,
            historyBtn,
            sciBtn,
            fantasyBtn,
            thrillerBtn,
        ]
        // Processes above array to allow each button to search for movies in its genre
        for (var i = 0; i < genreButtons.length; i++) {
            console.log(genreButtons[i].value)
            genreButtons[i].addEventListener("click", searchGenre)
        }
    }
}

// Gets movies by genre
function searchGenre(event) {
    console.log(event.target.value)
    searchGenreUrl = "https://api.themoviedb.org/3/discover/movie?with_genres=" + event.target.value + "&language=en-us&api_key=f73119f46966c54d15a0614dc6b82103"
    console.log(searchGenreUrl)
    fetch(searchGenreUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            localStorage.setItem("genre-search", JSON.stringify(data));
            // Moves to movie search page
            window.location.href = "movie-search.html"
        })
    }

// Console logs genres by id in IMDB, useful for assigning values to buttons
function getGenreList() {
    fetch(genreListUrl)        
    .then(function (response) { 
         return response.json();
    })
    .then(function (data) {
            console.log(data);
        })
}

var searchMovieUrl = "https://api.themoviedb.org/3/search/movie?query=star+wars&api_key=f73119f46966c54d15a0614dc6b82103"
var getMovieDetailsUrl = "https://api.themoviedb.org/3/movie/9479?api_key=f73119f46966c54d15a0614dc6b82103"

var submitButton = document.querySelector(".submitBtn");
var movieInput = document.querySelector("#movieInput");

submitButton.addEventListener("click", searchMovie);
// Searches for movie based on user text input
function searchMovie() {
    searchMovieUrl =  "https://api.themoviedb.org/3/search/movie?query=" + movieInput.value + "&api_key=f73119f46966c54d15a0614dc6b82103"
    fetch(searchMovieUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // Logs details for all possible listings of the searched movie
            for (var i = 0; i < data.results.length; i++) {
                console.log(data.results[i].id);
                console.log(data.results[i].original_title);
                searchResultsId = data.results[i].id;
                getMovieDetails();
            }
            
        })
}

// Gets specific details for individual movies to be used later
function getMovieDetails() {
    getMovieDetailsUrl = "https://api.themoviedb.org/3/movie/" + searchResultsId + "?api_key=f73119f46966c54d15a0614dc6b82103"
    fetch(getMovieDetailsUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
}
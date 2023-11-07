var searchMovieUrl = "https://api.themoviedb.org/3/search/movie?query=star+wars&api_key=f73119f46966c54d15a0614dc6b82103"
var getMovieDetailsUrl = "https://api.themoviedb.org/3/movie/9479?api_key=f73119f46966c54d15a0614dc6b82103"
var searchGenreUrl = "https://api.themoviedb.org/3/discover/movie?genre={genre-name}&api_key=f73119f46966c54d15a0614dc6b82103"
var genreListUrl = "https://api.themoviedb.org/3/genre/movie/list?api_key=f73119f46966c54d15a0614dc6b82103"
console.log ('main.js')
// Creates empty array to fill with previously searched items, placed outside functions to avoid errors
var previousSearches = []

// Sets up genre buttons for use
getGenreList();
setGenreBtns();

// Sets up previous search list for use
previousSearchInit();

var submitButton = document.querySelector(".submitBtn");
var movieInput = document.querySelector("#movieInput");
var movieListBtn = document.querySelector("#movieListBtn");
var homeBtn = document.querySelector("#homeBtn");

submitButton.addEventListener("click", searchMovie);
movieListBtn.addEventListener("click", moveToList);
homeBtn.addEventListener("click", returnToHomepage);

// Searches for movie based on user text input
function searchMovie() {

    saveSearch();
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
                localStorage.setItem("search-use", "search-button")
                // Moves to movie search page
                window.location.href = "movie-search.html"
                
                function searchMovie() {   // Added search movie function for Gifs 
                    const movieSearch = movieInput.value;
                 
                }
                getMovieGifs(movieInput.value);
            }
            
        })
        // Add gif to search page
        function getMovieGifs(movieSearch) {
            const giphyAPIkey = "V8wtjZi02K8tx51xGg58yNZGR4KH1g89";
            const searchGiphyURL = "https://api.giphy.com/v1/gifs/search?api_key=" + giphyAPIkey + "&q=" + movieSearch + "+movie&limit=8&offset=0&rating=pg-13&lang=en&bundle=messaging_non_clips";
            
            fetch(searchGiphyURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                   
                    const giphyDiv = document.querySelector(".giphy");
                    giphyDiv.innerHTML = "";
                    for (var i = 0; i < data.data.length; i++) {
                        const gifUrl = data.data[i].images.downsized_medium.url;
                        const gifImg = document.createElement("img");
                        gifImg.src = gifUrl;
                        giphyDiv.appendChild(gifImg);
                    }
                });
        }
        
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
    var horrorBtnM = document.querySelector("#horror-mobile");
    var actionBtnM = document.querySelector("#action-mobile");
    var comedyBtnM = document.querySelector("#comedy-mobile");
    var romanceBtnM = document.querySelector("#romance-mobile");
    var historyBtnM = document.querySelector("#historical-mobile");
    var sciBtnM = document.querySelector("#sci-fi-mobile");
    var fantasyBtnM = document.querySelector("#fantasy-mobile");
    var thrillerBtnM = document.querySelector("#thriller-mobile");

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
        horrorBtnM.value = 27;
        actionBtnM.value = 28;
        comedyBtnM.value = 35;
        romanceBtnM.value = 10749;
        historyBtnM.value = 36;
        sciBtnM.value = 878;
        fantasyBtnM.value = 14; 
        thrillerBtnM.value = 53;

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
            horrorBtnM,
            actionBtnM,
            comedyBtnM,
            romanceBtnM,
            historyBtnM,
            sciBtnM,
            fantasyBtnM,
            thrillerBtnM,
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
    searchGenreUrl = "https://api.themoviedb.org/3/discover/movie?with_genres=" + parseInt(event.target.value) + "&language=en-us&api_key=f73119f46966c54d15a0614dc6b82103"
    console.log(searchGenreUrl)
    fetch(searchGenreUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            localStorage.setItem("genre-search", JSON.stringify(data));
            localStorage.setItem("search-use", "genre-button");
            // Moves to movie search page
            window.location.href = "movie-search.html"
        })
    }

// Console logs genres by id in TMDB, useful for assigning values to buttons
function getGenreList() {
    fetch(genreListUrl)        
    .then(function (response) { 
         return response.json();
    })
    .then(function (data) {
            console.log(data);
        })
}

// Initial function for starting the previous search display
function previousSearchInit() {
    previousSearches = previousSearches.concat(JSON.parse(localStorage.getItem("previous-searches")));

    // Keeps previous search length limited to 5
    if (previousSearches.length > 5) {
        previousSearches.pop();
        localStorage.setItem("previous-searches", JSON.stringify([previousSearches]));
    }

    // Ensures blank elements won't be created with empty array when no titles have been searched yet
    if (previousSearches[0] !== null) {
        renderPreviousSearch();
    }

}

// For displaying array of previously searched movies
function renderPreviousSearch() {
    var previousSearchList = document.querySelector("#previousSearchesList");

    // Clears any preexisting text from list
    previousSearchesList.innerHTML = "";
    
    // Creates list items for each previously searched movie, sets class and text and appends to list
    for (var i = 0; i < previousSearches.length; i++) {
       
        var previousSearchItem = document.createElement("li");
        
        previousSearchItem.setAttribute("class", "previous-search-item");
        previousSearchItem.textContent = previousSearches[i];
        
        previousSearchList.appendChild(previousSearchItem);
    }
}

// For saving new searched movies to local storage
function saveSearch() {
    // Ensures data is present within text field
    if (movieInput.value === "") {
        return;
    }

    // Removes null element from an empty array when first movie is searched and saved
    if (previousSearches[0] === null) {
        previousSearches.pop();
    }

    // Adds newly searched movie to front of array
    previousSearches.unshift(movieInput.value);

    // Limits array length to 5
    if (previousSearches.length > 5) {
        previousSearches.pop();
    }
    
    // Saves and refreshes previous search list
    localStorage.setItem("previous-searches", JSON.stringify(previousSearches));
    renderPreviousSearch();
}

// For using the movie list button to travel to the movie list page
function moveToList() {
    window.location.href = "movie-list.html";
}

// For returning to homepage
function returnToHomepage() {
    window.location.href = "index.html";
}
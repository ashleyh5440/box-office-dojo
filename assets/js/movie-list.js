
var movieList = document.querySelector("#userMovieList");
var movieListM = document.querySelector("#userMovieListMobile")
movieListInit();
movieListMobileInit();


function movieListInit() {
    // Creates empty array for the start
    var movieTitles = [];
    movieTitles = movieTitles.concat(JSON.parse(localStorage.getItem("watch-list")));

    // Ensures blank elements won't be created with empty array when no titles have been searched yet
    if (movieTitles[0] === null) {
        return;
    }

    for (var i = 0; i < movieTitles.length; i++) {
       
        var movieTitle = document.createElement("li");
        var movieButton = document.createElement("button");
        
        movieTitle.setAttribute("class", "movie-title");
        movieButton.textContent = movieTitles[i].title;
        movieButton.setAttribute("class", "button movie-title-btn");
        movieButton.setAttribute("value", movieTitles[i].id);

        movieTitle.appendChild(movieButton);
        movieList.appendChild(movieTitle);
    }

    // Uses JQuery to add event listeners to each button allowing movie to be searched
    $(movieList).on("click", ".movie-title-btn", function(event){
        console.log(event.target.textContent);
        searchMovieUrl =  "https://api.themoviedb.org/3/movie/" + event.target.value + "?language=en-us&region=US&api_key=f73119f46966c54d15a0614dc6b82103"
        console.log(event.target.value)
        fetch(searchMovieUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // Grabs ID for API use
                searchResult = data.id;
                localStorage.setItem("movie-search", JSON.stringify(searchResult));
                localStorage.setItem("search-use", "movie-button")
                // Moves to movie search page
                window.location.href = "movie-search.html"
                
                
            })
    })
}

function movieListMobileInit() {
    // Creates empty array for the start
    var movieTitles = [];
    movieTitles = movieTitles.concat(JSON.parse(localStorage.getItem("watch-list")));

    // Ensures blank elements won't be created with empty array when no titles have been searched yet
    if (movieTitles[0] === null) {
        return;
    }

    for (var i = 0; i < movieTitles.length; i++) {
       
        var movieTitle = document.createElement("li");
        var movieButton = document.createElement("button");
        
        movieTitle.setAttribute("class", "movie-title");
        movieButton.textContent = movieTitles[i].title;
        movieButton.setAttribute("class", "button movie-title-btn");
        movieButton.setAttribute("value", movieTitles[i].id);

        movieTitle.appendChild(movieButton);
        movieListM.appendChild(movieTitle);
    }

    // Uses JQuery to add event listeners to each button allowing movie to be searched
    $(movieListM).on("click", ".movie-title-btn", function(event){
        console.log(event.target.textContent);
        searchMovieUrl =  "https://api.themoviedb.org/3/movie/" + event.target.value + "?language=en-us&region=US&api_key=f73119f46966c54d15a0614dc6b82103"
        console.log(event.target.value)
        fetch(searchMovieUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // Grabs ID for API use
                searchResult = data.id;
                localStorage.setItem("movie-search", JSON.stringify(searchResult));
                localStorage.setItem("search-use", "movie-button")
                // Moves to movie search page
                window.location.href = "movie-search.html"
                
                
            })
    })
}
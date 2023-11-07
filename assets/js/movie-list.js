
var movieList = document.querySelector("#userMovieList");
movieListInit();


function movieListInit() {
    // Creates empty array for the start
    var movieTitles = [];
    movieTitles = movieTitles.concat(JSON.parse(localStorage.getItem("watch-list")));

    // Ensures blank elements won't be created with empty array when no titles have been searched yet
    if (previousSearches[0] !== null) {
        renderPreviousSearch();
    }

    for (var i = 0; i < movieTitles.length; i++) {
       
        var movieTitle = document.createElement("li");
        var movieButton = document.createElement("button");
        
        movieTitle.setAttribute("class", "movie-title");
        movieButton.textContent = movieTitles[i];
        movieButton.setAttribute("class", "button");

        movieTitle.appendChild(movieButton);
        movieList.appendChild(movieTitle);
    }


}
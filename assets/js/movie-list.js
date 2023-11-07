
var movieList = document.querySelector("#userMovieList");
movieListInit();


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
        movieButton.textContent = movieTitles[i];
        movieButton.setAttribute("class", "button movie-title-btn");

        movieTitle.appendChild(movieButton);
        movieList.appendChild(movieTitle);
    }

    // Uses JQuery to add event listeners to each button
    $(movieList).on("click", ".movie-title-btn", function(event){
        console.log(event.target.textContent);
        searchMovieUrl =  "https://api.themoviedb.org/3/search/movie?query=" + event.target.textContent + "&language=en-us&region=US&api_key=f73119f46966c54d15a0614dc6b82103"
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
                }
                
            })
    })
}


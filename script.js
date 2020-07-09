let wholeContainer = document.querySelector(".wholeContainer");
let searchBar = document.querySelector("#searchBar");

let searchButton = document.querySelector("#searchButton");
let nextButton = document.querySelector("#nextButton");
let previousButton = document.querySelector("#previousButton");

let page = 1;
let pageTracker = 0;

nextButton.addEventListener("click", buttonHandler);
previousButton.addEventListener("click", buttonHandler);
searchButton.addEventListener("click", buttonHandler);

searchBar.addEventListener("keydown", buttonHandler);

function buttonHandler(e) {
  console.log(e.key);
  if (e.target === nextButton) {
    if (pageTracker === page) {
      page++;
    }
    fetchMovies(page);
    page++;
  } else if (e.target === previousButton) {
    // console.log(page, pageTracker);
    page = pageTracker - 1;
    fetchMovies(page);
  } else if (e.target === searchButton || e.key) {
    page = 1;
    fetchMovies(page);
  }
}

function fetchMovies(p) {
  pageTracker = p;
  wholeContainer.innerHTML = " ";
  fetch(
    `http://www.omdbapi.com/?s=${searchBar.value}&page=${p}&apikey=4704e665`
  )
    .then((r) => {
      return r.json();
    })
    .then((resp) => {
      let Movies = resp.Search;
      createCards(Movies);
    });
}

function createCards(movies) {
  for (let movie of movies) {
    let movieDiv = document.createElement("div");
    let imgDiv = document.createElement("div");
    let titleDiv = document.createElement("div");
    let yearDiv = document.createElement("div");
    let typeDiv = document.createElement("div");
    let img = document.createElement("img");

    if (movie.Poster == "N/A") {
      img.src = "no-image-icon.jpg";
    } else {
      img.src = movie.Poster;
    }

    img.width = 300;
    titleDiv.textContent = movie.Title;
    if (movie.Type == "series") {
      yearDiv.textContent = `Aired: ${movie.Year}`;
    } else {
      yearDiv.textContent = `Released: ${movie.Year}`;
    }

    typeDiv.textContent = movie.Type;
    movieDiv.className = "movieDiv";

    imgDiv.appendChild(img);
    movieDiv.appendChild(imgDiv);
    movieDiv.appendChild(titleDiv);
    movieDiv.appendChild(yearDiv);
    movieDiv.appendChild(typeDiv);
    wholeContainer.appendChild(movieDiv);
  }
}

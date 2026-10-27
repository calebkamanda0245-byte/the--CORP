
const movies = [
  {
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    rating: 8.8,
    duration: "2h 28m",
    image: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    description: "A skilled thief enters people's dreams to steal secrets and is offered an unusual mission that could change everything."
  },
  {
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi",
    rating: 8.7,
    duration: "2h 49m",
    image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    description: "A team of explorers travels beyond Earth in search of a future for humanity."
  },
  {
    title: "Dune",
    year: 2021,
    genre: "Adventure",
    rating: 8.0,
    duration: "2h 35m",
    image: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    description: "A young nobleman travels to a dangerous desert planet where his family's future and a powerful resource collide."
  },
  {
    title: "The Batman",
    year: 2022,
    genre: "Action",
    rating: 7.8,
    duration: "2h 56m",
    image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    description: "A detective known as Batman investigates corruption and a series of mysterious crimes in Gotham City."
  },
  {
    title: "Spider-Man: Across the Spider-Verse",
    year: 2023,
    genre: "Adventure",
    rating: 8.6,
    duration: "2h 20m",
    image: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    description: "Miles Morales enters a multiverse filled with different Spider-heroes and faces a challenge unlike any other."
  },
  {
    title: "The Dark Knight",
    year: 2008,
    genre: "Action",
    rating: 9.0,
    duration: "2h 32m",
    image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    description: "Batman faces a criminal mastermind whose chaotic plans threaten Gotham City."
  },
  {
    title: "Oppenheimer",
    year: 2023,
    genre: "Drama",
    rating: 8.3,
    duration: "3h",
    image: "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
    description: "A historical drama following the scientist whose work helped develop the first atomic bomb."
  },
  {
    title: "Avatar: The Way of Water",
    year: 2022,
    genre: "Adventure",
    rating: 7.5,
    duration: "3h 12m",
    image: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    description: "A family on Pandora seeks refuge among an ocean-dwelling community while a new threat approaches."
  },
  {
    title: "The Matrix",
    year: 1999,
    genre: "Sci-Fi",
    rating: 8.7,
    duration: "2h 16m",
    image: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    description: "A computer programmer discovers that the world he knows may not be what it seems."
  },
  {
    title: "Gladiator",
    year: 2000,
    genre: "Action",
    rating: 8.5,
    duration: "2h 35m",
    image: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    description: "A betrayed Roman general fights his way through the arena in a quest for justice."
  }
];

const movieGrid = document.getElementById("movieGrid");
const searchInput = document.getElementById("searchInput");
const movieCount = document.getElementById("movieCount");
const emptyMessage = document.getElementById("emptyMessage");
const movieDialog = document.getElementById("movieDialog");
const dialogContent = document.getElementById("dialogContent");

let selectedGenre = "All";

function renderMovies() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch =
      movie.title.toLowerCase().includes(searchTerm) ||
      movie.genre.toLowerCase().includes(searchTerm) ||
      String(movie.year).includes(searchTerm);

    const matchesGenre =
      selectedGenre === "All" || movie.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  movieGrid.innerHTML = "";

  movieCount.textContent = `${filteredMovies.length} movies`;

  emptyMessage.hidden = filteredMovies.length !== 0;

  filteredMovies.forEach((movie) => {
    const card = document.createElement("article");
    card.className = "movie-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `View ${movie.title} details`);

    card.innerHTML = `
      <div class="poster-wrap">
        <img src="${movie.image}"
          alt="${movie.title} poster"
          loading="lazy">
        <span class="poster-rating">★ ${movie.rating}</span>
        <span class="poster-tag">HD</span>
      </div>
      <h3>${movie.title}</h3>
      <div class="movie-meta">
        <span>${movie.year}</span>
        <span>${movie.genre}</span>
      </div>
    `;

    card.addEventListener("click", () => showMovieDetails(movie));

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        showMovieDetails(movie);
      }
    });

    movieGrid.appendChild(card);
  });
}

function showMovieDetails(movie) {
  dialogContent.innerHTML = `
    <div class="dialog-body">
      <img src="${movie.image}" alt="${movie.title} poster">
      <div>
        <h2>${movie.title}</h2>
        <p class="dialog-rating">★ ${movie.rating} / 10</p>
        <p>${movie.year} · ${movie.genre}</p>
        <p>${movie.duration}</p>
        <p>${movie.description}</p>
      </div>
    </div>
  `;

  movieDialog.showModal();
}

searchInput.addEventListener("input", renderMovies);

document.querySelectorAll(".genre").forEach((button) => {
  button.addEventListener("click", () => {
    selectedGenre = button.dataset.genre;

    document.querySelectorAll(".genre").forEach((genreButton) => {
      genreButton.classList.toggle("active", genreButton === button);
    });

    renderMovies();
  });
});

document.getElementById("exploreBtn").addEventListener("click", () => {
  document.getElementById("movies").scrollIntoView({
    behavior: "smooth"
  });
});

document.getElementById("featuredInfo").addEventListener("click", () => {
  showMovieDetails(movies[0]);
});

document.getElementById("closeDialog").addEventListener("click", () => {
  movieDialog.close();
});

movieDialog.addEventListener("click", (event) => {
  if (event.target === movieDialog) {
    movieDialog.close();
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

renderMovies();

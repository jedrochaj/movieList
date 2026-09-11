import moviesData from "./data/movies.json";
import MovieCard from "./components/MovieCard";
import { useState } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState(moviesData);
  const [watched, setWatched] = useState<number[]>([]);
  const [filter, setFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState<string[]>([""]);

  const filteredMovies = movies.filter((movie) => {
    if (filter === "watched") {
      return watched.includes(movie.id);
    }
    if (filter === "unwatched") {
      return !watched.includes(movie.id);
    }
    return true;
  });

  function addMovie(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!title.trim() || !year.trim() || genre.some((g) => !g.trim())) {
      alert("Zadne pole nie moze byc puste");
      return;
    }
    const movieYear = Number(year);
    if (movieYear < 1900 || movieYear > new Date().getFullYear()) {
      alert("Podaj poprawny rok");
      return;
    }

    const newMovie = {
      id: Date.now(),
      title: title.trim(),
      year: movieYear,
      genre: genre.map((g) => g.trim()),
    };
    setMovies([...movies, newMovie]);
    setTitle("");
    setYear("");
    setGenre([""]);
  }
  function addGenre() {
    setGenre([...genre, ""]);
  }
  function changeGenre(index: number, value: string) {
    const newGenres = [...genre];
    newGenres[index] = value;
    setGenre(newGenres);
  }

  return (
    <>
      <h2>Dodawanie filmów</h2>
      <form onSubmit={addMovie}>
        <input
          type="text"
          name="title"
          placeholder="Tytuł"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="number"
          name="year"
          placeholder="Rok filmu"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <br />
        {genre.map((g, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              marginBottom: "5px",
            }}
          >
            <input
              type="text"
              placeholder="Gatunek"
              value={g}
              onChange={(e) => changeGenre(index, e.target.value)}
            />

            {index === genre.length - 1 && (
              <button
                type="button"
                onClick={addGenre}
                style={{
                  backgroundColor: "#ffffff",
                  color: "#333",
                  border: "2px solid #666",
                }}
              >
                +
              </button>
            )}
          </div>
        ))}

        <button type="submit">Dodaj film</button>
      </form>

      <h2>Lista filmów</h2>
      <p>
        Obejrzane: {watched.length}/{movies.length}
      </p>

      <button onClick={() => setFilter("all")}>Wszystkie</button>
      <button onClick={() => setFilter("watched")}>Obejrzane</button>
      <button onClick={() => setFilter("unwatched")}>Nieobejrzane</button>

      {filteredMovies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          year={movie.year}
          genre={movie.genre}
          isWatched={watched.includes(movie.id)}
          onWatched={() => {
            if (!watched.includes(movie.id)) {
              setWatched([...watched, movie.id]);
            }
          }}
        />
      ))}
    </>
  );
}

export default App;

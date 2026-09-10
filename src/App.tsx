import moviesData from './data/movies.json';
import MovieCard from "./components/MovieCard";
import { useState } from 'react';
import "./App.css";

function App() {
  const [movies, setMovies] = useState(moviesData);
  const [watched, setWatched] = useState<number[]>([]);
  const [filter, setFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");


  const filteredMovies = movies.filter((movie) => {
    if (filter === "watched") {
      return watched.includes(movie.id);
    }
    if (filter === "unwatched") {
      return !watched.includes(movie.id);
    }
    return true;
  });

  function addMovie(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    if(!title.trim() || !year.trim() || !genre.trim()){
      alert("Zadne pole nie moze byc puste");
      return;
    }
    const movieYear = Number(year);
    if(movieYear<1900 || movieYear > new Date().getFullYear()){
      alert("Podaj poprawny rok");
      return;
    }

    const newMovie = {
      id: Date.now(),
      title: title.trim(),
      year: movieYear,
      genre: genre.trim(),
    }
    setMovies([...movies, newMovie]);
    setTitle("");
    setYear("");
    setGenre("");
  }

  return (
    <>
      <h2>Dodawanie filmów</h2>
      <form onSubmit={addMovie}>
        <input type="text" name="title" placeholder='Tytuł' value={title} onChange={(e) => setTitle(e.target.value)} /><br />
        <input type="number" name="year" placeholder='Rok filmu' value={year} onChange={(e) => setYear(e.target.value)}/><br />
        <input type="text" placeholder='Gatunek' name="genre" value={genre} onChange={(e) => setGenre(e.target.value)} /><br />
        <button type="submit">Dodaj film</button>
      </form>

      <h2>Lista filmów</h2>
      <p>Obejrzane: {watched.length}/{movies.length}</p>

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
